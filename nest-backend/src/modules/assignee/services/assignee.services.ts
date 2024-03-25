import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AssigneeRepository } from '../repositories/assignee.repository';
import { CreateAssigneeDto } from '../dtos/requests/create-assignee.dto';
import { MemberRepository } from 'src/modules/member/repositories/member.repository';
import { IssueRepository } from 'src/modules/issue/repositories/issue.repository';

@Injectable()
export class AssigneeServices {
  constructor(
    private assigneeRepository: AssigneeRepository,
    private memberRepository: MemberRepository,
    private issueRepository: IssueRepository,
  ) {}

  async attachToIssue(dto: CreateAssigneeDto, projectId: string) {
    const member = await this.memberRepository.findInProject(
      dto.userId,
      projectId,
    );

    if (!member) {
      throw new ForbiddenException('This user is not in the project');
    }

    const issue = await this.issueRepository.get(dto.issueId);

    if (!issue) {
      throw new NotFoundException('Issue not found');
    }

    const checkAssigneeId = await this.assigneeRepository.getInIssue(
      dto.userId,
      issue.id,
    );

    if (checkAssigneeId) {
      throw new BadRequestException('Member already assigned to this issue');
    }

    const assignee = await this.assigneeRepository.attachToIssue(dto);
    return assignee;
  }

  async getAssignees(issueId: string) {
    const assignees = await this.assigneeRepository.getAllInIssue(issueId);

    return assignees;
  }

  async getAssignee(assigneeId: string) {
    const assignee = await this.assigneeRepository.get(assigneeId);

    if (!assignee) {
      throw new NotFoundException('Assignee not found');
    }

    const userName = await this.assigneeRepository.getUserName(assignee.userId);

    return { userName, assignee };
  }

  async delete(assigneeId: string) {
    const assignee = await this.assigneeRepository.get(assigneeId);

    if (!assignee) {
      throw new ForbiddenException('Assignee not found');
    }

    await this.assigneeRepository.delete(assigneeId);

    return;
  }
}
