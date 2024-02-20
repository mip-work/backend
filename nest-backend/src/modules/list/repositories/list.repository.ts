import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateListDto } from '../dtos/requests/create-list.dto';

@Injectable()
export class ListRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateListDto) {
    const list = await this.prisma.list.create({
      data: dto,
    });
    return list;
  }

  async get(id: string) {
    const list = await this.prisma.list.findFirst({ where: { id } });
    return list;
  }
}
