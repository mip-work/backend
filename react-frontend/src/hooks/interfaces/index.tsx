import { AxiosRequestConfig } from "axios";

export interface IParamsRequestGetList {
  projectId: string | number | undefined;
  id: string;
}

export interface IParamsRequestUpdateList {
  projectId: number;
  listId: number;
  body: { name: string };
}

export interface IParamsRequestDeleteList extends AxiosRequestConfig<any> {
  projectId: number;
  body: {
    id: string;
  }
}

export interface IParamsRequestCreateList {
  name: string;
  parentId: string;
}

export interface IParamsRequestCreateIssue {
  projectId: string | undefined;
  body: {
    priority: number;
    type: number;
    title: string;
    descr: string;
    listId: string | number | null;
    parentId: string | null;
    sprintId?: string;
  };
}

export interface IParamsRequestGetIssue extends AxiosRequestConfig<any> {
  projectId: string | undefined;
  listId: string | undefined
}

export interface IParamsRequestUpdateProject {
  projectId: string | undefined;
  body: any;
}

export interface IParamsRequestUpdateUser {
  email: string | undefined;
  username: any | undefined;
}

export interface IParamsRequestDeleteMember extends AxiosRequestConfig<any> {
  projectId: string | undefined;
  id: string;
}

export interface IParamsRequestUdpateMember {
  id?: string;
  userId: string;
  role: string | number | undefined;
  projectId: string;
}

