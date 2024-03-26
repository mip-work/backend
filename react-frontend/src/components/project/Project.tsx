import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useIssuesQuery } from "../../api/endpoints/issues.endpoint";
import type { APIERROR } from "../../api/apiTypes";
import Board from "./Board";
import Filter from "./Filter";
import SS from "../util/SpinningCircle";
import { useAppSelector } from "../../store/hooks";
import { useList } from "../../hooks/useList";

const Project = () => {
  const projectId = useParams().projectId;
  const issueQuery = useAppSelector((state) => state.query.issue);
  const [isDragDisabled, setIsDragDisabled] = useState(false);
  const { useGetAllList } = useList();

  const { data } = useGetAllList(projectId);

  const { data: issues, error: issueError } = useIssuesQuery(
    { projectId, ...issueQuery },
    { refetchOnMountOrArgChange: true }
  );

  if (data?.status === 401) return <Navigate to="/login" />;

  if (!data?.data) {
    return (
      <div className="grid h-full grow place-items-center text-xl">
        You are not part of this project ☝
      </div>
    );
  }

  return (
    <div className="mt-6 flex grow flex-col px-8 sm:px-10">
      <h1 className="mb-4 text-xl font-semibold text-c-text">Kanban Board</h1>
      <Filter
        isEmpty={data?.data.data.length === 0}
        {...{ projectId, setIsDragDisabled, issues }}
      />

      {data?.data ? (
        <Board
          data={data?.data.data}
          issues={issues}
          isDragDisabled={isDragDisabled}
        />
      ) : (
        <div className="grid h-[40vh] w-full place-items-center">
          <SS />
        </div>
      )}
    </div>
  );
};

export default Project;
