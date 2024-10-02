import { z } from "zod";

export const vendorSchema = z.object({
  vendorOwner: z.string().optional(),
  vendorName: z.string().min(1, "Vendor Name is required"),
  phone: z.string().optional(),
  email: z.string().email('Invalid email address'),
  website: z.string().optional(),
  category: z.string().optional(),
  glAccount: z.string().optional(),
  emailOptOut: z.boolean().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
}),
  
  contactInformation: z.object({
    contactPerson: z.string().optional(),
    contactPhone: z.string().optional(),
    contactEmail: z.string().optional(),
    
  }),
    productsSupplied: z.object({
      productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId").optional().nullable(),  // Ensures valid ObjectId or optional
      productName: z.string().optional(),
      unitPrice: z.number().optional(),
    }),
  paymentTerms: z.string().optional(),
  paymentMethods: z.object({
    methodName: z.string().optional(),
    accountDetails: z.object({
      bankName: z.string().optional(),
      accountNumber: z.string().optional(),
      routingNumber: z.string().optional(),
      currency: z.string().optional(),
    }),
  }),
  status: z.string().optional(),
  createdBy: z.object({
    userId: z.string().optional(),
    username: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
});
