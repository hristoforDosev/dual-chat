import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { OpenaiModule } from '../openai/openai.module';

@Module({
  imports: [OpenaiModule],
  providers: [EventsGateway],
})
export class EventsModule {}
