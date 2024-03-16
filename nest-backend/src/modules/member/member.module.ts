import { Module } from '@nestjs/common';
import { MemberControllers } from './controllers/member.controllers';
import { MemberRepository } from './repositories/member.repository';
import { MemberServices } from './services/member.services';
import { PrismaService } from 'src/db/prisma.service';
import { UserRepository } from '../User/repositories/user.repository';
import { ProjectRepository } from '../project/repositories/project.repository';

@Module({
  controllers: [MemberControllers],
  providers: [
    MemberRepository,
    UserRepository,
    ProjectRepository,
    MemberServices,
    PrismaService,
  ],
})
export class MemberModule {}
