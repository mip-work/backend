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
} from '@nestjs/common';
import { CreateListDto } from '../dtos/requests/create-list.dto';
import { ListServices } from '../services/list.services';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { UpdateListDTO } from '../dtos/requests/update-list-dto';

@ApiTags('List')
@Controller('list')
export class ListControllers {
  constructor(private listService: ListServices) {}
  @Post()
  async create(@Body() @Req() request: CreateListDto, @Res() res: Response) {
    const list = await this.listService.create(request);
    return res.status(HttpStatus.CREATED).json({
      data: list,
      status: HttpStatus.CREATED,
    });
  }
  @Get('/:id')
  async get(@Param('id') id: string, @Res() res: Response) {
    const list = await this.listService.get(id);
    return res.status(HttpStatus.OK).json({
      data: list,
      status: HttpStatus.OK,
    });
  }
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
<<<<<<< HEAD
    const list = await this.listService.delete(id);
=======
    await this.listService.delete(id);
>>>>>>> fdd56f52793c83b0a3b58949a9ee77d5df4f2408
    return res.status(HttpStatus.OK).json();
  }
  @Get('/all/:id')
  async getAll(@Param('id') id: string, @Res() res: Response) {
    const list = await this.listService.getAll(id);
    return res.status(HttpStatus.OK).json({
      data: list,
      status: HttpStatus.OK,
    });
  }
  @Patch(':id')
<<<<<<< HEAD
  async update(@Param('id') id: string, @Body() request: UpdateListDTO, @Res() res: Response) {
=======
  async update(
    @Param('id') id: string,
    @Body() request: UpdateListDTO,
    @Res() res: Response,
  ) {
>>>>>>> fdd56f52793c83b0a3b58949a9ee77d5df4f2408
    const list = await this.listService.update(id, request);
    return res.status(HttpStatus.OK).json({
      data: list,
      status: HttpStatus.OK,
    });
<<<<<<< HEAD
  }  
=======
  }
>>>>>>> fdd56f52793c83b0a3b58949a9ee77d5df4f2408
}
