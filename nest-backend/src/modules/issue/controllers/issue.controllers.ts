import { Body, Controller, Post } from '@nestjs/common';
import { CreateIssueDto } from '../dtos/create-issue.dto';
import { IssueServices } from '../services/issue.services';

@Controller('issue')
export class IssueControllers {
  constructor(private issueService: IssueServices) {}
  @Post()
  async create(@Body() request: CreateIssueDto) {
    const sprint = await this.issueService.create(request);
    return sprint;
  }
}
