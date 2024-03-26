import { mipAPI } from "../../api/axios";
import {
  IDataLoginUser,
  IDataRegisterUser,
} from "../../components/auth/Welcome";

// Confirmado

const useRegisterUser = async (dataForm: IDataRegisterUser) => {
  const { data } = await mipAPI.post("auth/register", dataForm);
  return data;
};

const useLoginUser = async (dataForm: IDataLoginUser) => {
  const { data } = await mipAPI.post("auth/login", dataForm);
  return data;
};

export const useAuth = () => ({
  useRegisterUser,
  useLoginUser,
});
