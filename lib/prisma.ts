import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL for Prisma client.");
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaPool: Pool | undefined;
};

const pool =
  globalForPrisma.prismaPool ??
  new Pool({
    connectionString,
  });

const isProd = process.env.NODE_ENV === "production" || !process.env.NODE_ENV;

if (!isProd) {
  globalForPrisma.prismaPool = pool;
}

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (!isProd) {
  globalForPrisma.prisma = prisma;
}
