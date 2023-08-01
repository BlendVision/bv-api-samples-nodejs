import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { VodService } from './vod.service';
import { catchError } from 'rxjs';
import { CreateVODRequestDTO } from './dto/vod.dto';

@Controller('cms/v1/vods')
export class VodController {
  constructor(private readonly vodService: VodService) {}

  @Get(':id') // match Get /bv/cms/v1/vods/:id
  async get_a_vod(@Param('id') id: string) {
    return this.vodService.getVODFromBVOne(id).pipe(
      catchError((error) => {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  @Post() // match POST /bv/cms/v1/vods
  async create_vod(@Body() createVODRequest: CreateVODRequestDTO) {
    return this.vodService.createVODInBVOne(createVODRequest).pipe(
      catchError((error) => {
        console.log(error);
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
