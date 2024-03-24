import { mipAPI } from "../../api/axios";

const useGetUser = async () => {
  const { data, status } = await mipAPI.get("/user");
  return { data, status };
};

export const useUser = () => ({ useGetUser });
