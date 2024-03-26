import { FieldValues } from "react-hook-form";
import { mipAPI } from "../../api/axios";
import {
  IDataLoginUser,
  IDataRegisterUser,
} from "../../components/auth/Welcome";
// Confirmado

const useRegisterUser = async (dataForm: IDataRegisterUser) => {
  const { data, status } = await mipAPI.post("auth/register", dataForm);
  return { data, status };
};

const useLoginUser = async (dataForm: IDataLoginUser) => {
  const { data, status } = await mipAPI.post("auth/login", dataForm);
  return { data, status };
};

const changePassword = async (body: FieldValues) => {
  const { data, status } = await mipAPI.patch("/auth/changepass", body)
  return { data, status }
}

const logOut = async () => {
  const { data, status } = await mipAPI.post("/auth/logout")
  return { data, status }
}

export const useAuth = () => ({
  useRegisterUser,
  useLoginUser,
  changePassword,
  logOut
});
