import { Module } from '@nestjs/common';
import { ProjectRepository } from './repositories/project.repository';
import { ProjectServices } from './services/project.services';
import { ProjectControllers } from './controllers/project.controllers';
import { PrismaService } from 'src/db/prisma.service';
import { UserRepository } from '../User/repositories/user.repository';
import { MemberServices } from '../member/services/member.services';
import { MemberRepository } from '../member/repositories/member.repository';

@Module({
  imports: [],
  controllers: [ProjectControllers],
  providers: [
    ProjectRepository,
    UserRepository,
    MemberServices,
    MemberRepository,
    ProjectServices,
    PrismaService,
  ],
})
export class ProjectModule {}
