import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateIssueDto } from '../dtos/requests/create-issue.dto';
import { UpdateIssueDTO } from '../dtos/requests/update-issue.dto';

@Injectable()
export class IssueRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateIssueDto) {
    const issue = await this.prisma.issue.create({
      data: dto,
    });
    return issue;
  }

  async get(id: string) {
    const issue = await this.prisma.issue.findFirst({
      where: { id },
    });
    return issue;
  }

  async getAll(listId: string) {
    const issue = await this.prisma.issue.findMany({
      where: { listId },
    });
    return issue;
  }

  async delete(id: string) {
    const issue = await this.prisma.issue.delete({
      where: { id },
    });
    return issue;
  }

  async update(id: string, dto: UpdateIssueDTO) {
    const issue = await this.prisma.issue.update({
      where: { id },
      data: dto,
    });
    return issue;
  }

  async changeRole(id: string, parentId: string) {
    const issue = await this.prisma.issue.update({
      where: { id },
      data: { parentId },
    });
    return issue;
  }

  async getByParentId(parentId: string, listId: string) {
    const issue = await this.prisma.issue.findFirst({
      where: { parentId, listId },
    });
    return issue;
  }

  async checkEmptyIssue(listId: string) {
    const issue = await this.prisma.issue.findFirst({
      where: { parentId: null, listId },
    });
    return issue;
  }
}
