import { Module } from '@nestjs/common';
import { AssesstmentService } from './assesstment.service';
import { AssesstmentController } from './assesstment.controller';

@Module({
  controllers: [AssesstmentController],
  providers: [AssesstmentService],
})
export class AssesstmentModule {}
