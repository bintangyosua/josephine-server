import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";

// * Routes
import users from "./routes/users.js";
import leaderboard from "./routes/leaderboard.js";
import commands from "./routes/commands.js";

const app = new Hono().basePath("/api");

app.use(
  "/*",
  cors({
    origin: process.env.FRONTEND_URL!,
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "X-Custom-Header",
      "Upgrade-Insecure-Requests",
    ],
    allowMethods: ["POST", "GET", "OPTIONS", "PATCH", "PUT", "DELETE"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
  })
);

app.use("*", async (c, next) => {
  const { method, path } = c.req;
  console.log(`[${new Date().toISOString()}] ${method} ${path}`);
  await next(); // teruskan ke handler berikutnya
});

app.get("/", (c) => {
  return c.json({ message: "Congrats! You've deployed Hono to Vercel" });
});

app.route("/users", users);
app.route("/leaderboard", leaderboard);
app.route("/commands", commands);

// Create the handler
const handler = handle(app);

// Export the handler for all HTTP methods
export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const DELETE = handler;
export const OPTIONS = handler;
