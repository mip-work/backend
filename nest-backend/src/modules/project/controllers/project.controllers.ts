import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectDto } from '../dtos/requests/create-project.dto';
import { ProjectServices } from '../services/project.services';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProjectDto } from '../dtos/requests/update-project.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { MemberGuard } from 'src/guards/member.guard';

@ApiTags('Project')
@Controller('project')
@UseGuards(AuthGuard)
export class ProjectControllers {
  constructor(private projectService: ProjectServices) {}

  @Post()
  async create(
    @Body() dto: CreateProjectDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const project = await this.projectService.create({
      ...dto,
      userId: req.user.id,
    });
    return res.status(HttpStatus.CREATED).json({
      data: project,
      status: HttpStatus.CREATED,
    });
  }

  @Get('/projects/:id')
  @UseGuards(PermissionGuard, MemberGuard)
  async get(@Param('id') request: string, @Res() res: Response) {
    const project = await this.projectService.get(request);
    return res.status(HttpStatus.OK).json({
      data: project,
      status: HttpStatus.OK,
    });
  }

  @Get('/projects')
  async getAll(@Req() req: Request, @Res() res: Response) {
    const project = await this.projectService.getAll(req.user.id);
    return res.status(HttpStatus.OK).json({
      data: project,
      status: HttpStatus.OK,
    });
  }

  @Patch(':id')
  @UseGuards(PermissionGuard)
  async update(
    @Param('id') id: string,
    @Body() request: UpdateProjectDto,
    @Res() res: Response,
  ) {
    const project = await this.projectService.update(id, request);
    return res.status(HttpStatus.OK).json({
      data: project,
      status: HttpStatus.OK,
    });
  }

  @Delete(':id')
  @UseGuards(PermissionGuard)
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.projectService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).json();
  }
}
