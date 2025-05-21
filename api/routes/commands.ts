import { Hono } from "hono";
import { prisma } from "../prisma.js";
import { zValidator } from "@hono/zod-validator";
import { commandSchema } from "../schema/command.schema.js";

const app = new Hono();

app.get("/", async (c) => {
  const commands = await prisma.commands.findMany();
  return c.json(commands);
});

app.post("/", zValidator("json", commandSchema), async (c) => {
  const data = c.req.valid("json");

  const command = await prisma.commands.upsert({
    where: { name: data.name },
    create: data,
    update: data,
    select: {
      name: true,
      category: true,
      description: true,
    },
  });

  return c.json(command);
});

export default app;
