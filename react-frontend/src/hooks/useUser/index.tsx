import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { mipAPI } from "../../api/axios";
import { FieldValues } from "react-hook-form";

const useGetUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      const { data, status } = await mipAPI.get("/user");
      return { data, status };
    },
  });

  return { data, isLoading };
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (body: FieldValues) => {
      const { data, status } = await mipAPI.patch("/user/update", body);
      return { data, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
  });

  return { mutateAsync };
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const { data, status } = await mipAPI.delete("/user/delete");
      return { data, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
  });

  return { mutateAsync };
};

export const useUser = () => ({ useGetUser, useUpdateUser, useDeleteUser });
