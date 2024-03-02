import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SprintServices } from '../services/sprint.services';
import { ApiTags } from '@nestjs/swagger';
import { CreateSprintRecDto } from '../dtos/requests/create-sprint-req.dto';
import { UpdateSprintDto } from '../dtos/requests/update-sprint-dto';
import { Response } from 'express';

@ApiTags('Sprint')
@Controller('sprint')
export class SprintControllers {
  constructor(private sprintService: SprintServices) {}
  @Post()
  async create(@Body() request: CreateSprintRecDto) {
    const sprint = await this.sprintService.create(request);
    return sprint;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() request: UpdateSprintDto,
    @Res() res: Response,
  ) {
    const sprint = await this.sprintService.update(id, request);
    return res.status(HttpStatus.OK).json({
      data: sprint,
      status: HttpStatus.OK,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.sprintService.delete(id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
    });
  }

  @Get(':id')
  async get(@Param('id') request: string, @Res() res: Response) {
    const sprint = await this.sprintService.get(request);
    return res.status(HttpStatus.OK).json({
      data: sprint,
      status: HttpStatus.OK,
    })
  }
}
