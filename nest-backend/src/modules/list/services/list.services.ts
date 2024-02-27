import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ListRepository } from '../repositories/list.repository';
import { CreateListDto } from '../dtos/requests/create-list.dto';
import { ProjectRepository } from 'src/modules/project/repositories/project.repository';
import { ListBuilder } from '../builder/list.builder';
import { List } from '../dtos/list.dto';
import { UpdateListDTO } from '../dtos/requests/update-list-dto';
import { MemberRepository } from 'src/modules/member/repositories/member.repository';
import { Role } from 'src/modules/member/dtos/enums/role.enum';

@Injectable()
export class ListServices {
  constructor(
    private listRepository: ListRepository,
    private projectRepository: ProjectRepository,
    private memberRepository: MemberRepository,
  ) {}

  async create(dto: CreateListDto, userId: string) {
    const project = await this.projectRepository.get(dto.projectId);

    if (!project) {
      throw new NotFoundException('Project does not exist');
    }

    const member = await this.memberRepository.findInProject(
      userId,
      dto.projectId,
    );

    if (!member) {
      throw new ForbiddenException('Cannot access this project');
    }

    if (member.role == Role.COMMON) {
      throw new UnauthorizedException('Only admins can create a list');
    }

    const list = await this.listRepository.create(dto);
    if (!list) {
      throw new BadRequestException('Could not create a list');
    }
    const listView = ListBuilder.createListView(list);
    return listView;
  }

  async delete(id: string) {
    const listExists = await this.listRepository.get(id);

    if (!listExists) {
      throw new NotFoundException('List does not exist to delete');
    }
    await this.listRepository.delete(id);
    return;
  }

  async get(id: string) {
    const list = await this.listRepository.get(id);

    if (!list) {
      throw new NotFoundException('List does not exist');
    }
    const listView = ListBuilder.createListView(list);
    return listView;
  }

  async getAll(id: string) {
    const lists: List[] = await this.listRepository.getAll(id);

    if (lists.length < 1) {
      throw new NotFoundException('DDD');
    }
    const listView = ListBuilder.showListViewProject(lists);
    return listView;
  }

  async update(id: string, dto: UpdateListDTO) {
    const list = await this.listRepository.update(id, dto);

    if (!list) {
      throw new NotFoundException('Cannot update');
    }
    const listView = ListBuilder.createListView(list);
    return listView;
  }
}
