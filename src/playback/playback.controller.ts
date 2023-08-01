import {
  Controller,
  Post,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Get,
  Body,
} from '@nestjs/common';
import { PlaybackService } from './playback.service';
import { catchError } from 'rxjs';
import { ValidateContentRequestDTO } from './dto/playback-content.dto';

@Controller('playback/v1')
export class PlaybackController {
  constructor(private readonly playbackService: PlaybackService) {}

  @Get('contents') // match GET /playback/v1/contents
  async getContentMetadata(@Headers() headers: Record<string, string>) {
    return this.playbackService
      .getContentMetadata(headers['authorization'])
      .pipe(
        catchError((error) => {
          // TODO: Handle errors and return the corresponding HTTP status.
          throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
  }

  @Post('contents[:]validate') // match POST /playback/v1/contents:validate
  async validateContentSecurity(
    @Headers() headers: Record<string, string>,
    @Body() validateContentRequestDTO: ValidateContentRequestDTO,
  ) {
    return this.playbackService
      .validateContentSecurityByDomain(
        headers['authorization'],
        validateContentRequestDTO,
      )
      .pipe(
        catchError((error) => {
          // TODO: Handle errors and return the corresponding HTTP status.
          throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
  }

  @Post('sessions/:device_id[:]start') // match POST /playback/v1/sessions/{device_id}:start
  async startSession(
    @Param('device_id') device_id: string,
    @Headers() headers: Record<string, string>,
  ) {
    return this.playbackService
      .startPlaybackSession(device_id, headers['authorization'])
      .pipe(
        catchError((error) => {
          // TODO: Handle errors and return the corresponding HTTP status.
          throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
  }

  @Get('sessions/:device_id') // match GET /playback/v1/sessions/{device_id}
  async sessionInfo(
    @Param('device_id') device_id: string,
    @Headers() headers: Record<string, string>,
  ) {
    return this.playbackService
      .getPlaybackSessionInfo(device_id, headers['authorization'])
      .pipe(
        catchError((error) => {
          // TODO: Handle errors and return the corresponding HTTP status.
          throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
  }

  @Post('sessions/:device_id[:]heartbeat') // match POST /playback/v1/sessions/{device_id}:heartbeat
  async keepPlaybackSessionAlive(
    @Param('device_id') device_id: string,
    @Headers() headers: Record<string, string>,
  ) {
    return this.playbackService
      .sendPlaybackSessionHeartbeat(device_id, headers['authorization'])
      .pipe(
        catchError((error) => {
          // TODO: Handle errors and return the corresponding HTTP status.
          throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
  }

  @Post('sessions/:device_id[:]end') // match POST /playback/v1/sessions/{device_id}:end
  async endSession(
    @Param('device_id') device_id: string,
    @Headers() headers: Record<string, string>,
  ) {
    return this.playbackService
      .endPlaybackSession(device_id, headers['authorization'])
      .pipe(
        catchError((error) => {
          // TODO: Handle errors and return the corresponding HTTP status.
          throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
  }
}
