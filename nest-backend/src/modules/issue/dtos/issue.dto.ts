export class Issue {
  id: string;
  priority: number;
  type: number;
  progress: number;
  title: string;
  descr: string;
  listId: string | null;
  reporterId: string | null;
  parentId: number;
  sprintId: string | null;
}
