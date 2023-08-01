import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CmsService } from './cms.service';
import { PlaybackTokenRequestDTO } from './dto/playback-token.dto';
import { catchError } from 'rxjs';

@Controller('cms/v1')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Post('tokens') // match POST /cms/v1/tokens
  async createPlaybackToken(
    @Body() playbackTokenRequestDTO: PlaybackTokenRequestDTO,
  ) {
    return this.cmsService
      .takePlaybackTokenFromBVOne(playbackTokenRequestDTO)
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
