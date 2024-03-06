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
import { ListServices } from '../services/list.services';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { CreateListDto } from '../dtos/requests/create-list.dto';

@ApiTags('List')
@Controller('list')
export class ListControllers {
  constructor(private listService: ListServices) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() body: CreateListDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const list = await this.listService.create(body, req.user.id);
    return res.status(HttpStatus.CREATED).json({
      data: list,
      status: HttpStatus.CREATED,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/:projectId/:id')
  async get(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const list = await this.listService.get(id, projectId, req.user.id);
    return res.status(HttpStatus.OK).json({
      data: list,
      status: HttpStatus.OK,
    });
  }

  @UseGuards(AuthGuard)
  @Delete('/:projectId')
  async delete(
    @Param('projectId') projectId: string,
    @Body('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.listService.delete(id, projectId, req.user.id);
    return res.status(HttpStatus.OK).json();
  }

  @UseGuards(AuthGuard)
  @Get('/:projectId')
  async getAll(
    @Param('projectId') projectId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const list = await this.listService.getAll(projectId, req.user.id);
    return res.status(HttpStatus.OK).json({
      data: list,
      status: HttpStatus.OK,
    });
  }

  @UseGuards(AuthGuard)
  @Patch(':projectId/:listId')
  async update(
    @Param('projectId') projectId: string,
    @Param('listId') listId: string,
    @Body('parentId') parentId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const list = await this.listService.changePosition(
      listId,
      projectId,
      parentId,
      req.user.id,
    );
    return res.status(HttpStatus.OK).json({
      data: list,
      status: HttpStatus.OK,
    });
  }
}
