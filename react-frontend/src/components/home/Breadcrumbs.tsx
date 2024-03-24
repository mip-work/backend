import { Link, useLocation, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useProject } from "../../hooks/useProject";

const Breadcrumbs = () => {
  const location = useLocation();
  const fragments = location.pathname.slice(1).split("/");
  const { useGetProjects } = useProject()
  const projectId = useParams().projectId
  
  const { data: project } = useGetProjects(projectId)

  return (
    <div className="mb-4 mt-8 min-w-max px-8 text-c-text sm:px-10">
      <Link to="/project" className="hover:underline">
        project
      </Link>
      {fragments[1] && (
        <>
          <Icon className="mx-2 inline text-xl" icon="ei:chevron-right" />
          <Link to={"/project/" + fragments[1]} className="hover:underline">
            {project?.data.data.name ?? "undefined"}
          </Link>
        </>
      )}
      {fragments[2] && (
        <>
          <Icon className="mx-2 inline text-xl" icon="ei:chevron-right" />
          <Link
            to={`/project/${fragments[1]}/board`}
            className="hover:underline"
          >
            Kanban board
          </Link>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
