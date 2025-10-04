import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('grade')
@Unique(['course_section_id', 'student_id'])
@Index('IDX_grade_student', ['student_id'])
@Index('IDX_grade_course_section', ['course_section_id'])
@Index('IDX_grade_final_grade', ['final_grade'])
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  course_section_id: string;

  @Column('uuid')
  student_id: string;

  @Column('numeric', { precision: 5, scale: 2, nullable: true })
  final_grade: number | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updated_at: Date;
}
