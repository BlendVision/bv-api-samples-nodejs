import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs';
import { ValidateContentRequestDTO } from './dto/playback-content.dto';

@Injectable()
export class PlaybackService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  getContentMetadata(authorization: string) {
    const url = this.configService.get('bv_one.url') + '/playback/v1/contents';
    return this.httpService
      .get(url, {
        headers: {
          authorization: authorization,
        },
      })
      .pipe(
        map((resp) => {
          console.log(resp);

          return resp.data;
        }),
        catchError((error) => {
          console.log(error);
          throw new Error('Can not get content metadata from BlendVision One');
        }),
      );
  }

  validateContentSecurityByDomain(
    authorization: string,
    data: ValidateContentRequestDTO,
  ) {
    const url =
      this.configService.get('bv_one.url') + '/playback/v1/contents:validate';
    return this.httpService
      .post(url, data, {
        headers: {
          authorization: authorization,
        },
      })
      .pipe(
        map((resp) => resp.data),
        catchError((error) => {
          console.log(error);
          throw new Error(
            'Post validate content security to BlendVision One failed',
          );
        }),
      );
  }

  startPlaybackSession(device_id: string, authorization: string) {
    const url =
      this.configService.get('bv_one.url') +
      '/playback/v1/sessions/' +
      device_id +
      ':start';
    const data = {};
    return this.httpService
      .post(url, data, {
        headers: {
          authorization: authorization,
        },
      })
      .pipe(
        map((resp) => resp.data),
        catchError((error) => {
          console.log(error);
          throw new Error('Start playback session from BlendVision One failed');
        }),
      );
  }

  getPlaybackSessionInfo(device_id: string, authorization: string) {
    const url =
      this.configService.get('bv_one.url') +
      '/playback/v1/sessions/' +
      device_id;
    return this.httpService
      .get(url, {
        headers: {
          authorization: authorization,
        },
      })
      .pipe(
        map((resp) => resp.data),
        catchError((error) => {
          console.log(error);
          throw new Error(
            'Can not get playback session info from BlendVision One',
          );
        }),
      );
  }

  sendPlaybackSessionHeartbeat(device_id: string, authorization: string) {
    const url =
      this.configService.get('bv_one.url') +
      '/playback/v1/sessions/' +
      device_id +
      ':heartbeat';
    const data = {};
    return this.httpService
      .post(url, data, {
        headers: {
          authorization: authorization,
        },
      })
      .pipe(
        map((resp) => resp.data),
        catchError((error) => {
          console.log(error);
          throw new Error('Send playback session heartbeat failed');
        }),
      );
  }

  endPlaybackSession(device_id: string, authorization: string) {
    const url =
      this.configService.get('bv_one.url') +
      '/playback/v1/sessions/' +
      device_id +
      ':end';
    const data = {};
    return this.httpService
      .post(url, data, {
        headers: {
          authorization: authorization,
        },
      })
      .pipe(
        map((resp) => resp.data),
        catchError((error) => {
          console.log(error);
          throw new Error('End playback session from BlendVision One failed');
        }),
      );
  }
}
