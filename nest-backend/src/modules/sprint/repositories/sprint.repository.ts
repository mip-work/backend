import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateSprintDto } from '../dtos/create-sprint.dto';

@Injectable()
export class SprintRespository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSprintDto) {
    const sprint = await this.prisma.sprint.create({
      data: dto,
    });
    return sprint;
  }
}
