import { Hono } from "hono";
import { handle } from "hono/vercel";

// * Routes
import users from "./routes/users.js";
import leaderboard from "./routes/leaderboard.js";

const app = new Hono().basePath("/api");

app.use("*", async (c, next) => {
  const { method, path } = c.req;
  console.log(`[${new Date().toISOString()}] ${method} ${path}`);

  await next(); // teruskan ke handler berikutnya
});

app.get("/", (c) => {
  console.log("Hello");
  return c.json({ message: "Congrats! You've deployed Hono to Vercel" });
});

app.route("/users", users);
app.route("/leaderboard", leaderboard);

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const DELETE = handler;
export const OPTIONS = handler;
