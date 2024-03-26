import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ListServices } from '../services/list.services';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { MemberGuard } from 'src/guards/member.guard';
import { CreateListDtoReq } from '../dtos/requests/create-list-req.dto';

@ApiTags('List')
@UseGuards(AuthGuard)
@Controller('list')
export class ListControllers {
  constructor(private listService: ListServices) {}

  @UseGuards(PermissionGuard)
  @Post(':projectId')
  async create(
    @Body() body: CreateListDtoReq,
    @Param('projectId') projectId: string,
    @Res() res: Response,
  ) {
    const list = await this.listService.create(body, projectId);
    return res.status(HttpStatus.CREATED).json({
      data: list,
      status: HttpStatus.CREATED,
    });
  }

  @UseGuards(MemberGuard)
  @Get('/:projectId/:id')
  async get(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const list = await this.listService.get(id);
    return res.status(HttpStatus.OK).json({
      data: list,
      status: HttpStatus.OK,
    });
  }

  @UseGuards(PermissionGuard)
  @Delete('/:projectId')
  async delete(
    @Param('projectId') projectId: string,
    @Body('id') id: string,
    @Res() res: Response,
  ) {
    await this.listService.delete(id, projectId);
    return res.status(HttpStatus.OK).json();
  }

  @UseGuards(MemberGuard)
  @Get('/:projectId')
  async getAll(@Param('projectId') projectId: string, @Res() res: Response) {
    const list = await this.listService.getAll(projectId);
    return res.status(HttpStatus.OK).json({
      data: list,
      status: HttpStatus.OK,
    });
  }

  @UseGuards(PermissionGuard)
  @Patch('/position/:projectId')
  async changePosition(
    @Param('projectId') projectId: string,
    @Query('listId') listId: string,
    @Body('parentId') parentId: string,
    @Res() res: Response,
  ) {
    const list = await this.listService.changePosition(
      listId,
      projectId,
      parentId,
    );
    return res.status(HttpStatus.OK).json({
      data: list,
      status: HttpStatus.OK,
    });
  }
}
