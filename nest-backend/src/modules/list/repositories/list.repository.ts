import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateListDto } from '../dtos/create-list.dto';

@Injectable()
export class ListRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateListDto) {
    const user = await this.prisma.list.create({
      data: dto,
    });
    return user;
  }
}
