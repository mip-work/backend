type MyArray = {
  parentId: string;
  id: string;
};

export function orderList<T extends MyArray>(lists: T[]): T[] {
  const firstList = lists.find((list) => !list.parentId);

  const sortedList: T[] = [];
  sortedList.push(firstList);
  lists.splice(lists.indexOf(firstList), 1);
  lists.forEach(() => {
    const list: T = lists.find(
      (l) => l.parentId == sortedList[sortedList.length - 1].id,
    );
    sortedList.push(list);
  });

  return sortedList;
}
