import { Hono } from "hono";
import { prisma } from "../prisma.js";
import { addXpSchema, userSchema } from "../schema/users.schema.js";
import { zValidator } from "@hono/zod-validator";
import { calculateXpAndLevel } from "../lib/add-xp.js";

const app = new Hono();

app.get("/", async (c) => {
  const users = await prisma.users.findMany();
  return c.json(users);
});

app.post("/", zValidator("json", userSchema), async (c) => {
  const validated = c.req.valid("json");

  if (
    await prisma.users.findUnique({ where: { discordId: validated.discordId } })
  ) {
    return c.json({ message: "User already exists" }, 400);
  }

  const user = await prisma.users.create({ data: validated });
  return c.json(user);
});

app.post("/:id/add-xp", zValidator("json", addXpSchema), async (c) => {
  const validated = c.req.valid("json");
  const discordId = c.req.param("id");

  let user = await prisma.users.findUnique({ where: { discordId } });

  if (!user) {
    user = await prisma.users.create({
      data: {
        discordId,
        xp: validated.amount,
        level: 1,
        totalXp: validated.amount,
      },
    });

    return c.json(user);
  }

  const { newXp, newLevel } = calculateXpAndLevel(
    user.xp,
    user.level,
    validated.amount
  );

  const updatedUser = await prisma.users.update({
    where: { discordId },
    data: {
      xp: newXp,
      level: newLevel,
      totalXp: { increment: validated.amount },
    },
  });

  return c.json({
    message: "XP updated",
    data: updatedUser,
  });
});

app.patch("/:id", zValidator("json", userSchema), async (c) => {
  const id = c.req.param("id");
  const validated = c.req.valid("json");

  const user = await prisma.users.update({
    where: { discordId: id },
    data: validated,
  });

  return c.json(user);
});

app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const user = await prisma.users.delete({ where: { id: id } });

  return c.json(user);
});

export default app;
