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
    try {
      const cv = await this.cvsService.findOneByIdAndUserId(
        +id,
        req?.user?.userId,
      );
      return this.cvsService.update(cv.id, updateCvDto);
    } catch (error) {
      throw new ForbiddenException(
        `Le CV #${id} n'a pas été trouvé ou vous n'avez pas le droit de le modifier`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    try {
      const cv = await this.cvsService.findOneByIdAndUserId(
        +id,
        req?.user?.userId,
      );
      return this.cvsService.remove(cv.id);
    } catch (error) {
      throw new ForbiddenException(
        `Le CV #${id} n'a pas été trouvé ou vous n'avez pas le droit de le supprimer`,
      );
    }
  }
}
