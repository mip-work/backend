import { Module } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { UserRepository } from '../User/repositories/user.repository';
import { AuthServices } from './services/auth.services';
import { AuthController } from './controllers/auth.controllers';

@Module({
  controllers: [AuthController],
  providers: [UserRepository, AuthServices, PrismaService],
})
export class AuthModule {}
