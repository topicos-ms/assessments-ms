import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GradesService } from './grades.service';
import { CreateGradeDto, ListGradesDto, UpdateGradeDto } from './dto';

@Controller()
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @MessagePattern('grades.create')
  create(@Payload() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @MessagePattern('grades.list')
  findAll(@Payload() listGradesDto: ListGradesDto) {
    return this.gradesService.findAll(listGradesDto);
  }

  @MessagePattern('grades.findOne')
  findOne(@Payload() id: string) {
    return this.gradesService.findOne(id);
  }

  @MessagePattern('grades.update')
  update(
    @Payload()
    payload: {
      id: string;
      updateGradeDto: UpdateGradeDto;
    },
  ) {
    return this.gradesService.update(payload.id, payload.updateGradeDto);
  }

  @MessagePattern('grades.remove')
  remove(@Payload() id: string) {
    return this.gradesService.remove(id);
  }
}
