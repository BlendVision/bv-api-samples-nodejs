import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AxiosResponse } from 'axios';
import { createHash } from 'crypto';

import { Part } from './interfaces/file-upload.interface';
import {
  FileUploadRequestDTO,
  FileUploadResponseDTO,
} from './dto/file-upload.dto';
import { FileCompleteRequestDTO } from './dto/file-complete.dto';
import {
  file_source_add_vod,
  file_type_video,
} from '../common/constants/file-upload.constant';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  postFileInfoToBVOne(
    file: Express.Multer.File,
  ): Observable<FileUploadResponseDTO> {
    const url =
      this.configService.get('bv_one.url') + '/cms/v1/library/files:upload';

    const data: FileUploadRequestDTO = {
      file: {
        name: file.originalname,
        size: file.size.toString(),
        source: file_source_add_vod,
        type: file_type_video,
      },
    };

    return this.httpService
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-bv-org-id': this.configService.get('bv_one.org_id'),
          authorization: 'Bearer ' + this.configService.get('bv_one.api_key'),
        },
      })
      .pipe(
        switchMap((uploadResp) => {
          return this.uploadFileToS3(file, uploadResp);
        }),
        catchError((error) => {
          console.log(error);
          throw new Error('Upload file information to BlendVision One failed');
        }),
      );
  }

  uploadFileToS3(
    file: Express.Multer.File,
    uploadResp: AxiosResponse<any, any>,
  ): Observable<any> {
    const uploadData: FileUploadResponseDTO = uploadResp.data;
    if (!uploadData.upload_data.parts[0].presigned_url) {
      throw new Error('S3 presigned_url not found');
    }
    const presignedUrl = uploadData.upload_data.parts[0].presigned_url;
    return this.httpService
      .put(presignedUrl, file.buffer, {
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      })
      .pipe(
        switchMap((uploadResp2) => {
          return this.postCompleteToBVOne(file, uploadData, uploadResp2);
        }),
        catchError((error) => {
          console.log(error);
          throw new Error('PUT request failed');
        }),
      );
  }

  postCompleteToBVOne(
    file: Express.Multer.File,
    uploadData: FileUploadResponseDTO,
    uploadResp: AxiosResponse<any, any>,
  ): Observable<any> {
    const responseHeaders = uploadResp.headers;
    const etag = responseHeaders['etag'];
    const url =
      this.configService.get('bv_one.url') +
      '/cms/v1/library/files/' +
      uploadData.file.id +
      ':complete-upload';
    const parts: Part[] = [
      {
        part_number: uploadData.upload_data.parts[0].part_number,
        etag: etag,
      },
    ];
    const data: FileCompleteRequestDTO = {
      complete_data: {
        checksum_sha1: this.sha1AndBase64(file),
        id: uploadData.upload_data.id,
        parts: parts,
      },
    };
    return this.httpService
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-bv-org-id': this.configService.get('bv_one.org_id'),
          authorization: 'Bearer ' + this.configService.get('bv_one.api_key'),
        },
      })
      .pipe(
        map((resp) => {
          return {
            message: 'File upload success.',
            data: resp.data,
          };
        }),
        catchError((error) => {
          console.log(error);
          throw new Error('Post complete message to BlendVision One failed');
        }),
      );
  }

  sha1AndBase64(file: Express.Multer.File): string {
    const encodedHash = createHash('sha1').update(file.buffer).digest('base64');
    const encodedData = encodedHash.slice(0, 160);
    return encodedData;
  }
}
