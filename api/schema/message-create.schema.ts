import { z } from "zod";

const messageCreateSchema = z.object({
  username: z.string(),
});

export type MessageCreate = z.infer<typeof messageCreateSchema>;
export { messageCreateSchema };
