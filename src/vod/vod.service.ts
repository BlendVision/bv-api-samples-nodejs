import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { catchError, map } from 'rxjs';
import { CreateVODRequestDTO } from './dto/vod.dto';

@Injectable()
export class VodService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  getVODFromBVOne(id: string) {
    const url = this.configService.get('bv_one.url') + '/cms/v1/vods/' + id;
    return this.httpService
      .get(url, {
        headers: {
          'x-bv-org-id': this.configService.get('bv_one.org_id'),
          authorization: 'Bearer ' + this.configService.get('bv_one.api_key'),
        },
      })
      .pipe(
        map((resp) => resp.data),
        catchError((error) => {
          console.log(error);
          throw new Error('Get VOD from BlendVision One failed');
        }),
      );
  }

  createVODInBVOne(data: CreateVODRequestDTO) {
    const url = this.configService.get('bv_one.url') + '/cms/v1/vods';
    return this.httpService
      .post(url, data, {
        headers: {
          'x-bv-org-id': this.configService.get('bv_one.org_id'),
          authorization: 'Bearer ' + this.configService.get('bv_one.api_key'),
        },
      })
      .pipe(
        map((resp) => resp.data),
        catchError((error) => {
          console.log(error);
          throw new Error('Create VOD failed');
        }),
      );
  }
}
