import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
import { connect, disconnect, model, Model } from 'mongoose';
import {
  Student,
  StudentSchema,
} from '../../modules/students/schemas/students.schema';
import * as dotenv from 'dotenv';
dotenv.config();

async function seedStudent() {
  console.log(process.env.CONNECTION_STRING);
  await connect(process.env.CONNECTION_STRING as string);

  const StudentModel: Model<Student> = model('Student', StudentSchema);

  const filePath = path.join(__dirname, '../../assets/diem_thi_thpt_2024.csv');
  const BATCH_SIZE = 1000;
  let buffer: Student[] = [];

  const stream = fs.createReadStream(filePath).pipe(csv());

  for await (const data of stream) {
    buffer.push(data);

    if (buffer.length >= BATCH_SIZE) {
      await StudentModel.insertMany(buffer);
      buffer = [];
    }
  }

  if (buffer.length > 0) {
    await StudentModel.insertMany(buffer);
  }

  console.log('Data seeded successfully');
  await disconnect();
}

seedStudent().catch((err) => {
  console.error('Error seeding data:', err);
});
