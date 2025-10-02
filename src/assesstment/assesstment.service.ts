import { Injectable } from '@nestjs/common';
import { CreateAssesstmentDto } from './dto/create-assesstment.dto';
import { UpdateAssesstmentDto } from './dto/update-assesstment.dto';

@Injectable()
export class AssesstmentService {
  create(createAssesstmentDto: CreateAssesstmentDto) {
    return 'This action adds a new assesstment';
  }

  findAll() {
    return `This action returns all assesstment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assesstment`;
  }

  update(id: number, updateAssesstmentDto: UpdateAssesstmentDto) {
    return `This action updates a #${id} assesstment`;
  }

  remove(id: number) {
    return `This action removes a #${id} assesstment`;
  }
}
