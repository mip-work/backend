import { Module } from '@nestjs/common';
import { ProjectRepository } from './repositories/project.repository';
import { ProjectServices } from './services/project.services';
import { ProjectControllers } from './controllers/project.controllers';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  controllers: [ProjectControllers],
  providers: [ProjectRepository, ProjectServices, PrismaService],
})
export class ProjectModule {}
