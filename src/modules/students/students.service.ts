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

  async findStudentBySBD(sbd: string) {
    return await this.studentModel.findOne({ sbd }).exec();
  }

  async generateReport() {
    const subjects = [
      'toan',
      'ngu_van',
      'ngoai_ngu',
      'vat_ly',
      'hoa_hoc',
      'sinh_hoc',
      'lich_su',
      'dia_li',
      'gdcd',
    ];

    const pipelines = {};

    for (const subject of subjects) {
      pipelines[subject] = [
        {
          $project: {
            score: `$${subject}`,
          },
        },
        {
          $match: {
            score: { $ne: null },
          },
        },
        {
          $project: {
            level: {
              $switch: {
                branches: [
                  { case: { $gte: ['$score', 8] }, then: '>=8' },
                  {
                    case: {
                      $and: [{ $gte: ['$score', 6] }, { $lt: ['$score', 8] }],
                    },
                    then: '6-8',
                  },
                  {
                    case: {
                      $and: [{ $gte: ['$score', 4] }, { $lt: ['$score', 6] }],
                    },
                    then: '4-6',
                  },
                ],
                default: '<4',
              },
            },
          },
        },
        {
          $group: {
            _id: '$level',
            count: { $sum: 1 },
          },
        },
      ];
    }

    const result = await this.studentModel.aggregate([
      {
        $facet: pipelines,
      },
    ]);

    const formatted: any[] = [];
    for (const subject of subjects) {
      const levelData = result[0][subject];
      const levels = ['>=8', '6-8', '4-6', '<4'];

      const normalized = levels.map((level) => ({
        level,
        count: levelData.find((l) => l._id === level)?.count || 0,
      }));

      formatted.push({
        subject,
        levels: normalized,
      });
    }
    return formatted;
  }
}
