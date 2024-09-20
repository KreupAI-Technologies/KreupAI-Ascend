import * as z from "zod";

export const callSchema = z.object({
  call_type: z.string().min(1, "Task name is required"),
  call_time: z.string().optional(),
  duration: z.string().optional(),
  subject: z.string().optional(),
  description: z.string().optional(),
  caller: z.string().optional(),
  participants: z.string().optional(),
  related_entity: z.string().optional(),
  status: z.string().optional(),
});

export const schema = z.object({
  ...callSchema.shape,
});
