import { useQuery } from "@tanstack/react-query";
import { mipAPI } from "../../api/axios";

const useGetUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      const { data, status } = await mipAPI.get("/user");
      return { data, status };
    },
  });

  return { data, isLoading }
};

export const useUser = () => ({ useGetUser });
