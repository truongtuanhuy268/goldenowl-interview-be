import { Controller, Get } from '@nestjs/common';
import { StudentsService } from '../students/students.service';
import { Report } from './types/reports.type';
import { TopStudent } from './types/top-student.type';

@Controller('reports')
export class ReportController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async getReport(): Promise<Report[]> {
    return await this.studentsService.generateReport();
  }

  @Get('top-10')
  async getTop10Students(): Promise<TopStudent[]> {
    return await this.studentsService.findTop10Students();
  }
}
