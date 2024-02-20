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
import { RestExceptionHandler } from 'src/utils/rest-exception-handler';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProjectDto } from '../dtos/requests/update-product.dto';

@ApiTags('Project')
@Controller('project')
export class ProjectControllers {
  constructor(private projectService: ProjectServices) {}
  @Post()
  async create(@Body() request: CreateProjectDto, @Res() res: Response) {
    try {
      const project = await this.projectService.create(request);
      return res.status(HttpStatus.CREATED).json({
        data: project,
        status: HttpStatus.CREATED,
      });
    } catch (err) {
      return RestExceptionHandler.handleException(err, res);
    }
  }

  @Get('/:id')
  async get(@Param('id') request: string, @Res() res: Response) {
    try {
      const project = await this.projectService.get(request);
      return res.status(HttpStatus.OK).json({
        data: project,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return RestExceptionHandler.handleException(err, res);
    }
  }

  @Get('/projects/:userId')
  async getAll(@Param('userId') request: string, @Res() res: Response) {
    try {
      const project = await this.projectService.getAll(request);
      return res.status(HttpStatus.OK).json({
        data: project,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return RestExceptionHandler.handleException(err, res);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() request: UpdateProjectDto,
    @Res() res: Response,
  ) {
    try {
      const project = await this.projectService.update(id, request);
      return res.status(HttpStatus.OK).json({
        data: project,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return RestExceptionHandler.handleException(err, res);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.projectService.delete(id);
      return res.status(HttpStatus.OK).json();
    } catch (err) {
      return RestExceptionHandler.handleException(err, res);
    }
  }
}
