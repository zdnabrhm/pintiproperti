import { useAtom, useAtomValue } from "jotai";
import { atom } from "jotai";
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { propertyCheckSchema, type PropertyCheckSchema } from "../schema";
import { ContactDetailsStep } from "./contact-details-step";

// Jotai Atoms for state management
const formDataAtom = atom<Partial<PropertyCheckSchema>>({});
const currentStepIndexAtom = atom(0);

// Derived atom to calculate available steps based on form data
const stepsConfigAtom = atom((get) => {
  const formData = get(formDataAtom);
  const baseSteps = [
    { id: "initialChoice", title: "Get Started", hasDescription: true },
    { id: "equityUsage", title: "Equity Usage" },
    { id: "timeline", title: "Timeline" },
    { id: "investmentGoal", title: "Investment Goal" },
    { id: "residenceStatus", title: "Residence Status" },
    { id: "employmentStatus", title: "Employment Status" },
  ];

  // Conditionally add employment relationship step
  if (formData.employmentStatus === "employed") {
    baseSteps.push({
      id: "employmentRelationship",
      title: "Employment Relationship",
    });
  }

  baseSteps.push(
    { id: "netIncome", title: "Net Income" },
    { id: "investmentPartner", title: "Investment Partner" },
    { id: "schufaEntries", title: "Schufa Entries" },
    { id: "contactDetails", title: "Contact Details" },
  );

  return baseSteps;
});

// Step component configurations
type StepId =
  | "initialChoice"
  | "equityUsage"
  | "timeline"
  | "investmentGoal"
  | "residenceStatus"
  | "employmentStatus"
  | "employmentRelationship"
  | "netIncome"
  | "investmentPartner"
  | "schufaEntries"
  | "contactDetails";

interface StepConfig {
  id: StepId;
  title: string;
  choices?: { id: string; title: string }[];
  fieldName: keyof PropertyCheckSchema;
  description?: string;
}

const stepConfigs: Record<StepId, StepConfig> = {
  initialChoice: {
    id: "initialChoice",
    title: "Become a real estate landlord without equity",
    description:
      "The free property check. Find out in less than 2 minutes, if you are suitable for our concept.",
    fieldName: "initialChoice",
    choices: [
      { id: "test-suitability", title: "Test suitability now" },
      { id: "get-advice", title: "Get free advice now" },
    ],
  },
  equityUsage: {
    id: "equityUsage",
    title: "Do you want to use equity for your real estate investment?",
    fieldName: "equityUsage",
    choices: [
      { id: "yes", title: "Yes" },
      { id: "no", title: "No" },
    ],
  },
  timeline: {
    id: "timeline",
    title: "When do you want to get started?",
    fieldName: "timeline",
    choices: [
      { id: "asap", title: "As soon as possible" },
      { id: "within-2-months", title: "Within 2 months" },
      { id: "within-3-months", title: "Within 3 months" },
      { id: "later-than-3-months", title: "Later than 3 months" },
    ],
  },
  investmentGoal: {
    id: "investmentGoal",
    title: "What is important to you?",
    fieldName: "investmentGoal",
    choices: [
      { id: "build-wealth", title: "Build wealth" },
      {
        id: "financial-security-retirement",
        title: "Financial security for retirement",
      },
      { id: "additional-monthly-income", title: "Additional monthly income" },
      { id: "own-property-nearby", title: "Own property nearby" },
      { id: "reduce-tax-burden", title: "Reduce tax burden" },
    ],
  },
  residenceStatus: {
    id: "residenceStatus",
    title: "What is your residence status?",
    fieldName: "residenceStatus",
    choices: [
      { id: "german-citizen", title: "German citizen" },
      { id: "eu-citizen", title: "EU citizen" },
      {
        id: "unlimited-eu-residence-permit",
        title: "Unlimited EU residence permit",
      },
      { id: "temporary-residence-permit", title: "Temporary residence permit" },
    ],
  },
  employmentStatus: {
    id: "employmentStatus",
    title: "What is your current employment status?",
    fieldName: "employmentStatus",
    choices: [
      { id: "employed", title: "Employed" },
      { id: "self-employed", title: "Self-Employed" },
      { id: "unemployed", title: "Unemployed" },
      { id: "retired", title: "Retired" },
    ],
  },
  employmentRelationship: {
    id: "employmentRelationship",
    title: "Your employment relationship?",
    fieldName: "employmentRelationship",
    choices: [
      { id: "permanent", title: "Permanent" },
      { id: "permanent-probation", title: "Permanent in probation period" },
      { id: "temporary", title: "Temporary" },
    ],
  },
  netIncome: {
    id: "netIncome",
    title: "What is your net income?",
    fieldName: "netIncome",
    choices: [
      { id: "2400-3000", title: "2400 - 3000 €" },
      { id: "3100-3500", title: "3100 - 3500 €" },
      { id: "more-than-3500", title: "More than 3500 €" },
    ],
  },
  investmentPartner: {
    id: "investmentPartner",
    title: "With whom do you want to invest?",
    fieldName: "investmentPartner",
    choices: [
      { id: "life-partner", title: "Life partner" },
      { id: "family-member", title: "Family member" },
      { id: "someone-else", title: "Someone else" },
      { id: "alone", title: "Alone" },
    ],
  },
  schufaEntries: {
    id: "schufaEntries",
    title: "Do you have negative Schufa entries?",
    fieldName: "schufaEntries",
    choices: [
      { id: "yes", title: "Yes" },
      { id: "no", title: "No" },
    ],
  },
  contactDetails: {
    id: "contactDetails",
    title: "Almost done!",
    fieldName: "name", // Primary field, but this step handles name, email, phone
  },
};

