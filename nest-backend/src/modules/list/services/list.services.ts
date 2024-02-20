import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListRepository } from '../repositories/list.repository';
import { CreateListDto } from '../dtos/requests/create-list.dto';
import { ProjectRepository } from 'src/modules/project/repositories/project.repository';

@Injectable()
export class ListServices {
  constructor(
    private listRepository: ListRepository,
    private projectRepository: ProjectRepository,
  ) {}

  async create(dto: CreateListDto) {
    const project = await this.projectRepository.get(dto.projectId);

    if (!project) {
      throw new NotFoundException('Project does not exist');
    }

    const list = await this.listRepository.create(dto);
    if (!list) {
      throw new BadRequestException('Could not create a list');
    }

    return list;
  }
}
