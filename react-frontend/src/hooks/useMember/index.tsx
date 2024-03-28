import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mipAPI } from "../../api/axios";
import { IParamsRequestDeleteMember, IParamsRequestUdpateMember } from "../interfaces";

// Confirmado

const useGetAllMembers = (projectId: string | number | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllMembers"],
    queryFn: async () => {
      const { data, status } = await mipAPI.get(`/member/list/${projectId}`);
      return { data, status };
    },
  });

  return { data, isLoading };
};

const useGetMember = (projectId: string | number | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getMember"],
    queryFn: async () => {
      const { data, status } = await mipAPI.get(`/member/${projectId}`);
      return { data, status };
    },
  });

  return { data, isLoading };
};

const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (body: IParamsRequestDeleteMember) => {
      const { data, status } = await mipAPI.delete("/member", body);
      return { data, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMember"] });
    },
  });

  return { mutateAsync };
};

const useCreateMember = (projectId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (body) => {
      const { data, status } = await mipAPI.post(`/member/${projectId}`, body);
      return { data, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMember"] })
    }
  });

  return { mutateAsync }
};

const useUpdateMember = () => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: async (body: IParamsRequestUdpateMember) => {
      const { data, status } = await mipAPI.patch("/member", body)
      return { data, status }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMember"] })
    }
  })

  return { mutateAsync }
}

export const useMember = () => ({
  useGetAllMembers,
  useGetMember,
  useDeleteMember,
  useCreateMember,
  useUpdateMember
});
