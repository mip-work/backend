import { List } from '../dtos/list.dto';

export function orderList(lists: List[]): List[] {
  const firstList = lists.find((list) => !list.parentId);

  const sortedList: List[] = [];
  sortedList.push(firstList);
  lists.splice(lists.indexOf(firstList), 1);
  lists.forEach(() => {
    const list: List = lists.find(
      (l) => l.parentId == sortedList[sortedList.length - 1].id,
    );
    sortedList.push(list);
  });

  return sortedList;
}
