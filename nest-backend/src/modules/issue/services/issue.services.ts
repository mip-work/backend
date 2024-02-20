import { Injectable } from '@nestjs/common';
import { IssueRepository } from '../repositories/issue.repository';
import { CreateIssueDto } from '../dtos/requests/create-issue.dto';

@Injectable()
export class IssueServices {
  constructor(private issueRepository: IssueRepository) {}

  async create(dto: CreateIssueDto) {
    const sprint = await this.issueRepository.create(dto);

    return sprint;
  }
}
