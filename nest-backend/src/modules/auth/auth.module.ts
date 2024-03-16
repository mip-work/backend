import { Module } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { UserRepository } from '../User/repositories/user.repository';
import { AuthServices } from './services/auth.services';
import { AuthController } from './controllers/auth.controllers';
import { UserServices } from '../User/services/users.services';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({global: true, secret: process.env.JWT_ACCESS_TOKEN_SECRET, signOptions: {expiresIn: "24h"}})],
  controllers: [AuthController],
  providers: [UserRepository, UserServices, AuthServices, PrismaService],
})
export class AuthModule {}
