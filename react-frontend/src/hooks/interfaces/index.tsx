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

export interface IParamsRequestDeleteList {
  projectId: number;
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
}

export interface IParamsRequestUpdateProject {
  projectId: string | undefined;
  body: any;
}

export interface IParamsRequestUpdateUser {
  email: string | undefined;
  username: any | undefined;
}
