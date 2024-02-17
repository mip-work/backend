import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDTO) {
    const user = await this.prisma.user.create({
      data: dto,
    });
    return user;
  }
}
