import { z } from "zod";

export const itemSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().optional(),
    price: z.coerce.number().positive({ message: "Price must be at least 0" })
})