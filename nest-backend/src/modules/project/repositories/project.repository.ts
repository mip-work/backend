import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateProjectDto } from '../dtos/create-project.dto';

@Injectable()
export class ProjectRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProjectDto) {
    const project = await this.prisma.project.create({
      data: dto,
    });
    return project;
  }
}
