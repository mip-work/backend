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
import { CreateListDto } from '../dtos/requests/create-list.dto';
import { ListServices } from '../services/list.services';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { UpdateListDTO } from '../dtos/requests/update-list-dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

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
  @Get('/:id')
  async get(@Param('id') id: string, @Res() res: Response) {
    const list = await this.listService.get(id);
    return res.status(HttpStatus.OK).json({
      data: list,
      status: HttpStatus.OK,
    });
  }
  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.listService.delete(id);
    return res.status(HttpStatus.OK).json();
  }
  @UseGuards(AuthGuard)
  @Get('/all/:id')
  async getAll(@Param('id') id: string, @Res() res: Response) {
    const list = await this.listService.getAll(id);
    return res.status(HttpStatus.OK).json({
      data: list,
      status: HttpStatus.OK,
    });
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() request: UpdateListDTO,
    @Res() res: Response,
  ) {
    const list = await this.listService.update(id, request);
    return res.status(HttpStatus.OK).json({
      data: list,
      status: HttpStatus.OK,
    });
  }
}
