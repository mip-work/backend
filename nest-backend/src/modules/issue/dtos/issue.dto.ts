export class Issue {
  id: string;
  priority: number;
  type: number;
  progress: number;
  title: string;
  descr: string;
  listId: string | null;
  parentId: string;
  sprintId: string | null;
}
