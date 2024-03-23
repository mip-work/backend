import { Module } from '@nestjs/common';
import { SprintRespository } from './repositories/sprint.repository';
import { SprintServices } from './services/sprint.services';
import { SprintControllers } from './controllers/sprint.controllers';
import { PrismaService } from 'src/db/prisma.service';
import { UserRepository } from '../User/repositories/user.repository';
import { MemberRepository } from '../member/repositories/member.repository';
import { ProjectRepository } from '../project/repositories/project.repository';

@Module({
  controllers: [SprintControllers],
  providers: [SprintRespository, SprintServices, PrismaService, UserRepository, MemberRepository, ProjectRepository],
})
export class SprintModule {}
