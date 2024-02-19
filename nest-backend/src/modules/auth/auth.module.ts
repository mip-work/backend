import { Module } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { UserRepository } from '../User/repositories/user.repository';
import { AuthService } from './services/auth.services';
import { AuthController } from './controllers/auth.controllers';

@Module({
  controllers: [AuthController],
  providers: [UserRepository, AuthService, PrismaService],
})
export class AuthModule {}