import { Module } from '@nestjs/common';
import { MemberControllers } from './controllers/member.controllers';
import { MemberRepository } from './repositories/member.repository';
import { MemberServices } from './services/member.services';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  controllers: [MemberControllers],
  providers: [MemberRepository, MemberServices, PrismaService],
})
export class MemberModule {}
