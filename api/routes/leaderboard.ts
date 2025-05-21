import { Hono } from "hono";
import { prisma } from "../prisma.js";

const app = new Hono();

app.get("/", async (c) => {
  const users = await prisma.users.findMany({
    take: 10,
    orderBy: { totalXp: "desc" },
  });
  return c.json(users);
});

export default app;
