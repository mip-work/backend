import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateAssigneeDto } from '../dtos/requests/create-assignee.dto';
import { AssigneeServices } from '../services/assignee.services';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Response } from 'express';
import { MemberGuard } from 'src/guards/member.guard';

@ApiTags('Assignee')
@UseGuards(AuthGuard)
@Controller('assignee')
export class AssigneeControllers {
  constructor(private assigneeService: AssigneeServices) {}

  @UseGuards(PermissionGuard)
  @Post(':projectId')
  async attatchToIssue(
    @Body() dto: CreateAssigneeDto,
    @Param('projectId') projectId: string,
    @Res() res: Response,
  ) {
    const assignee = await this.assigneeService.attachToIssue(dto, projectId);
    return res.status(HttpStatus.CREATED).json({
      data: assignee,
      status: HttpStatus.CREATED,
    });
  }

  @UseGuards(MemberGuard)
  @Get(':projectId')
  async geAssignees(@Body('issueId') issueId: string, @Res() res: Response) {
    const assignees = await this.assigneeService.getAssignees(issueId);
    return res.status(HttpStatus.OK).json({
      data: assignees,
      status: HttpStatus.OK,
    });
  }

  @UseGuards(MemberGuard)
  @Get(':projectId/:assigneeId')
  async getAssignee(
    @Param('assigneeId') assigneeId: string,
    @Res() res: Response,
  ) {
    const assignee = await this.assigneeService.getAssignee(assigneeId);
    return res.status(HttpStatus.OK).json({
      data: assignee,
      status: HttpStatus.OK,
    });
  }

  @UseGuards(PermissionGuard)
  @Delete(':projectId/:assigneeId')
  async remove(@Param('assigneeId') assigneeId: string, @Res() res: Response) {
    await this.assigneeService.delete(assigneeId);
    return res.status(HttpStatus.OK).json();
  }
}
