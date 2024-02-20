import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateProjectDto } from '../dtos/requests/create-project.dto';
import { UpdateProjectDto } from '../dtos/requests/update-project.dto';

@Injectable()
export class ProjectRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProjectDto) {
    const project = await this.prisma.project.create({
      data: dto,
    });
    return project;
  }

  async get(id: string) {
    const project = await this.prisma.project.findFirst({ where: { id } });
    return project;
  }

  async getAll(userId: string) {
    const project = await this.prisma.project.findMany({ where: { userId } });
    return project;
  }

  async delete(id: string) {
    const project = await this.prisma.project.delete({ where: { id } });
    return project;
  }

  async update(id: string, dto: UpdateProjectDto) {
    const project = await this.prisma.project.update({
      where: { id },
      data: dto,
    });

    return project;
  }
}
