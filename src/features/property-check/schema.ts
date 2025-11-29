import { z } from "zod";

export const propertyCheckSchema = z
  .object({
    // Question 1: Initial choice
    initialChoice: z.enum(
      ["test-suitability", "get-advice"],
      "Please select an option to continue",
    ),
    // Question 2: Equity usage
    equityUsage: z.enum(
      ["yes", "no"],
      "Please select whether you want to use equity",
    ),
    // Question 3: Timeline
    timeline: z.enum(
      ["asap", "within-2-months", "within-3-months", "later-than-3-months"],
      "Please select when you want to get started",
    ),
    // Question 4: Investment goals
    investmentGoal: z.enum(
      [
        "build-wealth",
        "financial-security-retirement",
        "additional-monthly-income",
        "own-property-nearby",
        "reduce-tax-burden",
      ],
      "Please select what is important to you",
    ),
    // Question 5: Residence status
    residenceStatus: z.enum(
      [
        "german-citizen",
        "eu-citizen",
        "unlimited-eu-residence-permit",
        "temporary-residence-permit",
      ],
      "Please select your residence status",
    ),
    // Question 6: Employment status
    employmentStatus: z.enum(
      ["employed", "self-employed", "unemployed", "retired"],
      "Please select your employment status",
    ),
    // Question 7: Employment relationship (conditional - only required when employed)
    employmentRelationship: z
      .enum(
        ["permanent", "permanent-probation", "temporary"],
        "Please select your employment relationship",
      )
      .optional(),
    // Question 8: Net income
    netIncome: z.enum(
      ["2400-3000", "3100-3500", "more-than-3500"],
      "Please select your net income range",
    ),
    // Question 9: Investment partner
    investmentPartner: z.enum(
      ["life-partner", "family-member", "someone-else", "alone"],
      "Please select with whom you want to invest",
    ),
    // Question 10: Schufa entries
    schufaEntries: z.enum(
      ["yes", "no"],
      "Please select whether you have negative Schufa entries",
    ),
    // Final form: Name
    name: z.string().min(1, "Name is required"),
    // Final form: Email
    email: z.email("Please enter a valid email address"),
    // Final form: Phone
    phone: z
      .string()
      .regex(
        /^\+49\d{10,11}$/,
        "Please enter a valid German phone number (+49)",
      ),
  })
  .refine(
    (data) => {
      // Question 7 is only required when Question 6 is "Employed"
      if (data.employmentStatus === "employed") {
        return data.employmentRelationship !== undefined;
      }
      return true;
    },
    {
      message: "Employment relationship is required for employed individuals",
      path: ["employmentRelationship"],
    },
  );

export type PropertyCheckSchema = z.infer<typeof propertyCheckSchema>;
