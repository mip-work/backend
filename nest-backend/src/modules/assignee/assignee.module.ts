import { Module } from '@nestjs/common';
import { AssigneeControllers } from './controllers/assignee.controllers';
import { AssigneeRepository } from './repositories/assignee.repository';
import { AssigneeServices } from './services/assignee.services';
import { PrismaService } from 'src/db/prisma.service';
import { UserRepository } from '../User/repositories/user.repository';
import { MemberRepository } from '../member/repositories/member.repository';
import { ProjectRepository } from '../project/repositories/project.repository';
import { IssueRepository } from '../issue/repositories/issue.repository';

@Module({
  controllers: [AssigneeControllers],
  providers: [
    AssigneeRepository,
    UserRepository,
    MemberRepository,
    ProjectRepository,
    IssueRepository,
    AssigneeServices,
    PrismaService,
  ],
})
export class AssigneeModule {}
