import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './schemas/students.schema';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async getStudents(): Promise<Student[]> {
    return await this.studentsService.findAll();
  }

  @Get(':sbd')
  async getStudentBySBD(@Param() params: { sbd: string }): Promise<Student> {
    return await this.studentsService.findStudentBySBD(params.sbd);
  }

  @Post()
  async createStudent(@Body() studentDTOL: Student): Promise<Student> {
    return await this.studentsService.createStudent(studentDTOL);
  }
}
