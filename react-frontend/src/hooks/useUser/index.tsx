import axiosDf from "../../api/axios";
import { IDataLoginUser, IDataRegisterUser } from "../../components/auth/Welcome";

interface IMethodsUseUser {
  useRegisterUser: (dataForm: IDataRegisterUser) => Promise<any>;
  useLoginUser: (dataForm: IDataLoginUser) => Promise<any>;
}

const useRegisterUser = async (dataForm: IDataRegisterUser) => {
  const { data } = await axiosDf.post("auth/register", dataForm);
  return data;
};

const useLoginUser = async (dataForm: IDataLoginUser) => {
  const { data } = await axiosDf.post("auth/login", dataForm);
  return data;
};

export const useUser = (): IMethodsUseUser => ({
  useRegisterUser,
  useLoginUser,
});
