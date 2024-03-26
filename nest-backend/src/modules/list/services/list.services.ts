import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListRepository } from '../repositories/list.repository';
import { ProjectRepository } from 'src/modules/project/repositories/project.repository';
import { List } from '../dtos/list.dto';
import { UpdateListDTO } from '../dtos/requests/update-list-dto';
import { orderList } from '../utils/order-list.utils';
import { CreateListDtoReq } from '../dtos/requests/create-list-req.dto';

@Injectable()
export class ListServices {
  constructor(
    private listRepository: ListRepository,
    private projectRepository: ProjectRepository,
  ) {}

  async create(dto: CreateListDtoReq, projectId: string) {
    const project = await this.projectRepository.get(projectId);

    if (!project) {
      throw new NotFoundException('Project does not exist');
    }

    if (dto.parentId) {
      const checkParentId = await this.listRepository.get(dto.parentId);

      if (!checkParentId) {
        throw new BadRequestException('This parent id does not exist');
      }
      const invalidParentId = await this.listRepository.getByParentId(
        dto.parentId,
        projectId,
      );

      if (invalidParentId) {
        throw new BadRequestException('Invalid parent id');
      }
    } else {
      const lists = await this.listRepository.getAll(projectId);

      dto.parentId = null;
      if (lists.length > 0) {
        const sortedList = orderList(lists);
        dto.parentId = sortedList[sortedList.length - 1].id;
      }
    }

    const list = await this.listRepository.create({ ...dto, projectId });

    if (!list) {
      throw new BadRequestException('Could not create a list');
    }

    return list;
  }

  async delete(id: string, projectId: string) {
    const list = await this.listRepository.get(id);

    if (!list) {
      throw new NotFoundException('List does not exist to delete');
    }

    const lists = await this.listRepository.getAll(projectId);

    const listIndex = lists.findIndex((l) => l.id == list.id);

    const child = lists.find((l) => l.parentId === list.id);
    lists.splice(listIndex, 1);

    if (!child) {
      await this.listRepository.delete(id)
      return;
    }
    child.parentId = list.parentId;
    await this.listRepository.changePosition(child.id, child.parentId);

    await this.listRepository.delete(id);
    return;
  }

  async get(id: string) {
    const list = await this.listRepository.get(id);

    if (!list) {
      throw new NotFoundException('List does not exist');
    }

    return list;
  }

  async getAll(projectId: string) {
    const lists: List[] = await this.listRepository.getAll(projectId);

    if (lists.length < 1) {
      return lists;
    }

    const sortedList = orderList(lists);

    return sortedList;
  }

  async update(id: string, dto: UpdateListDTO) {
    const list = await this.listRepository.get(id);

    if (!list) {
      throw new NotFoundException('List not found');
    }

    const updatedList = await this.listRepository.update(id, {
      ...list,
      ...dto,
    });

    return updatedList;
  }

  async changePosition(listId: string, projectId: string, parentId: string) {
    const list = await this.listRepository.get(listId);

    if (!list) {
      throw new NotFoundException('List not found');
    }

    if (parentId == undefined) parentId = null;

    const lists = await this.listRepository.getAll(projectId);

    if (lists.length < 2 || list.parentId === parentId) {
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
        await this.listRepository.changePosition(child.id, child.parentId);

        await this.listRepository.changePosition(list.id, lastList.id);

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
        await this.listRepository.changePosition(child.id, child.parentId);

        sortedList[childIndex] = child;

        const rightListIndex = sortedList.findIndex(
          (l) => l.parentId === parent.id,
        );

        const rightList = sortedList[rightListIndex];
        rightList.parentId = list.id;
        await this.listRepository.changePosition(
          rightList.id,
          rightList.parentId,
        );

        sortedList[rightListIndex] = rightList;

        list.parentId = parent.id;
        await this.listRepository.changePosition(list.id, list.parentId);
        sortedList.splice(listIndex, 1);
        sortedList.splice(parentIndex, 0, list);

        return sortedList;
      } else {
        const rightListIndex = sortedList.findIndex(
          (l) => l.parentId === parentId,
        );

        const rightList = sortedList[rightListIndex];
        rightList.parentId = list.id;
        await this.listRepository.changePosition(
          rightList.id,
          rightList.parentId,
        );

        sortedList[rightListIndex] = rightList;

        list.parentId = parent.id;

        await this.listRepository.changePosition(list.id, list.parentId);
        sortedList.splice(listIndex, 1);
        sortedList.splice(parentIndex, 0, list);

        return sortedList;
      }
    } else {
      const childIndex = sortedList.findIndex((l) => l.parentId === list.id);
      if (childIndex != -1) {
        const child = sortedList[childIndex];
        child.parentId = list.parentId;
        await this.listRepository.changePosition(child.id, child.parentId);
      }

      list.parentId = parentId; // TO FIRST POSITION
      sortedList[0].parentId = list.id; // TO SECOND POSITION IN THIS CASE

      const listIndex = sortedList.findIndex((l) => list.id === l.id);
      await this.listRepository.changePosition(list.id, list.parentId);
      await this.listRepository.changePosition(sortedList[0].id, list.id);

      sortedList.splice(listIndex, 1);
      sortedList.unshift(list);

      return sortedList;
    }
  }
}
