import {
  Controller,
  Post,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { catchError } from 'rxjs';

@Controller('cms/v1/library')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('files[:]upload') // match POST /cms/v1/library/files:upload
  @UseInterceptors(FileInterceptor('file'))
  async file_upload(@UploadedFile() file: Express.Multer.File) {
    return this.fileUploadService.postFileInfoToBVOne(file).pipe(
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
