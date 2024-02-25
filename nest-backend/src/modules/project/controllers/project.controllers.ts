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
<<<<<<< HEAD
import { Response } from 'express';
=======
import { Request, Response } from 'express';
>>>>>>> fdd56f52793c83b0a3b58949a9ee77d5df4f2408
import { ApiTags } from '@nestjs/swagger';
import { UpdateProjectDto } from '../dtos/requests/update-project.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiTags('Project')
@Controller('project')
export class ProjectControllers {
  constructor(private projectService: ProjectServices) {}

  @UseGuards(AuthGuard)
  @Post()
<<<<<<< HEAD
  async create(@Body() request: CreateProjectDto, @Res() res: Response) {
    const project = await this.projectService.create(request);
=======
  async create(
    @Body() dto: CreateProjectDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const project = await this.projectService.create({
      ...dto,
      userId: req.user.id,
    });
>>>>>>> fdd56f52793c83b0a3b58949a9ee77d5df4f2408
    return res.status(HttpStatus.CREATED).json({
      data: project,
      status: HttpStatus.CREATED,
    });
  }

  @Get('/:id')
  async get(@Param('id') request: string, @Res() res: Response) {
    const project = await this.projectService.get(request);
    return res.status(HttpStatus.OK).json({
      data: project,
      status: HttpStatus.OK,
    });
  }

  @Get('/projects/:userId')
  async getAll(@Param('userId') request: string, @Res() res: Response) {
    const project = await this.projectService.getAll(request);
    return res.status(HttpStatus.OK).json({
      data: project,
      status: HttpStatus.OK,
    });
  }

  @Patch(':id')
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
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.projectService.delete(id);
    return res.status(HttpStatus.OK).json();
  }
}
