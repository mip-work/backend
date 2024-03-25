import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateListDto } from '../dtos/requests/create-list.dto';
import { UpdateListDTO } from '../dtos/requests/update-list-dto';

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
    const list = await this.prisma.list.findFirst({
      where: { id },
    });
    return list;
  }

  async getAll(projectId: string) {
    const list = await this.prisma.list.findMany({
      where: { projectId },
    });
    return list;
  }

  async delete(id: string) {
    const list = await this.prisma.list.delete({
      where: { id },
    });
    return list;
  }

  async update(id: string, dto: UpdateListDTO) {
    const list = await this.prisma.list.update({
      where: { id },
      data: dto,
    });
    return list;
  }

  async changePosition(id: string, parentId: string) {
    const list = await this.prisma.list.update({
      where: { id },
      data: { parentId },
    });
    return list;
  }

  async getByParentId(parentId: string, projectId: string) {
    const list = await this.prisma.list.findFirst({
      where: { parentId, projectId },
    });
    return list;
  }
}
