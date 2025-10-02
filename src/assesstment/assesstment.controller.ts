import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AssesstmentService } from './assesstment.service';
import { CreateAssesstmentDto } from './dto/create-assesstment.dto';
import { UpdateAssesstmentDto } from './dto/update-assesstment.dto';

@Controller()
export class AssesstmentController {
  constructor(private readonly assesstmentService: AssesstmentService) {}

  @MessagePattern('createAssesstment')
  create(@Payload() createAssesstmentDto: CreateAssesstmentDto) {
    return this.assesstmentService.create(createAssesstmentDto);
  }

  @MessagePattern('findAllAssesstment')
  findAll() {
    return this.assesstmentService.findAll();
  }

  @MessagePattern('findOneAssesstment')
  findOne(@Payload() id: number) {
    return this.assesstmentService.findOne(id);
  }

  @MessagePattern('updateAssesstment')
  update(@Payload() updateAssesstmentDto: UpdateAssesstmentDto) {
    return this.assesstmentService.update(updateAssesstmentDto.id, updateAssesstmentDto);
  }

  @MessagePattern('removeAssesstment')
  remove(@Payload() id: number) {
    return this.assesstmentService.remove(id);
  }
}
