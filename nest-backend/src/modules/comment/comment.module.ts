import { Module } from '@nestjs/common';
import { CommentControllers } from './controllers/comment.controllers';
import { CommentRepository } from './repositories/comment.repository';
import { CommentServices } from './services/comment.services';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  controllers: [CommentControllers],
  providers: [CommentRepository, CommentServices, PrismaService],
})
export class CommentModule {}
