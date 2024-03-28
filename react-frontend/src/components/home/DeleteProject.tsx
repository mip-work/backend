import { useRef } from "react";
import toast from "react-hot-toast";
import { useProject } from "../../hooks/useProject";

interface Props {
  name: string;
  projectId: number;
  authUserId: number;
  memberId: number;
  role: boolean;
  onClose: () => void;
}

function DeleteProject({
  name,
  projectId,
  authUserId,
  memberId,
  role,
  onClose,
}: Props) {
  const ref = useRef<HTMLInputElement | null>(null);

  const { useDeleteProject } = useProject();

  const deleteProject = useDeleteProject();

  const handleDelete = async () => {
    try {
      if (ref.current?.value.trim() !== name) return;
      await deleteProject.mutateAsync(projectId);
      toast("Project deleted!");
    } catch (error) {
      toast("Error!");
    }
  };

  return (
    <div className="top-full flex items-center justify-end border-b-[1px] p-2">
      {role ? (
        <>
          <span>
            Please type "<span className="text-chakra-blue">{name}</span>" to
            delete
          </span>
          <input
            placeholder="project name"
            className="ml-8 border-[1px] border-gray-300 bg-c-1 px-2 outline-none"
            ref={ref}
          />
        </>
      ) : null}
      <button
        onClick={handleDelete}
        className="btn-alert ml-5 py-[3px] text-sm"
      >
        {"delete"}
      </button>
      <button onClick={onClose} className="btn-icon ml-2 px-3 py-[3px] text-sm">
        cancel
      </button>
    </div>
  );
}

export default DeleteProject;
