// leadSchema.js
import * as z from "zod";

export const leadSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
  firstName: z.string().min(3, { message: "First Name is required" }),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Valid Email is required" }),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  title: z.string().optional(),
  leadSubSourceId: z.string().optional(), // Should be a valid ObjectId
  industryId: z.string().optional(), // Should be a valid ObjectId
  annualRevenue: z.number().optional(),
  emailOptOut: z.boolean().optional(),
  company: z.string().optional(),
  fax: z.string().optional(),
  website: z.string().optional(),
  statusId: z.string().optional(), // Should be a valid ObjectId
  numberOfEmployees: z.number().optional(),
  ratingId: z.string().optional(), // Should be a valid ObjectId
  secondaryEmail: z.string().email().optional(),
  twitter: z.string().optional(),
  description: z.string().optional(),
  addressId: z.string().optional(), // Should be a valid ObjectId
  addressLines: z
    .array(z.string())
    .nonempty({ message: "At least one address line is required" })
    .max(3, { message: "At most three address lines are allowed" })
    .optional(),
  cityId: z.string().optional(),
  stateId: z.string().optional(),
  countryId: z.string().optional(),
  postalCode: z.string().optional(),
});
