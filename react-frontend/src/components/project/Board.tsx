import { DragDropContext, DraggableLocation } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import DroppableWrapper from "../dnd/DroppableWrapper";
import List from "../list/List";
import type { Issues, List as ApiList } from "../../api/apiTypes";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { useList } from "../../hooks/useList";

interface Props {
  data: any;
  issues?: any;
  isDragDisabled: boolean;
}

const Board = ({ data, issues, isDragDisabled }: Props) => {
  const projectId = useParams().projectId;

  const { useCreateList } = useList();

  const createList = useCreateList(projectId);

  const onDragEnd = ({ type, source: s, destination: d }: DropResult) => {
    if (
      !data! ||
      !issues ||
      !d ||
      (s.droppableId === d.droppableId && s.index === d.index)
    )
      return;
  };

  const handleCreateList = async () => {
    try {
      await createList.mutateAsync({
        name: "unnamed list",
        // parentId,
      });
      toast("Created a list!");
    } catch (error) {
      toast("Error");
    }
  };

  return (
    <div className="mb-5 flex min-w-max grow items-start">
      <DragDropContext onDragEnd={onDragEnd}>
        <DroppableWrapper
          type="list"
          className="flex items-start"
          droppableId="board-central"
          direction="horizontal"
        >
          {data === null
            ? []
            : data.map((props: any, i: number) => (
                <List
                  key={props.id}
                  idx={i}
                  issues={issues?.[props.id]}
                  isDragDisabled={isDragDisabled}
                  {...props}
                />
              ))}
        </DroppableWrapper>
        <button
          onClick={handleCreateList}
          className="flex items-center gap-5 rounded-md bg-c-2 px-14 py-3 text-c-5 hover:bg-c-6 active:bg-blue-100"
        >
          <>
            Create a list <Icon icon="ant-design:plus-outlined" />
          </>
        </button>
      </DragDropContext>
    </div>
  );
};

export default Board;

// helpers
const parseId = (dndObj: DraggableLocation) =>
  +dndObj.droppableId.split("-")[1];
