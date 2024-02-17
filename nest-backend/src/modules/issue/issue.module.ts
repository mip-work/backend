import { Module } from '@nestjs/common';
import { IssueControllers } from './controllers/issue.controllers';
import { IssueRepository } from './repositories/issue.repository';
import { IssueServices } from './services/issue.services';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  controllers: [IssueControllers],
  providers: [IssueRepository, IssueServices, PrismaService],
})
export class IssueModule {}
