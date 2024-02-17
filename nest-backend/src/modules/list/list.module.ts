import { Module } from '@nestjs/common';
import { ListRepository } from './repositories/list.repository';
import { ListServices } from './services/list.services';
import { ListControllers } from './controllers/list.controllers';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  controllers: [ListControllers],
  providers: [ListRepository, ListServices, PrismaService],
})
export class ListModule {}
