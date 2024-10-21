// dealSchema.js

import * as z from "zod";

export const dealSchema = z.object({
    userId: z.string().min(1, { message: "User ID is required" }),
    accountId: z.string().min(1, { message: "Account ID is required" }),
    contactId: z.string().min(1, { message: "Contact ID is required" }),
    amount: z.number().min(0, { message: "Amount cannot be negative" }),
    website: z.string().optional(),
    dealName: z.string().max(100, { message: "Deal Name cannot exceed 100 characters" }),
    typeId: z.string().min(1, { message: "Type is required" }),
    nextStep: z.string().max(255, { message: "Next Step cannot exceed 255 characters" }),
    closingDate: z.coerce.date(),
    leadSourceId: z.string().optional(),
    stageId: z.string().min(1, { message: "Stage is required" }),
    expectedRevenue: z.number().min(0, { message: "Expected Revenue cannot be negative" }),
    description: z.string().optional(),
    probabilityPercentage: z.number().min(0, { message: "Probability cannot be negative" }),
    probability: z.number().min(0, "Probability must be at least 0").max(1, "Probability must not exceed 1"),

})

