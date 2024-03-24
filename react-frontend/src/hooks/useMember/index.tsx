import { useQuery } from "@tanstack/react-query";
import { mipAPI } from "../../api/axios";

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

export const useMember = () => ({ useGetAllMembers, useGetMember });
