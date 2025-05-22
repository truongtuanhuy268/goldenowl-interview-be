import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.constroller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/students.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [StudentsService],
})
export class StudentsModule {}
