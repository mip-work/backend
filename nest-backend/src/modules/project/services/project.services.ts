import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { CreateProjectDto } from '../dtos/requests/create-project.dto';
import { UserRepository } from 'src/modules/User/repositories/user.repository';
import { ProjectBuilder } from '../builders/project.builder';
import { Project } from '../dtos/project.dto';
import { UpdateProjectDto } from '../dtos/requests/update-project.dto';

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

    if (!project) {
      throw new BadRequestException('Could not create the project');
    }

    const projectView = ProjectBuilder.createProjectView(project);

    return projectView;
  }

  async get(id: string) {
    const project = await this.projectRepository.get(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const projectView = ProjectBuilder.createProjectView(project);

    return projectView;
  }

  async getAll(userId: string) {
    const projects: Project[] = await this.projectRepository.getAll(userId);
    if (projects.length < 1) {
      throw new NotFoundException(`This user doesn't have any projects`);
    }

    const projectsView = ProjectBuilder.listProjectView(projects);

    return projectsView;
  }

  async update(id: string, dto: UpdateProjectDto) {
    const project = await this.projectRepository.update(id, dto);

    if (!project) {
      throw new BadRequestException('Could not create a project');
    }

    const projectsView = ProjectBuilder.createProjectView(project);

    return projectsView;
  }

  async delete(id: string) {
    await this.projectRepository.delete(id);
    return;
  }
}
