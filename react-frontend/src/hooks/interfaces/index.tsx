import { AxiosRequestConfig } from "axios";

export interface IParamsRequestUpdateList {
  projectId: number;
  listId: number;
  body: { name: string };
}

export interface IParamsRequestDeleteList {
  projectId: number;
  listId: number;
}

export interface IParamsRequestCreateList {
  name: string;
  projectId: string | undefined;
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
  projectId?: string | undefined;
  body?: { listId: number | null | string } | undefined;
}

export interface IParamsRequestUpdateProject {
  projectId: string | undefined;
  body: any;
}
