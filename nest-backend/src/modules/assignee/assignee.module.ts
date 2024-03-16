import { Module } from '@nestjs/common';
import { AssigneeControllers } from './controllers/assignee.controllers';
import { AssigneeRepository } from './repositories/assignee.repository';
import { AssigneeServices } from './services/assignee.services';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  controllers: [AssigneeControllers],
  providers: [AssigneeRepository, AssigneeServices, PrismaService],
})
export class AssigneeModule {}
