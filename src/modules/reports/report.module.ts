import { Module } from '@nestjs/common';
import { StudentsModule } from '../students/students.module';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';

@Module({
  imports: [StudentsModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
