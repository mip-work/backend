import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mipAPI } from "../../api/axios";
import {
  IParamsRequestCreateList,
  IParamsRequestDeleteList,
  IParamsRequestUpdateList,
} from "../interfaces";

const useGetList = (projectId: string | number | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getList"],
    queryFn: async () => {
      const { data, status } = await mipAPI.get(`list/${projectId}`);
      return { data, status };
    },
  });

  return { data, isLoading };
};

const useCreateList = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (newList: IParamsRequestCreateList) => {
      const { data, status } = await mipAPI.post("/list", newList);
      return { data, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getList"] });
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
      queryClient.invalidateQueries({ queryKey: ["getList"] });
    },
  });

  return { mutateAsync };
};

const useDeleteList = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ projectId, listId }: IParamsRequestDeleteList) => {
      const { data, status } = await mipAPI.delete(
        `/list/${projectId}/${listId}`
      );
      return { data, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getList"] });
    },
  });

  return { mutateAsync };
};

export const useList = () => ({
  useGetList,
  useCreateList,
  useUpdateList,
  useDeleteList,
});
