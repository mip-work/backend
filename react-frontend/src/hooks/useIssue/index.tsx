import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mipAPI } from "../../api/axios";
import {
  IParamsRequestCreateIssue,
  IParamsRequestGetIssue,
} from "../interfaces";

// Falta o getIssue, delete e patch

const useGetAllIssue = ({ projectId }: IParamsRequestGetIssue) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllIssue"],
    queryFn: async () => {
      const { data, status } = await mipAPI.get(`/issue/${projectId}`);
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
      queryClient.invalidateQueries({ queryKey: ["getIssue"] });
    },
  });

  return { mutateAsync };
};

export const useIssue = () => ({ useGetAllIssue, useCreateIssue });
