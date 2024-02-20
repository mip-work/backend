import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CreateListDto } from '../dtos/requests/create-list.dto';
import { ListServices } from '../services/list.services';
import { Response } from 'express';
import { RestExceptionHandler } from 'src/utils/rest-exception-handler';
import { ApiTags } from '@nestjs/swagger';
import { UpdateListDTO } from '../dtos/requests/update-list-dto';

@ApiTags('List')
@Controller('list')
export class ListControllers {
  constructor(private listService: ListServices) {}
  @Post()
  async create(@Body() request: CreateListDto, @Res() res: Response) {
    try {
      const list = await this.listService.create(request);
      return res.status(HttpStatus.CREATED).json({
        data: list,
        status: HttpStatus.CREATED,
      });
    } catch (err) {
      return RestExceptionHandler.handleException(err, res);
    }
  }
  @Get('/:id')
  async get(@Param('id') id: string, @Res() res: Response) {
    try {
      const list = await this.listService.get(id);
      return res.status(HttpStatus.OK).json({
        data: list,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return RestExceptionHandler.handleException(err, res);
    }
  }
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const list = await this.listService.delete(id);
      return res.status(HttpStatus.OK).json();
    } catch (err) {
      return RestExceptionHandler.handleException(err, res);
    }
  }
  @Get('/all/:id')
  async getAll(@Param('id') id: string, @Res() res: Response) {
    try {
      const list = await this.listService.getAll(id);
      return res.status(HttpStatus.OK).json({
        data: list,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return RestExceptionHandler.handleException(err, res);
    }
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() request: UpdateListDTO, @Res() res: Response) {
    try {
      const list = await this.listService.update(id, request);
      return res.status(HttpStatus.OK).json({
        data: list,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return RestExceptionHandler.handleException(err, res);
    }
  }  
}
