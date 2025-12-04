import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


(async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✓ Database connected successfully");
  } catch (error) {
    console.error("✗ Database connection failed:", error.message);
  }
})();

export default prisma;
