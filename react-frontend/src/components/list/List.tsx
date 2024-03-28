import Issue from "../issue/Issue";
import DroppableWrapper from "../dnd/DroppableWrapper";
import DraggableWrapper from "../dnd/DraggableWrapper";
import type { Issue as ApiIssue, List as LIST } from "../../api/apiTypes";
import { Icon } from "@iconify/react";
import { lazy, Suspense as S, useState } from "react";
import toast from "react-hot-toast";
import { useList } from "../../hooks/useList";
const ConfirmModel = lazy(() => import("../util/ConfirmModel"));

interface Props extends LIST {
  idx: number;
  issues?: ApiIssue[];
  isDragDisabled: boolean;
}

const List = ({ idx, name, id, projectId, parentId, issues, isDragDisabled }: Props) => {
  const [nameInput, setNameInput] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const body = { name: nameInput, parentId };

  const { useUpdateList, useDeleteList } = useList();

  const updateList = useUpdateList();

  const deleteList = useDeleteList();

  const handleUpdateList = async () => {
    try {
      if (nameInput && nameInput !== name) {
        await updateList.mutateAsync({ projectId, listId: id, body });
        toast("Updated list name!");
      }
      setIsEditing((p) => !p);
    } catch (error) {
      toast("Error");
    }
  };

  return (
    <>
      <DraggableWrapper
        className="w-[clamp(16rem,18rem,20rem)]"
        index={idx}
        draggableId={"list-" + id}
        isDragDisabled={isDragDisabled}
      >
        <div className="relative mr-3 bg-c-2 p-3 text-c-5 shadow-list">
          <div className="mb-4 flex items-center justify-between text-[15px]">
            <div className="item-center flex">
              <div className="relative">
                {isEditing ? (
                  <input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    autoFocus
                    className="w-36 border-[1.5px] bg-c-2 pl-2 text-[15px] outline-none focus:border-chakra-blue"
                  />
                ) : (
                  <span className="block border-[1.5px] border-transparent pl-2 font-medium">
                    {name}
                  </span>
                )}
              </div>
              <span className="mx-2 text-gray-500">|</span>
              <span className="text-c-4 pt-[1px] font-bold">
                {issues ? issues.length : 0}
              </span>
            </div>
            <div className="flex gap-2">
              {isEditing && (
                <button
                  onClick={() => setIsOpen(true)}
                  title="Delete"
                  className="btn-icon ml-5 hover:bg-c-3"
                >
                  <Icon icon="bx:trash" className="text-red-500" />
                </button>
              )}
              <button
                onClick={handleUpdateList}
                title={isEditing ? "Save" : "Edit"}
                className="btn-icon hover:bg-c-3"
              >
                <Icon icon={isEditing ? "charm:tick" : "akar-icons:edit"} />
              </button>
            </div>
          </div>
          <DroppableWrapper
            className="min-h-[3rem]"
            type="issue"
            droppableId={"list-" + id}
          >
            {issues?.map((data, i) => (
              <Issue
                isDragDisabled={isDragDisabled}
                key={data.id}
                listIdx={idx}
                idx={i}
                {...data}
                listId={id}
              />
            ))}
          </DroppableWrapper>
        </div>
      </DraggableWrapper>
      {isOpen && (
        <S>
          <ConfirmModel
            listId={id}
            projectId={projectId}
            parentId={parentId}
            deleteList={deleteList}
            onClose={() => setIsOpen(false)}
            toastMsg="Deleted a list!"
          />
        </S>
      )}
    </>
  );
};

export default List;
