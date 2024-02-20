import { Body, Controller, Post } from '@nestjs/common';
import { CreateAssigneeDto } from '../dtos/requests/create-assignee.dto';
import { AssigneeServices } from '../services/assignee.services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Assignee')
@Controller('assignee')
export class AssigneeControllers {
  constructor(private assigneeService: AssigneeServices) {}
  @Post()
  async create(@Body() request: CreateAssigneeDto) {
    const assignee = await this.assigneeService.create(request);
    return assignee;
  }
}
