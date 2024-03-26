import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mipAPI } from "../../api/axios";
import {
  IParamsRequestCreateList,
  IParamsRequestDeleteList,
  IParamsRequestGetList,
  IParamsRequestUpdateList,
} from "../interfaces";

// Confirmado

const useGetAllList = (projectId: string | number | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllList"],
    queryFn: async () => {
      const { data, status } = await mipAPI.get(`list/${projectId}`);
      return { data, status };
    },
  });

  return { data, isLoading };
};

const useGetList = ({ projectId, id }: IParamsRequestGetList) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getList"],
    queryFn: async () => {
      const { data, status } = await mipAPI.get(`list/${projectId}/${id}`);
      return { data, status };
    },
  });

  return { data, isLoading };
};

const useCreateList = (projectId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (body: IParamsRequestCreateList) => {
      const { data, status } = await mipAPI.post(`/list/${projectId}`, body);
      return { data, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllList"] });
    },
  });

  return { mutateAsync };
};

const useUpdateList = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async ({
      projectId,
      listId,
      body,
    }: IParamsRequestUpdateList) => {
      const { data, status } = await mipAPI.patch(
        `list/${projectId}/${listId}`,
        body
      );
      return { data, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllList"] });
    },
  });

  return { mutateAsync };
};

const useDeleteList = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ projectId }: IParamsRequestDeleteList) => {
      const { data, status } = await mipAPI.delete(
        `/list/${projectId}`
      );
      return { data, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllList"] });
    },
  });

  return { mutateAsync };
};

export const useList = () => ({
  useGetAllList,
  useGetList,
  useCreateList,
  useUpdateList,
  useDeleteList,
});
