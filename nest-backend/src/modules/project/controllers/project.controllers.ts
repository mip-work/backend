import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateProjectDto } from '../dtos/requests/create-project.dto';
import { ProjectServices } from '../services/project.services';
import { Response } from 'express';
import { RestExceptionHandler } from 'src/utils/rest-exception-handler';


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
}
