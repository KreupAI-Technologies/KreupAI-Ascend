import * as z from "zod";

export const leadSchema = z.object({
  leadImage: z.string().optional(),
  leadOwner: z
    .enum(["Sabu John Bosco", "Option2", "Option3"])
    .optional()
    .nullable(),
  firstName: z.string().min(3, { message: "First Name is Required" }),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Email is Required" }),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  title: z.string().optional(),
  leadSource: z
    .enum([
      "Website",
      "Referral",
      "Advertisement",
      "Social Media",
      "Email Campaign",
      "Cold Call",
      "Event",
    ])
    .optional()
    .nullable(),
  industry: z
    .enum([
      "Technology",
      "Healthcare",
      "Finance",
      "Education",
      "Retail",
      "Manufacturing",
      "Consulting",
      "Real Estate",
    ])
    .optional()
    .nullable(),
  annualRevenue: z.string().optional(),
  emailOptOut: z.boolean().optional(),
  company: z.string().optional(),
  fax: z.string().optional(),
  website: z.string().optional(),
  leadStatus: z
    .enum(["New", "Contacted", "Qualified", "Unqualified", "Converted", "Lost"])
    .optional()
    .nullable(),
  numberOfEmployees: z
    .enum([
      "1-10",
      "11-50",
      "50-200",
      "201-500",
      "501-1000",
      "1001-5000",
      "5001-10,000",
      "10,000+",
    ])
    .optional()
    .nullable(),
  rating: z.enum(["Hot", "Warm", "Cold"]).optional().nullable(),
  skypeId: z.string().optional(),
  secondaryEmail: z.string().optional(),
  twitter: z.string().optional(),
  description: z.string().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.enum(["City1", "City2", "City3"]).optional().nullable(),
      state: z.enum(["State1", "State2", "State3"]).optional().nullable(),
      zipCode: z.string().optional(),
      country: z
        .enum(["Country1", "Country2", "Country3"])
        .optional()
        .nullable(),
    })
    .optional(),
});

export const schema = z.object({
  ...leadSchema.shape,
});
