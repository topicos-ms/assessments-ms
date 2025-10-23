import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradesModule } from './grades/grades.module';
import { typeOrmConfig } from './config/typeorm.config';
import { envs } from './config/envs';
import { EventPublisherInterceptor, EVENT_EMITTER } from './common/events/event-publisher.interceptor';
import { SeedingController } from './seeding.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => typeOrmConfig(configService),
    }),
    ClientsModule.register([
      {
        name: EVENT_EMITTER,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
    GradesModule,
  ],
  controllers: [SeedingController],
  providers: [EventPublisherInterceptor],
  exports: [EventPublisherInterceptor],
})
export class AppModule {}
