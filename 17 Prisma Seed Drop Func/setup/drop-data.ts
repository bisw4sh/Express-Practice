import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const blip = await prisma.student.deleteMany({});
  console.log(blip);
  console.log("Thanos has snapped");

  const findData = await prisma.student.findMany();
  console.log("Find Many");
  console.log(findData);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
