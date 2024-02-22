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
}
