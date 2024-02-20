import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../repositories/member.repository';
import { CreateMemberDto } from '../dtos/requests/create-member.dto';

@Injectable()
export class MemberServices {
  constructor(private memberRepository: MemberRepository) {}

  async create(dto: CreateMemberDto) {
    const sprint = await this.memberRepository.create(dto);

    return sprint;
  }
}
