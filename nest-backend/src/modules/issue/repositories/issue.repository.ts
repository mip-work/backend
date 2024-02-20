import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateIssueDto } from '../dtos/requests/create-issue.dto';

@Injectable()
export class IssueRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateIssueDto) {
    const issue = await this.prisma.issue.create({
      data: dto,
    });
    return issue;
  }
}
