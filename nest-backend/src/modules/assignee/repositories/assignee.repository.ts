import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateAssigneeDto } from '../dtos/requests/create-assignee.dto';
import { UpdateAssigneeDto } from '../dtos/requests/update-assignee.dto';

@Injectable()
export class AssigneeRepository {
  constructor(private prisma: PrismaService) {}

  async addInIssue(dto: CreateAssigneeDto) {
    const assignee = await this.prisma.assignee.create({
      data: dto,
    });
    return assignee;
  }

  async get(id: string) {
    const assignee = await this.prisma.assignee.findFirst({ 
      where: { id } 
    });
    return assignee;
  }

  async getAllInIssue(issueId: string) {
    const assignee = await this.prisma.assignee.findMany({
      where: { issueId },
    });
    return assignee;
  }

  async getInIssue(id: string, issueId: string) {
    const assignee = await this.prisma.assignee.findFirst({
      where: { id, issueId },
    });
    return assignee;
  }

  async delete(id: string) {
    const assignee = await this.prisma.assignee.delete({ 
      where: { id } 
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
