import { Module } from '@nestjs/common';
import { ListRepository } from './repositories/list.repository';
import { ListServices } from './services/list.services';
import { ListControllers } from './controllers/list.controllers';
import { PrismaService } from 'src/db/prisma.service';
import { ProjectRepository } from '../project/repositories/project.repository';

@Module({
  controllers: [ListControllers],
  providers: [ListRepository, ProjectRepository, ListServices, PrismaService],
})
export class ListModule {}
