import * as z from "zod";

export const taskSchema = z.object({
  task_name: z.string().min(1, "Task name is required"),
  task_owner: z.string().optional(),
  description: z.string().optional(),
  assigned_to: z.string().optional(),
  due_date: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  related_entity: z.string().optional(),
  reminder: z.boolean().optional(),
});

export const schema = z.object({
  ...taskSchema.shape,
});
