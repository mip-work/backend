import { Module } from '@nestjs/common';
import { IssueControllers } from './controllers/issue.controllers';
import { IssueRepository } from './repositories/issue.repository';
import { IssueServices } from './services/issue.services';
import { PrismaService } from 'src/db/prisma.service';
import { MemberRepository } from '../member/repositories/member.repository';
import { UserRepository } from '../User/repositories/user.repository';
import { AssigneeRepository } from '../assignee/repositories/assignee.repository';
import { ListRepository } from '../list/repositories/list.repository';
import { ProjectRepository } from '../project/repositories/project.repository';
import { SprintRespository } from '../sprint/repositories/sprint.repository';

@Module({
  controllers: [IssueControllers],
  providers: [
    IssueRepository,
    IssueServices,
    MemberRepository,
    UserRepository,
    SprintRespository,
    AssigneeRepository,
    ListRepository,
    ProjectRepository,
    PrismaService,
  ],
})
export class IssueModule {}
