import { Injectable } from '@nestjs/common';
import { SprintRespository } from '../repositories/sprint.repository';
import { CreateSprintDto } from '../dtos/requests/create-sprint.dto';

@Injectable()
export class SprintServices {
  constructor(private sprintRepository: SprintRespository) {}

  async create(dto: CreateSprintDto) {
    const sprint = await this.sprintRepository.create(dto);

    return sprint;
  }
}
