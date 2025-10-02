import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssesstmentModule } from './assesstment/assesstment.module';

@Module({
  imports: [AssesstmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
