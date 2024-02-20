import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateListDto } from '../dtos/requests/create-list.dto';
import { ListServices } from '../services/list.services';
import { Response } from 'express';
import { RestExceptionHandler } from 'src/utils/rest-exception-handler';

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
}
