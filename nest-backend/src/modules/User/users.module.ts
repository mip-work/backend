import { Module } from '@nestjs/common';
import { UserControllers } from './controllers/user.controllers';
import { UserRepository } from './repositories/user.repository';
import { UserServices } from './services/users.services';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  controllers: [UserControllers],
  providers: [UserRepository, UserServices, PrismaService],
})
export class UserModule {}
