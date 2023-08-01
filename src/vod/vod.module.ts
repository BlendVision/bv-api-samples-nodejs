import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { VodController } from './vod.controller';
import { VodService } from './vod.service';

@Module({
  imports: [HttpModule],
  controllers: [VodController],
  providers: [VodService],
})
export class VodModule {}
