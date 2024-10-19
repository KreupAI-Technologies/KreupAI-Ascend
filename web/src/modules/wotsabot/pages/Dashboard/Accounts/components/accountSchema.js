// accountSchema.js
import * as z from "zod";

export const accountSchema = z.object({
    clientId: z.string().min(1, { message: "Client ID is required" }),
    clientName: z.string().min(1, { message: "Client Name is required" }),
    addressId: z.string().optional(), // Should be a valid ObjectId
    billingAddressId: z.string().optional(), // Should be a valid ObjectId
    shippingAddressId: z.string().optional(), // Should be a valid ObjectId
    userId: z.string().min(1, { message: "User ID is required" }),
    tradeLicense: z.string().optional(),
    taxId: z.string().optional(),
    clientTypeId: z.string().optional(), // Should be a valid ObjectId
    statusID: z.string().optional(),
    industryId: z.string().optional(), // Should be a valid ObjectId
    website: z.string().optional(),
    creditLimit: z.number().min(0, { message: "Credit Limit cannot be negative" }),
    creditDays: z.number().min(0, { message: "Credit Days cannot be negative" }),
    paymentTermsId: z.string().optional(), // Should be a valid ObjectId
    deliveryTermsId: z.string().optional(), // Should be a valid ObjectId
    paymentMethodId: z.string().optional(), // Should be a valid ObjectId
    annualIncome: z.number().optional(),
    numberOfEmployeesRangeId: z.string().optional(),  // Should be a valid ObjectId
    rating: z.string().optional(),
    phone: z.string().optional(),
    fax: z.string().optional(),
    email: z.string().email({ message: "Valid Email is required" }),
    divisionId: z.string().optional(), // Should be a valid ObjectId
    createdBy: z.string().optional(), // Should be a valid ObjectId
    lastModifiedBy: z.string().optional(), // Should be a valid ObjectId
    // addressLines: z
    //     .array(z.string())
    //     .nonempty({ message: "At least one address line is required" })
    //     .max(3, { message: "At most three address lines are allowed" })
    //     .optional(),
    // cityId: z.string().optional(),
    // stateId: z.string().optional(),
    // countryId: z.string().optional(),
    // postalCode: z.string().optional(),
});
