import { Injectable } from '@nestjs/common';
import { ListRepository } from '../repositories/list.repository';
import { CreateListDto } from '../dtos/create-list.dto';

@Injectable()
export class ListServices {
  constructor(private listRepository: ListRepository) {}

  async create(dto: CreateListDto) {
    const sprint = await this.listRepository.create(dto);

    return sprint;
  }
}
