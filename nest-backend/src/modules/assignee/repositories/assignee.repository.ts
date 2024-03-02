import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateAssigneeDto } from '../dtos/requests/create-assignee.dto';

@Injectable()
export class AssigneeRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAssigneeDto) {
    const assignee = await this.prisma.assignee.create({
      data: dto,
    });
    return assignee;
  }

  async get(id: string) {
    const assignee = await this.prisma.assignee.findFirst({ where: { id } });
    return assignee;
  }

  async delete(id: string) {
    const assignee = await this.prisma.assignee.delete({ where: { id } });
    return assignee;
  }

  async update(id: string, dto: UpdateAssigneeDto) {
    const assignee = await this.prisma.assignee.update({
      where: { id },
      data: dto,
    });
    return assignee;
  }
}
