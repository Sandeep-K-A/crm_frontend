import { z } from "zod";

export const customerFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number")
    .or(z.literal(""))
    .optional(),
  company: z.string().trim().max(100, "Company name is too long").or(z.literal("")).optional(),
  status: z.enum(["lead", "active", "inactive"]),
  notes: z.string().trim().max(1000, "Notes must be under 1000 characters").or(z.literal("")).optional(),
});