// Radio Group Step Component
function RadioGroupStep({
  config,
  value,
  onChange,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
  currentStep,
  totalSteps,
}: {
  config: StepConfig;
  value: string | undefined;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStep: number;
  totalSteps: number;
}) {
  // Create a schema for this specific field
  const fieldSchema = propertyCheckSchema.pick({
    [config.fieldName]: true,
  } as Record<string, true>);

  const form = useForm({
    defaultValues: {
      [config.fieldName]: value ?? "",
    },
    validators: {
      onSubmit: fieldSchema,
    },
    onSubmit: async ({ value: formValue }) => {
      onChange(formValue[config.fieldName] as string);
      onNext();
    },
  });

  return (
    <Card className="bg-primary-900 border-accent mx-auto w-full -translate-y-[50px] border-2 text-neutral-50 sm:max-w-3xl">
      <CardHeader>
        <p className="mb-2 text-sm text-neutral-200">
          Step {currentStep} of {totalSteps}
        </p>
        <CardTitle>{config.title}</CardTitle>
        {config.description && (
          <CardDescription className="text-neutral-300">
            {config.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <form
          id={`step-${config.id}`}
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name={config.fieldName}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <FieldSet>
                    <RadioGroup
                      name={field.name}
                      value={field.state.value ?? ""}
                      onValueChange={field.handleChange}
                    >
                      {config.choices?.map((choice) => (
                        <FieldLabel
                          key={choice.id}
                          htmlFor={`${config.id}-${choice.id}`}
                        >
                          <Field
                            orientation="horizontal"
                            data-invalid={isInvalid}
                          >
                            <FieldContent>
                              <FieldTitle>{choice.title}</FieldTitle>
                            </FieldContent>
                            <RadioGroupItem
                              value={choice.id}
                              id={`${config.id}-${choice.id}`}
                              aria-invalid={isInvalid}
                            />
                          </Field>
                        </FieldLabel>
                      ))}
                    </RadioGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldSet>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isFirstStep}
          >
            {isFirstStep ? "Cancel" : "Back"}
          </Button>
          <Button type="submit" form={`step-${config.id}`}>
            {isLastStep ? "Submit" : "Next"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

// Main Multi-Step Form Component
export function PropertyCheckMultiStepForm() {
  const [formData, setFormData] = useAtom(formDataAtom);
  const [currentStepIndex, setCurrentStepIndex] = useAtom(currentStepIndexAtom);
  const stepsConfig = useAtomValue(stepsConfigAtom);

  const currentStepConfig = stepsConfig[currentStepIndex];
  const totalSteps = stepsConfig.length;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  const handleFieldChange = (
    field: keyof PropertyCheckSchema,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = (contactDetails?: {
    name: string;
    email: string;
    phone: string;
  }) => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleFinalSubmit(contactDetails);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleFinalSubmit = async (finalContactDetails?: {
    name: string;
    email: string;
    phone: string;
  }) => {
    try {
      // Merge final contact details with existing form data
      const completeFormData = finalContactDetails
        ? { ...formData, ...finalContactDetails }
        : formData;

      // Validate the complete form data
      const validatedData = propertyCheckSchema.parse(completeFormData);
      console.log("Form submitted successfully:", validatedData);

      // Here you would typically send the data to your backend
      // For now, we'll just show an alert
      alert(
        "Thank you! Your property check has been submitted successfully. We will contact you soon.",
      );

      // Reset form
      setFormData({});
      setCurrentStepIndex(0);

      // Navigate to home page
      window.location.href = "/";
    } catch (error) {
      console.error("Validation error:", error);
      alert("Please complete all required fields correctly.");
    }
  };

  // Render the appropriate step
  const currentConfig = stepConfigs[currentStepConfig.id as StepId];

  if (currentStepConfig.id === "contactDetails") {
    return (
      <ContactDetailsStep
        formData={formData}
        onChange={handleFieldChange}
        onNext={handleNext}
        onBack={handleBack}
        currentStep={currentStepIndex + 1}
        totalSteps={totalSteps}
      />
    );
  }

  return (
    <RadioGroupStep
      config={currentConfig}
      value={formData[currentConfig.fieldName] as string | undefined}
      onChange={(value) => handleFieldChange(currentConfig.fieldName, value)}
      onNext={handleNext}
      onBack={handleBack}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      currentStep={currentStepIndex + 1}
      totalSteps={totalSteps}
    />
  );
}
