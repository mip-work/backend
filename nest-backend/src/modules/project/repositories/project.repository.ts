import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateProjectDto } from '../dtos/requests/create-project.dto';

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
  
}
