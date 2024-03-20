import { useEffect, useState } from "react";
import { mipAPI } from "../../api/axios";
import toast from "react-hot-toast";

interface IMethodsUseUser {
  useDeleteProject: (idProject: number) => Promise<any>;
  useGetProjects: () => any;
}

const useGetProjects = (): any => {
  const [projects, setProjects] = useState({});

  const getProjects = async () => {
    const { data, status } = await mipAPI.get("/project/projects");

    return { data, status };
  };

  useEffect(() => {
    getProjects()
      .then((project) => setProjects(project))
      .catch((err) => toast("Error!"));
  }, []);

  return { projects };
};

const useDeleteProject = async (idProject: number) => {
  const { data } = await mipAPI.delete(`/project/${idProject}`);
  return data;
};

export const useProject = (): IMethodsUseUser => ({
  useDeleteProject,
  useGetProjects,
});
