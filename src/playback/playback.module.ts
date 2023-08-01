import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PlaybackController } from './playback.controller';
import { PlaybackService } from './playback.service';

@Module({
  imports: [HttpModule],
  controllers: [PlaybackController],
  providers: [PlaybackService],
})
export class PlaybackModule {}
