import { Controller, Get } from '@nestjs/common';
import { StudentsService } from '../students/students.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly studentService: StudentsService) {}

  @Get()
  async getReport() {
    return await this.studentService.generateReport();
  }
}
