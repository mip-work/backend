import { Body, Controller, Post } from '@nestjs/common';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { ProjectServices } from '../services/project.services';

@Controller('project')
export class ProjectControllers {
  constructor(private projectService: ProjectServices) {}
  @Post()
  async create(@Body() request: CreateProjectDto) {
    const project = await this.projectService.create(request);
    return project;
  }
}
