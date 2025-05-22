import { Controller, Get } from '@nestjs/common';
import { StudentsService } from '../students/students.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async getReport() {
    return await this.studentsService.generateReport();
  }

  @Get('top-10')
  async getTop10Students(): Promise<any[]> {
    return await this.studentsService.findTop10Students();
  }
}
