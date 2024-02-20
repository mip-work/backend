import { Body, Controller, Post } from '@nestjs/common';
import { CreateMemberDto } from '../dtos/create-member.dto';
import { MemberServices } from '../services/member.services';

@Controller('member')
export class MemberControllers {
  constructor(private memberService: MemberServices) {}
  @Post()
  async create(@Body() request: CreateMemberDto) {
    const member = await this.memberService.create(request);
    return member;
  }
}
