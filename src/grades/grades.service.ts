import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { CreateGradeDto, ListGradesDto, UpdateGradeDto } from './dto';
import { PaginatedResultDto } from '../common';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
  ) {}

  async create(createGradeDto: CreateGradeDto): Promise<Grade> {
    const grade = this.gradeRepository.create({
      ...createGradeDto,
      final_grade:
        createGradeDto.final_grade === undefined
          ? null
          : createGradeDto.final_grade,
    });

    return await this.gradeRepository.save(grade);
  }

  async findAll(query: ListGradesDto): Promise<PaginatedResultDto<Grade>> {
    const { page = 1, limit = 10, student_id, course_section_id } = query;
    const skip = (page - 1) * limit;

    const qb = this.gradeRepository.createQueryBuilder('grade');
    qb.skip(skip).take(limit).orderBy('grade.created_at', 'DESC');

    if (student_id) {
      qb.andWhere('grade.student_id = :studentId', { studentId: student_id });
    }

    if (course_section_id) {
      qb.andWhere('grade.course_section_id = :courseSectionId', {
        courseSectionId: course_section_id,
      });
    }

    const [data, total] = await qb.getManyAndCount();

    const totalPages = Math.ceil(total / limit) || 1;
    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  async findOne(id: string): Promise<Grade> {
    const grade = await this.gradeRepository.findOne({ where: { id } });
    if (!grade) {
      throw new NotFoundException(`Grade with ID ${id} not found`);
    }
    return grade;
  }

  async update(id: string, updateGradeDto: UpdateGradeDto): Promise<Grade> {
    const grade = await this.findOne(id);

    Object.assign(grade, {
      ...updateGradeDto,
      final_grade:
        updateGradeDto.final_grade === undefined
          ? grade.final_grade
          : updateGradeDto.final_grade,
    });

    return await this.gradeRepository.save(grade);
  }

  async remove(id: string): Promise<void> {
    const grade = await this.findOne(id);
    await this.gradeRepository.remove(grade);
  }
}
