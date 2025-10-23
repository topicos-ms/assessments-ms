import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller()
export class SeedingController {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  @MessagePattern('grades.clearTestData')
  async clearTestData() {
    await this.dataSource.query('TRUNCATE TABLE "grade" CASCADE');
    return { success: true, message: 'Grades test data cleared' };
  }
}
