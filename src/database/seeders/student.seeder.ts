/* eslint-disable @typescript-eslint/no-misused-promises */
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
import { connect, disconnect, Model } from 'mongoose';
import {
  Student,
  StudentSchema,
} from '../../modules/students/schemas/students.schema';
import { model } from 'mongoose';

async function seedStudent() {
  await connect('mongodb://localhost/nest');

  const StudentModel: Model<Student> = model('Student', StudentSchema);

  const results: Student[] = [];

  const filePath = path.join(__dirname, '../../assets/diem_thi_thpt_2024.csv');

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          await StudentModel.insertMany(results);
          console.log('Data seeded successfully');
          await disconnect();
          resolve();
        } catch (error) {
          console.error('Error seeding data:', error);
          await disconnect();
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          reject(error);
        }
      });
  });
}

seedStudent();
