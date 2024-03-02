import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateSprintDto } from '../dtos/requests/create-sprint.dto';
import { UpdateSprintDto } from '../dtos/requests/update-sprint-dto';

@Injectable()
export class SprintRespository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSprintDto) {
    const sprint = await this.prisma.sprint.create({
      data: dto,
    });
    return sprint;
  }

  async update(id: string, dto: UpdateSprintDto) {
    const sprint = await this.prisma.sprint.update({
      where: { id },
      data: dto,
    });

    return sprint;
  }

  async delete(id: string) {
    const sprint = await this.prisma.sprint.delete({
      where: { id }
    });
    
    return sprint;
  }

  async get(id: string) {
    const sprint = await this.prisma.sprint.findFirst({
      where: { id },
    })

    return sprint;
  }
}
