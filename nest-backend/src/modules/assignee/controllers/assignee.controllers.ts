import { Body, Controller, Post } from '@nestjs/common';
import { CreateAssigneeDto } from '../dtos/create-assignee.dto';
import { AssigneeServices } from '../services/assignee.services';

@Controller('assignee')
export class AssigneeControllers {
  constructor(private assigneeService: AssigneeServices) {}
  @Post()
  async create(@Body() request: CreateAssigneeDto) {
    const assignee = await this.assigneeService.create(request);
    return assignee;
  }
}
