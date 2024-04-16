import { PrismaClient } from "@prisma/client";
import { seed_data } from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  for (const std_data of seed_data) {
    const { symbol_num, name, roll_no, age, interest, sem } = std_data;

    const std_data_insertion = await prisma.student.create({
      data: {
        symbol_num,
        name,
        roll_no,
        age,
        interest,
        sem: {
          create: sem,
        },
      },
    });

    console.log(std_data_insertion);
  }
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
