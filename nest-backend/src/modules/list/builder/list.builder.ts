import { List } from '../dtos/list.dto';
import { ViewListDTO } from '../dtos/responses/view-list-dto';

export class ListBuilder {
  static createListView(list: List): ViewListDTO {
    const { id, name, order } = list;
    return { id, name, order };
  }

  static showListViewProject(lists: List[]): ViewListDTO[] {
    const viewProjects: ViewListDTO[] = [];
    lists.map((list) => {
      {
        const { id, name, order } = list;
        viewProjects.push({ id, name, order });
      }
    });
    return viewProjects;
  }
}
