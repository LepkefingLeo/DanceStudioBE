import { PrismaClient } from '../generated/prisma/client'
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const courses = await prisma.courses.findMany();

  for (const course of courses) {
    for (let i = 0; i < 1; i++) {
      await prisma.applications.create({
        data: {
          course_id: course.id,
          price: faker.number.int({ min: 1000, max: 10000 })
        }
      });
    }
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
