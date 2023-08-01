import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs';

import { ConfigService } from '@nestjs/config';
import { PlaybackTokenRequestDTO } from './dto/playback-token.dto';

@Injectable()
export class CmsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  takePlaybackTokenFromBVOne(playbackTokenRequestDTO: PlaybackTokenRequestDTO) {
    const url = this.configService.get('bv_one.url') + '/cms/v1/tokens';
    return this.httpService
      .post(url, playbackTokenRequestDTO, {
        headers: {
          'x-bv-org-id': this.configService.get('bv_one.org_id'),
          authorization: 'Bearer ' + this.configService.get('bv_one.api_key'),
        },
      })
      .pipe(
        map((resp) => resp.data),
        catchError((error) => {
          console.log(error);
          throw new Error('Can not get playback token from BlendVision One');
        }),
      );
  }
}
