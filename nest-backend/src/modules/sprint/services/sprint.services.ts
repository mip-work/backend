import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SprintRespository } from '../repositories/sprint.repository';
import { CreateSprintRecDto } from '../dtos/requests/create-sprint-req.dto';
import { isDateLessThanCurrent } from 'src/utils/check.date.iso.format';
import { UpdateSprintDto } from '../dtos/requests/update-sprint-dto';

@Injectable()
export class SprintServices {
  constructor(private sprintRepository: SprintRespository) {}

  async create(dto: CreateSprintRecDto) {
    if (isDateLessThanCurrent(dto.finalDate)) {
      throw new InternalServerErrorException(
        'The sprint final date cannot be earlier than today!',
      );
    }

    const sprint = await this.sprintRepository.create({
      ...dto,
      initialDate: new Date().toISOString(),
    });

    if (!sprint) {
      throw new InternalServerErrorException(
        'There was an error creating this new sprint!',
      );
    }

    return sprint;
  }

  async update(id: string, dto: UpdateSprintDto) {
    
    if (isDateLessThanCurrent(dto.finalDate)) {
      throw new InternalServerErrorException(
        'The sprint final date cannot be earlier than today!',
      );
    }

    if (isDateLessThanCurrent(dto.initialDate)) {
      throw new InternalServerErrorException(
        'The sprint initial date cannot be earlier than today!',
      );
    }

    const sprint = await this.sprintRepository.update(id, dto);

    if (!sprint) {
      throw new BadRequestException('Could not update this sprint');
    }
  }

  async delete(id: string) {

    const sprint = await this.sprintRepository.delete(id);

    if (!sprint) {
      throw new NotFoundException('Sprint not Found');
    }

    await this.sprintRepository.delete(id);
    return;
  }

  async get(id: string) {
    const sprint = await this.sprintRepository.get(id);

    if (!sprint) {
      throw new NotFoundException('Sprint not Found');
    }
    return;
  }
}
