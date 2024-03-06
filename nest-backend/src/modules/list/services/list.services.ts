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
import { CreateListDto } from '../dtos/requests/create-list.dto';
import { orderList } from '../utils/order-list.utils';

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

    if (dto.parentId) {
      const checkParentId = await this.listRepository.get(dto.parentId);

      if (!checkParentId) {
        throw new BadRequestException('This parent id does not exist');
      }
      const invalidParentId = await this.listRepository.getByParentId(
        dto.parentId,
        dto.projectId,
      );

      if (invalidParentId) {
        throw new BadRequestException('Invalid parent id');
      }
    } else {
      const listEmpty = await this.listRepository.checkEmptyList(dto.projectId);

      if (listEmpty) {
        throw new BadRequestException('Project already have a first list');
      }
    }

    const list = await this.listRepository.create(dto);

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

    const list = await this.listRepository.get(id);

    if (!list) {
      throw new NotFoundException('List does not exist to delete');
    }

    const lists = await this.listRepository.getAll(projectId);

    const listIndex = lists.findIndex((l) => l.id == list.id);

    const child = lists.find((l) => l.parentId === list.id);
    lists.splice(listIndex, 1);

    if (!child) {
      return;
    }
    child.parentId = list.parentId;
    await this.listRepository.update(child.id, { parentId: child.parentId });

    await this.listRepository.delete(id);
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
      throw new NotFoundException('No list were found');
    }

    const sortedList = orderList(lists);

    return sortedList;
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

    const updatedList = await this.listRepository.update(id, dto);
    return updatedList;
  }

  async changePosition(
    listId: string,
    projectId: string,
    parentId: string,
    userId: string,
  ) {
    if (listId === parentId) {
      throw new BadRequestException('You cannot change position with itself');
    }

    const member = await this.memberRepository.findInProject(userId, projectId);

    if (!member) {
      throw new ForbiddenException('Cannot access this project');
    }

    if (member.role == Role.COMMON) {
      throw new UnauthorizedException('Only admins can update a list');
    }

    const list = await this.listRepository.get(listId);

    if (!list) {
      throw new NotFoundException('List not found');
    }

    if (parentId == undefined) parentId = null;

    if (list.parentId === parentId) {
      throw new BadRequestException('Cannot change position with itself');
    }

    const lists = await this.listRepository.getAll(projectId);

    if (lists.length < 2 && list.parentId === parentId) {
      throw new BadRequestException('Cannot change position with itself');
    }

    const sortedList = orderList(lists);

    if (parentId) {
      const parent = sortedList.find((l) => l.id == parentId);

      const listIndex = sortedList.findIndex((l) => list.id === l.id);
      const parentIndex = sortedList.findIndex((l) => parent.id === l.id);

      if (!parent) {
        throw new BadRequestException('Invalid parent id');
      }

      const childIndex = sortedList.findIndex((l) => l.parentId === list.id);
      // FROM LEFT TO RIGHT
      const lastList = sortedList[sortedList.length - 1];
      if (lastList.id == parentId) {
        const child = sortedList[childIndex];
        if (list.parentId === null) {
          // IS ON BEGINING
          child.parentId = null;
        } else {
          // IS ON THE MIDDLE
          child.parentId = list.parentId;
        }
        sortedList[childIndex] = child;
        await this.listRepository.update(child.id, {
          parentId: child.parentId,
        });
        await this.listRepository.update(list.id, { parentId: lastList.id });
        list.parentId = lastList.id;
        sortedList.splice(listIndex, 1);
        sortedList.push(list);
        return sortedList;
      }

      // FROM RIGHT TO LEFT
      // LIST IS IN MIDDLE
      if (childIndex != -1) {
        const child = sortedList[childIndex];
        child.parentId = list.parentId;
        await this.listRepository.update(child.id, {
          parentId: child.parentId,
        });

        sortedList[childIndex] = child;

        const rightListIndex = sortedList.findIndex(
          (l) => l.parentId == parent.id,
        );
        const rightList = sortedList[rightListIndex];
        rightList.parentId = list.id;
        await this.listRepository.update(rightList.id, {
          parentId: rightList.parentId,
        });

        sortedList[rightListIndex] = rightList;

        list.parentId = parent.id;
        await this.listRepository.update(list.id, {
          parentId: list.parentId,
        });
        sortedList.splice(listIndex, 1);
        sortedList.splice(parentIndex, 0, list);

        return sortedList;
      } else {
        const rightListIndex = sortedList.findIndex(
          (l) => l.parentId == parentId,
        );

        const rightList = sortedList[rightListIndex];
        rightList.parentId = list.id;
        await this.listRepository.update(rightList.id, {
          parentId: rightList.parentId,
        });

        sortedList[rightListIndex] = rightList;

        list.parentId = parent.id;

        await this.listRepository.update(list.id, {
          parentId: list.parentId,
        });
        sortedList.splice(listIndex, 1);
        sortedList.splice(parentIndex, 0, list);

        return sortedList;
      }
    } else {
      const childIndex = sortedList.findIndex((l) => l.parentId === list.id);
      if (childIndex != -1) {
        const child = sortedList[childIndex];
        child.parentId = list.parentId;
        await this.listRepository.update(child.id, {
          parentId: child.parentId,
        });
      }

      list.parentId = null; // TO FIRST POSITION
      sortedList[0].parentId = list.id; // TO SECOND POSITION IN THIS CASE

      const listIndex = sortedList.findIndex((l) => list.id === l.id);
      await this.listRepository.update(list.id, { parentId: list.parentId });
      await this.listRepository.update(sortedList[0].id, { parentId: list.id });

      sortedList.splice(listIndex, 1);
      sortedList.unshift(list);

      return sortedList;
    }
  }
}
