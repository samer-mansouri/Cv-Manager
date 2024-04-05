import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Controller('v2/cvs')
export class CvsControllerV2 {
  constructor(private readonly cvsService: CvsService) {}

  @Post()
  async create(@Body() createCvDto: CreateCvDto, @Request() req) {
    const updatedCreateCvDto = { ...createCvDto, userId: req.user.userId };
    return this.cvsService.create(updatedCreateCvDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cv = await this.cvsService.findOne(+id);
    if (!cv) {
      throw new NotFoundException(`Le CV #${id} n'a pas été trouvé.`);
    }
    return cv;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCvDto: UpdateCvDto,
    @Request() req,
  ) {
    console.log('USER ID', req.user.userId);
    const cv = await this.cvsService.findOne(+id);
    if (!cv) {
      throw new NotFoundException(`Le CV #${id} n'a pas été trouvé.`);
    }
    if (cv.user !== req.user.userId) {
      throw new ForbiddenException(
        "Vous n'avez pas le droit de modifier ce CV.",
      );
    }
    return this.cvsService.update(+id, updateCvDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const cv = await this.cvsService.findOne(+id);
    if (!cv) {
      throw new NotFoundException(`Le CV #${id} n'a pas été trouvé.`);
    }
    if (cv.user !== req.user.userId) {
      throw new ForbiddenException(
        "Vous n'avez pas le droit de supprimer ce CV.",
      );
    }
    return this.cvsService.remove(+id);
  }
}
