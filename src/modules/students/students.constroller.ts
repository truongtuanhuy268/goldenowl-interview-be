import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './schemas/students.schema';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async getStudents(): Promise<Student[]> {
    return await this.studentsService.findAll();
  }

  @Post()
  async createStudent(@Body() studentDTOL: Student): Promise<Student> {
    return await this.studentsService.createStudent(studentDTOL);
  }
}
