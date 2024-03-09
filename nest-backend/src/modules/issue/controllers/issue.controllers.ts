import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IssueServices } from '../services/issue.services';
import { ApiTags } from '@nestjs/swagger';
import { CreateIssueReqDto } from '../dtos/requests/create-issue-req.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { Request, Response } from 'express';

@ApiTags('Issue')
@Controller('issue')
export class IssueControllers {
  constructor(private issueService: IssueServices) {}

  @UseGuards(AuthGuard)
  @Post(':projectId')
  async create(
    @Body() body: CreateIssueReqDto,
    @Param('projectId') projectId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const issue = await this.issueService.create(body, req.user.id, projectId);
    return res.status(HttpStatus.CREATED).json({
      data: issue,
      status: HttpStatus.CREATED,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':projectId')
  async delete(
    @Param('projectId') projectId: string,
    @Req() req: Request,
    @Res() res: Response,
    @Body('issueId') issueId: string,
  ) {
    console.log(issueId);
    await this.issueService.delete(issueId, projectId, req.user.id);
    return res.status(HttpStatus.OK).json();
  }
}
