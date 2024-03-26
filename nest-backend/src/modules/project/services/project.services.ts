import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { CreateProjectDto } from '../dtos/requests/create-project.dto';
import { ProjectBuilder } from '../builders/project.builder';
import { Project } from '../dtos/project.dto';
import { UpdateProjectDto } from '../dtos/requests/update-project.dto';
import { Role } from 'src/modules/member/dtos/enums/role.enum';
import { MemberRepository } from 'src/modules/member/repositories/member.repository';

@Injectable()
export class ProjectServices {
  constructor(
    private projectRepository: ProjectRepository,
    private memberRepository: MemberRepository,
  ) {}

  async create(dto: CreateProjectDto) {
    const project = await this.projectRepository.create(dto);

    if (!project) {
      throw new InternalServerErrorException(`The project couldn't be created`);
    }

    await this.memberRepository.addMember({
      userId: dto.userId,
      projectId: project.id,
      role: Role.OWNER,
    });

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
    const projectsView = ProjectBuilder.listProjectView(projects);
    return projectsView;
  }

  async update(id: string, dto: UpdateProjectDto) {
    const project = await this.projectRepository.update(id, dto);

    if (!project) {
      throw new BadRequestException(`You can't create a project`);
    }

    const projectsView = ProjectBuilder.createProjectView(project);

    return projectsView;
  }

  async delete(id: string) {
    await this.projectRepository.delete(id);
    return;
  }
}
