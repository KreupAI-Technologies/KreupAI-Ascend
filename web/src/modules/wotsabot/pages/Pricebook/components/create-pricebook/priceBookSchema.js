import { z } from 'zod';

export const priceBookSchema = z.object({
  priceBookOwner: z.string().min(1, 'Price Book Owner is required'),
  priceBookName: z.string().min(1, 'Price Book Name is required'),
  item: z.string().optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  fromQty: z.number().optional(),
  toQty: z.number().optional(),
  price: z.number().optional(),
  discount: z.number().optional(),
  netPrice: z.number().optional(),
  rows: z.array(z.object({
    fromQty: z.number().optional(),
    toQty: z.number().optional(),
    price: z.number().optional(),
    discount: z.number().optional(),
    netPrice: z.number().optional(),
  })).min(1, "At least one row is required"),
});
