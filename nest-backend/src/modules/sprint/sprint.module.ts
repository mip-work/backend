import { Module } from '@nestjs/common';
import { SprintRespository } from './repositories/sprint.repository';
import { SprintServices } from './services/sprint.services';
import { SprintControllers } from './controllers/sprint.controllers';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  controllers: [SprintControllers],
  providers: [SprintRespository, SprintServices, PrismaService],
})
export class SprintModule {}
