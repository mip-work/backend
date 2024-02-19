import { Module } from '@nestjs/common';
import { ProjectRepository } from './repositories/project.repository';
import { ProjectServices } from './services/project.services';
import { ProjectControllers } from './controllers/project.controllers';
import { PrismaService } from 'src/db/prisma.service';
import { UserRepository } from '../User/repositories/user.repository';

@Module({
  controllers: [ProjectControllers],
  providers: [
    ProjectRepository,
    UserRepository,
    ProjectServices,
    PrismaService,
  ],
})
export class ProjectModule {}
