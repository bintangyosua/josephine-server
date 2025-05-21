import { z } from "zod";

const userSchema = z.object({
  discordId: z.string(),
  // level: z.number().int().nonnegative().optional().default(1),
  // xp: z.number().int().nonnegative().optional().default(0),
  // totalXp: z.number().int().nonnegative().optional().default(0),
  // messages: z.number().int().nonnegative().optional().default(0),
});

const addXpSchema = z.object({
  amount: z.number().int().nonnegative(),
});

export type User = z.infer<typeof userSchema>;
export type AddXp = z.infer<typeof addXpSchema>;
export { userSchema, addXpSchema };
