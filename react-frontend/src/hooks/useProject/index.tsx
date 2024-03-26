import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mipAPI } from "../../api/axios";
import { FieldValues } from "react-hook-form";
import { IParamsRequestUpdateProject } from "../interfaces";

// Confirmado


const useGetAllProjects = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllProject"],
    queryFn: async () => {
      const { data, status } = await mipAPI.get("/project/projects");
      return { data, status };
    },
  });

  return { data, isLoading };
};

const useGetProjects = (id: string | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getProject"],
    queryFn: async () => {
      const { data, status } = await mipAPI.get(`/project/projects/${id}`);
      return { data, status };
    },
  });

  return { data, isLoading };
};

const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (projectId: number) => {
      const { data } = await mipAPI.delete(`/project/${projectId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProject"] });
    },
  });

  return { mutateAsync };
};

const useCreateProject = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (newProject: FieldValues) => {
      const { data, status } = await mipAPI.post("/project", newProject);
      return { data, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProject"] });
    },
  });

  return { mutateAsync };
};

const useUpdateProject = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ projectId, body }: IParamsRequestUpdateProject) => {
      const { data, status } = await mipAPI.patch(`project/${projectId}`, body);
      return { data, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProject"] });
      queryClient.invalidateQueries({ queryKey: ["getProject"] });
    },
  });

  return { mutateAsync };
};

export const useProject = () => ({
  useDeleteProject,
  useGetAllProjects,
  useGetProjects,
  useCreateProject,
  useUpdateProject,
});
