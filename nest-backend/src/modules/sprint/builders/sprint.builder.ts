import { ViewSprintDTO } from '../dtos/responses/view-sprint.dto';
import { Sprint } from '../dtos/sprint.dto';

export class SprintBuilder {
  static createSprintView(sprint: Sprint): ViewSprintDTO {
    const { id, name, initialDate, finalDate } = sprint;
    return { id, name, initialDate, finalDate };
  }
}
