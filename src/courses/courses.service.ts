/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly db: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    return await this.db.courses.create({
      data: createCourseDto
    });
  }

  async findAll() {
    return await this.db.courses.findMany();
  }

  async update(id: number, UpdateCourseDto: UpdateCourseDto) {
    return await this.db.courses.update({
      where: {
        id
      },
      data: UpdateCourseDto
    });
  }

  async findOne(id: number) {
    return await this.db.courses.findUniqueOrThrow({
      where: {
        id
      }
    });
  }

  async remove(id: number) {
    return await this.db.courses.delete({
      where: {
        id,
      },
    });
  }

  async apply(id: number) {
    const course = await this.db.courses.findUnique({
      where: { 
        id: id,
      }
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const amount = course.length * 500;
    
    return await this.db.applications.create({
      data: {
        course_id: id,
        price: amount,
      }
    });
  }
}
