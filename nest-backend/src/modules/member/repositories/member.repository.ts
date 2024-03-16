import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateMemberDto } from '../dtos/requests/create-member.dto';
import { UpdateMemberDto } from '../dtos/requests/updateMember.dto';

@Injectable()
export class MemberRepository {
  constructor(private prisma: PrismaService) {}

  async addMember(dto: CreateMemberDto) {
    return await this.prisma.member.create({
      data: dto,
    });
  }

  async getByUserId(userId: string) {
    return await this.prisma.member.findFirst({
      where: { userId },
    });
  }

  async findInProject(userId: string, projectId: string) {
    return await this.prisma.member.findFirst({
      where: { userId, projectId },
    });
  }

  async listMembers(projectId: string) {
    return await this.prisma.member.findMany({
      where: { projectId },
    });
  }

  async delete(id: string) {
    return await this.prisma.member.delete({ where: { id } });
  }

  async changeRole(dto: UpdateMemberDto) {
    return await this.prisma.member.update({
      where: { id: dto.id, projectId: dto.projectId },
      data: { role: dto.role },
    });
  }
}
