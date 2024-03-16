import { Body, Controller, Post } from '@nestjs/common';
import { CreateSprintDto } from '../dtos/requests/create-sprint.dto';
import { SprintServices } from '../services/sprint.services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sprint')
@Controller('sprint')
export class SprintControllers {
  constructor(private sprintService: SprintServices) {}
  @Post()
  async create(@Body() request: CreateSprintDto) {
    const sprint = await this.sprintService.create(request);
    return sprint;
  }
}
