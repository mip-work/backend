import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IssueRepository } from '../repositories/issue.repository';
import { ListRepository } from 'src/modules/list/repositories/list.repository';
import { CreateIssueReqDto } from '../dtos/requests/create-issue-req.dto';
import { SprintRespository } from 'src/modules/sprint/repositories/sprint.repository';
import { orderList } from 'src/modules/list/utils/order-list.utils';
import { Issue } from '../dtos/issue.dto';
import { UpdateIssueDTO } from '../dtos/requests/update-issue.dto';

@Injectable()
export class IssueServices {
  constructor(
    private issueRepository: IssueRepository,
    private sprintRepository: SprintRespository,
    private listRepository: ListRepository,
  ) {}

  async create(dto: CreateIssueReqDto) {
    const list = await this.listRepository.get(dto.listId);

    if (!list) {
      throw new NotFoundException('List not found');
    }

    if (dto.sprintId) {
      const sprint = await this.sprintRepository.get(dto.sprintId);
      if (!sprint) {
        throw new NotFoundException('Sprint not found');
      }
    }

    if (dto.parentId) {
      const checkParentId = await this.issueRepository.get(dto.parentId);

      if (!checkParentId) {
        throw new BadRequestException('Invalid parent id');
      }

      const invalidParentId = await this.issueRepository.getByParentId(
        dto.parentId,
        dto.listId,
      );

      if (invalidParentId) {
        throw new BadRequestException('Invalid parent id');
      }
    } else {
      const issues = await this.issueRepository.getAll(list.id);

      dto.parentId = null;
      if (issues.length > 0) {
        const sortedList = orderList(issues);
        dto.parentId = sortedList[sortedList.length - 1].id;
      }
    }

    const issue = await this.issueRepository.create({ ...dto, progress: 0 });

    if (!issue) {
      throw new InternalServerErrorException('Could not create an issue');
    }

    return issue;
  }

  async delete(issueId: string) {
    const issue = await this.issueRepository.get(issueId);

    if (!issue) {
      throw new NotFoundException('Issue does not exists');
    }

    const issues = await this.issueRepository.getAll(issue.listId);

    const issueIndex = issues.findIndex((i) => i.id === issue.id);

    const child = issues.find((i) => i.parentId === issue.id);
    issues.splice(issueIndex, 1);

    if (!child) {
      await this.issueRepository.delete(issueId);
      return;
    }

    child.parentId = issue.parentId;
    await this.issueRepository.changePosition(child.id, child.parentId);

    await this.issueRepository.delete(issueId);
    return;
  }

  async getAll(listId: string) {
    const issues: Issue[] = await this.issueRepository.getAll(listId);

    if (issues.length != 0) {
      const sortedList = orderList(issues);
      return sortedList;
    }

    return issues;
  }

  async get(issueId: string) {
    const issue = await this.issueRepository.get(issueId);

    if (!issue) {
      throw new NotFoundException('Issue not found');
    }

    return issue;
  }

  async changePosition(listId: string, issueId: string, parentId: string) {
    const issue = await this.issueRepository.get(issueId);

    if (!issue) {
      throw new NotFoundException('Issue not found');
    }

    if (parentId == undefined) parentId = null;

    const issues = await this.issueRepository.getAll(listId);

    if (issues.length < 2 && issue.parentId === parentId) {
      throw new BadRequestException('Cannot change position with itself');
    }

    const sortedList = orderList(issues);
    if (parentId) {
      const parent = sortedList.find((i) => i.id === parentId);

      const issueIndex = sortedList.findIndex((i) => issue.id === i.id);
      const parentIndex = sortedList.findIndex((i) => parent.id === i.id);

      if (!parent) {
        throw new BadRequestException('Invalid parent id');
      }

      const childIndex = sortedList.findIndex((i) => i.parentId === issue.id);

      const lastIssue = sortedList[sortedList.length - 1];

      if (lastIssue.id === parentId) {
        const child = sortedList[childIndex];
        if (issue.parentId === null) {
          child.parentId = null;
        } else {
          child.parentId = issue.parentId;
        }
        sortedList[childIndex] = child;
        await this.issueRepository.changePosition(child.id, child.parentId);

        await this.issueRepository.changePosition(issue.id, lastIssue.id);

        issue.parentId = lastIssue.id;
        sortedList.splice(issueIndex, 1);
        sortedList.push(issue);
        return sortedList;
      }

      if (childIndex != -1) {
        const child = sortedList[childIndex];
        child.parentId = issue.parentId;
        await this.issueRepository.changePosition(child.id, child.parentId);

        sortedList[childIndex] = child;

        const rightIssueIndex = sortedList.findIndex(
          (i) => i.parentId === parent.id,
        );

        const rightIssue = sortedList[rightIssueIndex];
        rightIssue.parentId = issue.id;
        await this.issueRepository.changePosition(
          rightIssue.id,
          rightIssue.parentId,
        );

        sortedList[rightIssueIndex] = rightIssue;

        issue.parentId = parent.id;
        await this.issueRepository.changePosition(issue.id, issue.parentId);
        sortedList.splice(issueIndex, 1);
        sortedList.splice(parentIndex, 0, issue);

        return sortedList;
      } else {
        const rightListIndex = sortedList.findIndex(
          (i) => i.parentId === parentId,
        );

        const rightList = sortedList[rightListIndex];
        rightList.parentId = issue.id;
        await this.issueRepository.changePosition(
          rightList.id,
          rightList.parentId,
        );

        sortedList[rightListIndex] = rightList;

        issue.parentId = parent.id;

        await this.issueRepository.changePosition(issue.id, issue.parentId);
        sortedList.splice(issueIndex, 1);
        sortedList.splice(parentIndex, 0, issue);

        return sortedList;
      }
    } else {
      const childIndex = sortedList.findIndex((i) => i.parentId === issue.id);
      if (childIndex != -1) {
        const child = sortedList[childIndex];
        child.parentId = issue.parentId;
        await this.issueRepository.changePosition(child.id, child.parentId);
      }

      issue.parentId = parentId;
      sortedList[0].parentId = issue.id;

      const issueIndex = sortedList.findIndex((i) => i.id === issue.id);
      await this.issueRepository.changePosition(issue.id, issue.parentId);
      await this.issueRepository.changePosition(sortedList[0].id, issue.id);

      sortedList.splice(issueIndex, 1);
      sortedList.unshift(issue);

      return sortedList;
    }
  }

  async update(issueId: string, dto: UpdateIssueDTO) {
    const issue = await this.issueRepository.get(issueId);

    if (!issue) {
      throw new NotFoundException('Issue not found');
    }

    const updatedIssue = await this.issueRepository.update(issueId, {
      ...issue,
      ...dto,
    });
    if (!updatedIssue) {
      throw new InternalServerErrorException('Could not update the issue');
    }

    return updatedIssue;
  }
}
