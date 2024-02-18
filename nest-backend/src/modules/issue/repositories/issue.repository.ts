import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateIssueDto } from '../dtos/create-issue.dto';

@Injectable()
export class IssueRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateIssueDto) {
    const user = await this.prisma.issue.create({
      data: dto,
    });
    return user;
  }
}