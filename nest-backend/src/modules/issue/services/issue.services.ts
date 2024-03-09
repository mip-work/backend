import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IssueRepository } from '../repositories/issue.repository';
import { MemberRepository } from 'src/modules/member/repositories/member.repository';
import { UserRepository } from 'src/modules/User/repositories/user.repository';
import { AssigneeRepository } from 'src/modules/assignee/repositories/assignee.repository';
import { ListRepository } from 'src/modules/list/repositories/list.repository';
import { CreateIssueReqDto } from '../dtos/requests/create-issue-req.dto';
import { ProjectRepository } from 'src/modules/project/repositories/project.repository';
import { Role } from 'src/modules/member/dtos/enums/role.enum';
import { SprintRespository } from 'src/modules/sprint/repositories/sprint.repository';
import { orderList } from 'src/modules/list/utils/order-list.utils';

@Injectable()
export class IssueServices {
  constructor(
    private issueRepository: IssueRepository,
    private memberRepository: MemberRepository,
    private userRepository: UserRepository,
    private assigneeRepository: AssigneeRepository,
    private sprintRepository: SprintRespository,
    private listRepository: ListRepository,
    private projectRepository: ProjectRepository,
  ) {}

  async create(dto: CreateIssueReqDto, userId: string, projectId: string) {
    const project = await this.projectRepository.get(projectId);

    if (!project) {
      throw new NotFoundException('Project does not exists');
    }

    const list = await this.listRepository.get(dto.listId);

    if (!list) {
      throw new NotFoundException('List not found');
    }

    const member = await this.memberRepository.findInProject(userId, projectId);

    if (!member) {
      throw new ForbiddenException('Cannot access this project');
    }

    if (member.role == Role.COMMON) {
      throw new UnauthorizedException('Only admins can create an issue');
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
      const sortedList = orderList(issues);
      dto.parentId = sortedList[sortedList.length - 1].id;
      console.log(sortedList);
    }

    const issue = await this.issueRepository.create({ ...dto, progress: 0 });

    if (!issue) {
      throw new InternalServerErrorException('Could not create an issue');
    }

    return issue;
  }

  async delete(issueId: string, projectId: string, userId: string) {
    const member = await this.memberRepository.findInProject(userId, projectId);

    if (!member) {
      throw new ForbiddenException('Cannot access this project');
    }

    if (member.role == Role.COMMON) {
      throw new UnauthorizedException('Only admins can delete an issue');
    }

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
    await this.issueRepository.update(child.id, { parentId: child.parentId });

    await this.issueRepository.delete(issueId);
    return;
  }
}
