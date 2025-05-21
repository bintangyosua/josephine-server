import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.users.create({
    data: {
      discordId: "123",
      xp: 0,
      level: 1,
      totalXp: 0,
    },
  });

  console.log({ newUser });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
