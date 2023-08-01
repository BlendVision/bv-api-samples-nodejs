import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import configuration from './config/configuration';
import { FileUploadModule } from './file-upload/file-upload.module';
import { PlaybackModule } from './playback/playback.module';
import { CmsModule } from './cms/cms.module';
import { VodModule } from './vod/vod.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    FileUploadModule,
    PlaybackModule,
    CmsModule,
    VodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
