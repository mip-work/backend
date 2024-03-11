import {
  Body,
  Controller,
  Delete,
  Get,
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
import { PermissionGuard } from 'src/guards/permission.guard';
import { MemberGuard } from 'src/guards/member.guard';

@ApiTags('Issue')
@UseGuards(AuthGuard)
@Controller('issue')
export class IssueControllers {
  constructor(private issueService: IssueServices) {}

  @UseGuards(PermissionGuard)
  @Post(':projectId')
  async create(
    @Body() body: CreateIssueReqDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const issue = await this.issueService.create(body);
    return res.status(HttpStatus.CREATED).json({
      data: issue,
      status: HttpStatus.CREATED,
    });
  }

  @UseGuards(PermissionGuard)
  @Delete(':projectId')
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @Body('issueId') issueId: string,
  ) {
    await this.issueService.delete(issueId);
    return res.status(HttpStatus.OK).json();
  }

  @UseGuards(MemberGuard)
  @Get(':projectId')
  async getAll(
    @Param('projectId') projectId: string,
    @Req() req: Request,
    @Res() res: Response,
    @Body('listId') listId: string,
  ) {
    const issues = await this.issueService.getAll(listId);

    return res.status(HttpStatus.OK).json({
      data: issues,
      status: HttpStatus.OK,
    });
  }
}
