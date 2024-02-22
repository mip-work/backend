import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CreateProjectDto } from '../dtos/requests/create-project.dto';
import { ProjectServices } from '../services/project.services';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProjectDto } from '../dtos/requests/update-project.dto';

@ApiTags('Project')
@Controller('project')
export class ProjectControllers {
  constructor(private projectService: ProjectServices) {}
  @Post()
  async create(@Body() request: CreateProjectDto, @Res() res: Response) {
    const project = await this.projectService.create(request);
    return res.status(HttpStatus.CREATED).json({
      data: project,
      status: HttpStatus.CREATED,
    });
  }

  @Get('/:id')
  async get(@Param('id') request: string, @Res() res: Response) {
    const project = await this.projectService.get(request);
    return res.status(HttpStatus.OK).json({
      data: project,
      status: HttpStatus.OK,
    });
  }

  @Get('/projects/:userId')
  async getAll(@Param('userId') request: string, @Res() res: Response) {
    const project = await this.projectService.getAll(request);
    return res.status(HttpStatus.OK).json({
      data: project,
      status: HttpStatus.OK,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() request: UpdateProjectDto,
    @Res() res: Response,
  ) {
    const project = await this.projectService.update(id, request);
    return res.status(HttpStatus.OK).json({
      data: project,
      status: HttpStatus.OK,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.projectService.delete(id);
    return res.status(HttpStatus.OK).json();
  }
}
