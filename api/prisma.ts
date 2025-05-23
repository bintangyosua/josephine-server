// lib/prisma.ts (atau prisma/client.ts, tergantung struktur project)

import { PrismaClient } from "../generated/prisma/index.js";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // log: ["query", "error", "warn"], // opsional
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
