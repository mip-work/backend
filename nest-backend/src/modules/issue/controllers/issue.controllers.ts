import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IssueServices } from '../services/issue.services';
import { ApiTags } from '@nestjs/swagger';
import { CreateIssueReqDto } from '../dtos/requests/create-issue-req.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { Response } from 'express';
import { PermissionGuard } from 'src/guards/permission.guard';
import { MemberGuard } from 'src/guards/member.guard';
import { UpdateIssueDTO } from '../dtos/requests/update-issue.dto';

@ApiTags('Issue')
@UseGuards(AuthGuard)
@Controller('issue')
export class IssueControllers {
  constructor(private issueService: IssueServices) {}

  @UseGuards(PermissionGuard)
  @Post(':projectId')
  async create(@Body() body: CreateIssueReqDto, @Res() res: Response) {
    const issue = await this.issueService.create(body);
    return res.status(HttpStatus.CREATED).json({
      data: issue,
      status: HttpStatus.CREATED,
    });
  }

  @UseGuards(PermissionGuard)
  @Delete(':projectId')
  async delete(@Res() res: Response, @Body('issueId') issueId: string) {
    await this.issueService.delete(issueId);
    return res.status(HttpStatus.OK).json();
  }

  @UseGuards(MemberGuard)
  @Get(':projectId')
  async getAll(@Res() res: Response, @Body('listId') listId: string) {
    const issues = await this.issueService.getAll(listId);

    return res.status(HttpStatus.OK).json({
      data: issues,
      status: HttpStatus.OK,
    });
  }

  @UseGuards(PermissionGuard)
  @Patch('/role/:projectId')
  async changeRole(
    @Body('parentId') parentId: string,
    @Res() res: Response,
    @Query('issueId') issueId: string,
    @Query('listId') listId: string,
  ) {
    const issue = await this.issueService.changeRole(listId, issueId, parentId);

    return res.status(HttpStatus.OK).json({
      data: issue,
      status: HttpStatus.OK,
    });
  }

  @UseGuards(PermissionGuard)
  @Patch(':projectId')
  async update(
    @Body() body: UpdateIssueDTO,
    @Res() res: Response,
    @Query('issueId') issueId: string,
  ) {
    const issue = await this.issueService.update(issueId, body);

    return res.status(HttpStatus.OK).json({
      data: issue,
      status: HttpStatus.OK,
    });
  }
}
