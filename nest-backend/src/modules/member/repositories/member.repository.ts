import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateMemberDto } from '../dtos/create-member.dto';

@Injectable()
export class MemberRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMemberDto) {
    const member = await this.prisma.member.create({
      data: dto,
    });
    return member;
  }
}
