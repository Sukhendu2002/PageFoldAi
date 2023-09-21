import * as z from "zod";

export const createCorseSchema = z.object({
  title: z.string().min(3).max(255),
  units: z.array(z.string().min(3).max(255)),
});
