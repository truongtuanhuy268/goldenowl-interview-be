import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './modules/students/students.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
