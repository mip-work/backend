import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateCommentDto } from '../dtos/requests/create-comment.dto';
import { UpdateCommentDto } from '../dtos/requests/update-comment.dto';

@Injectable()
export class CommentRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCommentDto) {
    const comment = await this.prisma.comment.create({
      data: dto,
    });
    return comment;
  }

  async update(id: string, dto: UpdateCommentDto) {
    const comment = await this.prisma.comment.update({
      where: { id },
      data: dto,
    });

    return comment;
  }

  async get(id: string) {
    const comment = await this.prisma.comment.findFirst({
      where: { id },
    });
    return comment;
  }

  async getAll(issueId: string) {
    const comment = await this.prisma.comment.findMany({
      where: { issueId },
    });
    return comment;
  }

  async getUserCommentInIssue(userId: string, issueId: string) {
    const comment = await this.prisma.comment.findMany({
      where: { userId, issueId },
    });
    return comment;
  }

  async getByUserId(userId: string) {
    const comment = await this.prisma.comment.findMany({
      where: { userId },
    });
    return comment;
  }

  async delete(id: string) {
    const comment = await this.prisma.comment.delete({
      where: { id },
    });
    return comment;
  }
}
