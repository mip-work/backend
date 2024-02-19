import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { CreateProjectDto } from '../dtos/requests/create-project.dto';
import { UserRepository } from 'src/modules/User/repositories/user.repository';

@Injectable()
export class ProjectServices {
  constructor(
    private projectRepository: ProjectRepository,
    private userRepository: UserRepository,
  ) {}

  async create(dto: CreateProjectDto) {
    const userId = await this.userRepository.findById(dto.userId);

    if (!userId) {
      throw new NotFoundException('User not found');
    }

    const project = await this.projectRepository.create(dto);

    return project;
  }
}
