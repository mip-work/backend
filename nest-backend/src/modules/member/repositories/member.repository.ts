import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateMemberDto } from '../dtos/requests/create-member.dto';
import { UpdateMemberDto } from '../dtos/requests/updateMember.dto';

@Injectable()
export class MemberRepository {
  constructor(private prisma: PrismaService) {}

  async addMember(dto: CreateMemberDto) {
    const member = await this.prisma.member.create({
      data: dto,
    });
    return member;
  }

  async getByUserId(userId: string) {
    const member = await this.prisma.member.findFirst({
      where: {
        userId,
      },
    });
    return member;
  }

  async findInProject(userId: string, projectId: string) {
    const member = await this.prisma.member.findFirst({
      where: { userId, projectId },
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

  async changeRole(dto: UpdateMemberDto) {
    const member = await this.prisma.member.update({
      where: { id: dto.id, projectId: dto.projectId },
      data: { role: dto.role },
    });

    return member;
  }
}
