import { Injectable } from '@nestjs/common';
import { AssigneeRepository } from '../repositories/assignee.repository';
import { CreateAssigneeDto } from '../dtos/requests/create-assignee.dto';

@Injectable()
export class AssigneeServices {
  constructor(private assigneeRepository: AssigneeRepository) {}

  async create(dto: CreateAssigneeDto) {
    const sprint = await this.assigneeRepository.create(dto);

    return sprint;
  }
}
