import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Student } from './schemas/students.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
  ) {}
  findAll() {
    return this.studentModel.find().exec();
  }
  async createStudent(student: Student): Promise<Student> {
    const newStudent = new this.studentModel(student);
    return newStudent.save();
  }
}
