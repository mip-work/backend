import { List } from '../dtos/list.dto';
import { ViewListDTO } from '../dtos/responses/view-list-dto';

export class ListBuilder {
  static createListView(list: List): ViewListDTO {
    const { id, name, position } = list;
    return { id, name, position };
  }

  static showListViewProject(lists: List[]): ViewListDTO[] {
    const viewProjects: ViewListDTO[] = [];
    lists.map((list) => {
      {
        const { id, name, position } = list;
        viewProjects.push({ id, name, position });
      }
    });
    return viewProjects;
  }
}
