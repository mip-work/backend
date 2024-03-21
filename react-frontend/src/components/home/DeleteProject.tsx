import { useRef } from "react";
import toast from "react-hot-toast";
import { useLeaveProjectMutation } from "../../api/endpoints/project.endpoint";
import { useProject } from "../../hooks/useProject";

interface Props {
  name: string;
  projectId: number;
  authUserId: number;
  memberId: number;
  role: boolean;
  onClose: () => void;
}

function DeleteProject(props: Props) {
  const { name, projectId, authUserId, memberId, role, onClose } = props;
  const [leaveProject, { isLoading: ll }] = useLeaveProjectMutation();
  const ref = useRef<HTMLInputElement | null>(null);

  const { useDeleteProject } = useProject();

  const deleteProject = useDeleteProject()
  
  const handleDelete = async () => {
    if (ref.current?.value.trim() !== name) return;
    await deleteProject.mutateAsync(projectId)
    toast("Project deleted!")
  };

  const handleLeave = async () => {
    await leaveProject({ memberId, projectId, userId: authUserId });
    toast("Leaved the project!");
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
        onClick={role ? handleDelete : handleLeave}
        className="btn-alert ml-5 py-[3px] text-sm"
      >
        {role ? "delete" : ll ? "leaving ..." : "Leave"}
      </button>
      <button onClick={onClose} className="btn-icon ml-2 px-3 py-[3px] text-sm">
        cancel
      </button>
    </div>
  );
}

export default DeleteProject;
