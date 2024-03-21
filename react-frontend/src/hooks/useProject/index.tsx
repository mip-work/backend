import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mipAPI } from "../../api/axios";

const useGetProjects = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getProject"],
    queryFn: async () => {
      const { data, status } = await mipAPI.get("/project/projects");

      return { data, status };
    },

  });

  return { data, isLoading };
};

const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (idProject: number) => {
      const { data } = await mipAPI.delete(`/project/${idProject}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProject"] });
    },
  });

  return { mutateAsync };
};

const useCreateProject = () => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: async (newProject: any) => {
      const { data } = await mipAPI.post("/project", newProject)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProject"] })
    }
  })

  return { mutateAsync }
}

export const useProject = () => ({
  useDeleteProject,
  useGetProjects,
  useCreateProject
});
