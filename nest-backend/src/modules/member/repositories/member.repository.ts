import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateMemberDto } from '../dtos/requests/create-member.dto';

@Injectable()
export class MemberRepository {
  constructor(private prisma: PrismaService) {}

  async addMember(dto: CreateMemberDto) {
    const member = await this.prisma.member.create({
      data: dto,
    });
    return member;
  }

  async get(id: string) {
    const member = await this.prisma.member.findFirst({
      where: {
        id,
      },
    });
    return member;
  }

  async findInProject(id: string, projectId: string) {
    const member = await this.prisma.member.findFirst({
      where: { userId: id, projectId },
    });
    return member;
  }

  async listMembers(projectId: string) {
    const members = await this.prisma.member.findMany({
      where: {
        projectId,
      },
    });
    return members;
  }

  async delete(id: string) {
    const member = await this.prisma.member.delete({ where: { id } });
    return member;
  }
}
