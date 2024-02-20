import { Body, Controller, Post } from '@nestjs/common';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { CommentServices } from '../services/comment.services';

@Controller('comment')
export class CommentControllers {
  constructor(private commentService: CommentServices) {}
  @Post()
  async create(@Body() request: CreateCommentDto) {
    const comment = await this.commentService.create(request);
    return comment;
  }
}
