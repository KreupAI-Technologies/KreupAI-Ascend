import * as z from "zod";

export const invoiceSchema = z.object({
  SalesOrderOwner: z.enum(["Sabu John Bosco", "Owner2", "Owner3"]).optional(),
  Dealname: z.string().optional(),
  Subject: z.string().optional(),
  purchaseorder: z.string().optional(),
  Customerno: z.number().optional().transform(val => val ? Number(val) : undefined),
  duedate: z.date().optional(),
  quotename: z.string().optional(),
  Contactname: z.string().optional(),
  pending: z.string().optional(),
  exciseduty: z.string().optional(),
  carrier: z.enum(["FedEX", "Carrier2", "Carrier3"]).optional(),
  status: z.enum(["Created", "Approved", "Delivered", "Cancelled"]).optional(),
  salescommission : z.string().optional(),
  Accountname: z.string().optional(),
});

export const addressSchema = z.object({
  billingStreet: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingCode: z.string().optional(),
  billingCountry: z.string().optional(),
  shippingStreet: z.string().optional(),
  shippingCity:z.string().optional(),
  shippingState: z.string().optional(),
  shippingCode: z.string().optional(),
  shippingCountry: z.string().optional(),
});

export const schema = z.object({
  ...invoiceSchema.shape,
  ...addressSchema.shape,
  duedate: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof String) {
      return new Date(arg);
    }
    return arg;
  }, z.date().optional()),
});
