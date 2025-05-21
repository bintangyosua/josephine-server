import { z } from "zod";

const commandSchema = z.object({
  name: z.string(),
  category: z.string(),
  description: z.string(),
});

const commandArraySchema = z.array(commandSchema);

export type Command = z.infer<typeof commandSchema>;
export { commandSchema, commandArraySchema };
