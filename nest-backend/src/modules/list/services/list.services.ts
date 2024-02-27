import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ListRepository } from '../repositories/list.repository';
import { ProjectRepository } from 'src/modules/project/repositories/project.repository';
import { List } from '../dtos/list.dto';
import { UpdateListDTO } from '../dtos/requests/update-list-dto';
import { MemberRepository } from 'src/modules/member/repositories/member.repository';
import { Role } from 'src/modules/member/dtos/enums/role.enum';
import { CreateListReqDto } from '../dtos/requests/create-list-req.dto';

@Injectable()
export class ListServices {
  constructor(
    private listRepository: ListRepository,
    private projectRepository: ProjectRepository,
    private memberRepository: MemberRepository,
  ) {}

  async create(dto: CreateListReqDto, userId: string) {
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

    const lists = await this.listRepository.getAll(dto.projectId);

    let lastPosition = 0;
    lists.forEach((list) => {
      if (list.position > lastPosition) {
        lastPosition = list.position;
      }
    });

    const position = lastPosition + 1;

    const list = await this.listRepository.create({
      ...dto,
      position,
    });
    if (!list) {
      throw new BadRequestException('Could not create a list');
    }

    return list;
  }

  async delete(id: string, projectId: string, userId: string) {
    const member = await this.memberRepository.findInProject(userId, projectId);
    if (!member) {
      throw new ForbiddenException('Cannot access this project');
    }

    if (member.role == Role.COMMON) {
      throw new UnauthorizedException('Only admins can delete a list');
    }

    const listExists = await this.listRepository.get(id);

    if (!listExists) {
      throw new NotFoundException('List does not exist to delete');
    }
    await this.listRepository.delete(id);

    const lists = await this.listRepository.getAll(projectId);
    lists.forEach(async (list, index) => {
      if (list.position > listExists.position) {
        list.position = index + listExists.position;
        await this.listRepository.update(list.id, { position: list.position });
      }
    });
    return;
  }

  async get(id: string, projectId: string, userId: string) {
    const member = await this.memberRepository.findInProject(userId, projectId);

    if (!member) {
      throw new ForbiddenException('Cannot access this project');
    }

    const list = await this.listRepository.get(id);

    if (!list) {
      throw new NotFoundException('List does not exist');
    }

    return list;
  }

  async getAll(projectId: string, userId: string) {
    const member = await this.memberRepository.findInProject(userId, projectId);

    if (!member) {
      throw new ForbiddenException('Cannot access this project');
    }

    const lists: List[] = await this.listRepository.getAll(projectId);

    if (lists.length < 1) {
      throw new NotFoundException('DDD');
    }

    return lists;
  }

  async update(
    id: string,
    projectId: string,
    userId: string,
    dto: UpdateListDTO,
  ) {
    const member = await this.memberRepository.findInProject(userId, projectId);

    if (!member) {
      throw new ForbiddenException('Cannot access this project');
    }

    if (member.role == Role.COMMON) {
      throw new UnauthorizedException('Only admins can update a list');
    }

    const list = await this.listRepository.update(id, dto);

    if (!list) {
      throw new NotFoundException('Cannot update');
    }

    return list;
  }
}
