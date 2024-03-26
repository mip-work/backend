import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateAssigneeDto } from '../dtos/requests/create-assignee.dto';
import { UpdateAssigneeDto } from '../dtos/requests/update-assignee.dto';

@Injectable()
export class AssigneeRepository {
  constructor(private prisma: PrismaService) {}

  async attachToIssue(dto: CreateAssigneeDto) {
    const assignee = await this.prisma.assignee.create({
      data: dto,
    });
    return assignee;
  }

  async get(id: string) {
    const assignee = await this.prisma.assignee.findFirst({
      where: { id },
    });
    return assignee;
  }

  async getUserName(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
    });

    return user.username;
  }

  async getAllInIssue(issueId: string) {
    const assignee = await this.prisma.assignee.findMany({
      where: { issueId },
    });
    return assignee;
  }

  async getInIssue(userId: string, issueId: string) {
    const assignee = await this.prisma.assignee.findFirst({
      where: { userId, issueId },
    });
    return assignee;
  }

  async delete(id: string) {
    const assignee = await this.prisma.assignee.delete({
      where: { id },
    });
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
