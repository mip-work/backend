import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { CreateProjectDto } from '../dtos/create-project.dto';

@Injectable()
export class ProjectServices {
  constructor(private projectRepository: ProjectRepository) {}

  async create(dto: CreateProjectDto) {
    const sprint = await this.projectRepository.create(dto);

    return sprint;
  }
}
