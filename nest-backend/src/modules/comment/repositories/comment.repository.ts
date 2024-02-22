import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateCommentDto } from '../dtos/requests/create-comment.dto';

@Injectable()
export class CommentRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCommentDto) {
    const comment = await this.prisma.comment.create({
      data: dto,
    });
    return comment;
  }
}
