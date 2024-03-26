import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mipAPI } from "../../api/axios";
import {
  IParamsRequestCreateIssue,
  IParamsRequestGetIssue,
} from "../interfaces";

// Falta o patch

const useGetAllIssue = (projectId: string | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllIssue"],
    queryFn: async () => {
      const { data, status } = await mipAPI.get(`/issue/${projectId}`);
      return { data, status };
    },
  });

  return { data, isLoading };
};

const useGetIssue = ({ projectId, listId }: IParamsRequestGetIssue) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getIssue"],
    queryFn: async () => {
      const { data, status } = await mipAPI.get(
        `/issue/${projectId}/${listId}`
      );
      return { data, status };
    },
  });

  return { data, isLoading };
};

const useCreateIssue = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ projectId, body }: IParamsRequestCreateIssue) => {
      const { data, status } = await mipAPI.post(`/issue/${projectId}`, body);
      return { data, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllIssue"] });
    },
  });

  return { mutateAsync };
};

const useDeleteIssue = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (projectId: string) => {
      const { data, status } = await mipAPI.delete(`/issue/${projectId}`);
      return { data, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllIssue"] });
    },
  });

  return { mutateAsync };
};

const useUpdateIssue = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (projectId: string) => {
      const { data, status } = await mipAPI.patch(`/issue/${projectId}`);
      return { data, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllIssue"] });
    },
  });

  return { mutateAsync };
};

export const useIssue = () => ({
  useGetAllIssue,
  useCreateIssue,
  useGetIssue,
  useDeleteIssue,
  useUpdateIssue
});
