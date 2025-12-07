import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { propertyCheckSchema, type PropertyCheckSchema } from "../schema";

interface ContactDetailsStepProps {
  formData: Partial<PropertyCheckSchema>;
  onChange: (field: keyof PropertyCheckSchema, value: string) => void;
  onNext: (contactDetails?: {
    name: string;
    email: string;
    phone: string;
  }) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  isSubmitting?: boolean;
}

export function ContactDetailsStep({
  formData,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps,
  isSubmitting = false,
}: ContactDetailsStepProps) {
  const form = useForm({
    defaultValues: {
      name: formData.name || "",
      email: formData.email || "",
      phone: formData.phone || "",
    },
    validators: {
      onSubmit: propertyCheckSchema.pick({
        name: true,
        email: true,
        phone: true,
      }),
    },
    onSubmit: async ({ value }) => {
      // Update form data atom for consistency
      onChange("name", value.name);
      onChange("email", value.email);
      onChange("phone", value.phone);
      // Pass contact details directly to ensure synchronous validation
      onNext({ name: value.name, email: value.email, phone: value.phone });
    },
  });

  return (
    <Card className="bg-primary-900 border-accent mx-auto w-full -translate-y-[50px] border-2 text-neutral-50 sm:max-w-3xl">
      <CardHeader>
        <div className="mb-2 text-sm text-neutral-400">
          Step {currentStep} of {totalSteps}
        </div>
        <CardTitle>Almost done!</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="contact-details"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor="contact-details-name">Name</FieldLabel>
                    <Input
                      id="contact-details-name"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      data-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor="contact-details-email">
                      Email address
                    </FieldLabel>
                    <Input
                      id="contact-details-email"
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      data-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="phone"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor="contact-details-phone">
                      Phone +49
                    </FieldLabel>
                    <Input
                      id="contact-details-phone"
                      name={field.name}
                      type="tel"
                      placeholder="+49"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      data-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <div className="mt-4 space-y-2 text-sm text-neutral-300">
            <p>
              Why do we ask this question? So we can send you a free &
              non-binding offer.
            </p>
            <p>
              By submitting, you confirm that you agree to the General Terms and
              Conditions.
            </p>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" form="contact-details" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
