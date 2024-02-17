import { Body, Controller, Post } from '@nestjs/common';
import { CreateListDto } from '../dtos/create-list.dto';
import { ListServices } from '../services/list.services';

@Controller('list')
export class ListControllers {
  constructor(private listService: ListServices) {}
  @Post()
  async create(@Body() request: CreateListDto) {
    const list = await this.listService.create(request);
    return list;
  }
}
