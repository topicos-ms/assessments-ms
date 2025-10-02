import { PartialType } from '@nestjs/mapped-types';
import { CreateAssesstmentDto } from './create-assesstment.dto';

export class UpdateAssesstmentDto extends PartialType(CreateAssesstmentDto) {
  id: number;
}
