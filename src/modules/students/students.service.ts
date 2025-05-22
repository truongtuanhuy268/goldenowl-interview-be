import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Student } from './schemas/students.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Report } from '../reports/types/reports.type';
import { TopStudent } from '../reports/types/top-student.type';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
  ) {}

  private reports: Report[] = [];

  findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }
  async createStudent(student: Student): Promise<Student> {
    const newStudent = new this.studentModel(student);
    return newStudent.save();
  }

  async findStudentBySBD(sbd: string): Promise<Student> {
    if (!sbd) {
      throw new NotFoundException('SBD is required');
    }
    const student = await this.studentModel.findOne({ sbd }).exec();
    if (!student) {
      throw new NotFoundException(`Student with SBD ${sbd} not found`);
    }
    return student;
  }

  async generateReport(): Promise<Report[]> {
    if (this.reports.length > 0) return this.reports;

    const subjects = [
      'toan',
      'ngu_van',
      'ngoai_ngu',
      'vat_li',
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

    // const formatted: any[] = [];
    // for (const subject of subjects) {
    //   const levelData = result[0][subject];
    //   const levels = ['>=8', '6-8', '4-6', '<4'];

    //   const normalized = levels.map((level) => ({
    //     level,
    //     count: levelData.find((l) => l._id === level)?.count || 0,
    //   }));

    //   formatted.push({
    //     subject,
    //     levels: normalized,
    //   });
    // }

    const formatted: Report[] = [];

    for (const subject of subjects) {
      const levelData = result[0][subject];
      const levels = ['>=8', '6-8', '4-6', '<4'];

      const normalized: Report = { subject };

      for (const level of levels) {
        const count = levelData.find((l) => l._id === level)?.count || 0;
        const key = level === '>=8' ? '>8' : level;
        normalized[key] = count;
      }

      formatted.push(normalized);
    }
    this.reports = formatted;
    return formatted;
  }

  async findTop10Students(): Promise<TopStudent[]> {
    return await this.studentModel.aggregate([
      {
        $addFields: {
          tong_diem_khoi_a: {
            $add: [
              { $ifNull: ['$toan', 0] },
              { $ifNull: ['$vat_li', 0] },
              { $ifNull: ['$hoa_hoc', 0] },
            ],
          },
        },
      },
      {
        $sort: { tong_diem_khoi_a: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 0,
          sbd: 1,
          toan: 1,
          vat_li: 1,
          hoa_hoc: 1,
          tong_diem_khoi_a: 1,
        },
      },
    ]);
  }
}
