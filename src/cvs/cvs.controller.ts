import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { FindCvsDto } from './dto/find-cvs.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multerConfig';

@Controller('cvs')
export class CvsController {
  constructor(private readonly cvsService: CvsService) {}

  @Post()
  create(@Body() createCvDto: CreateCvDto) {
    return this.cvsService.create(createCvDto);
  }

  // @Get()
  // findAll() {
  //   return this.cvsService.findAll();
  // }

  @Get()
  findAll(@Query() findCvsDto: FindCvsDto) {
    return this.cvsService.findAllWithParams(findCvsDto);
  }

  @Get('/pagination')
  findAllPaginated(@Query() paginationQuery: PaginationQueryDto) {
    return this.cvsService.findAllPaginated(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvsService.update(+id, updateCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvsService.remove(+id);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('image', multerConfig)) // Here's where you use multerConfig
  async uploadFile(@Param('id') id: number, @UploadedFile() file) {
    if (!file) {
      throw new HttpException('File upload failed', HttpStatus.BAD_REQUEST);
    }

    const savedFile = await this.cvsService.attachImagePath(id, file.path);
    console.log(savedFile);
    return {
      message: 'File uploaded successfully',
      data: savedFile,
    };
  }
}
