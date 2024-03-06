import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "jiraApiReducer",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3008/api/",
    credentials: "include",
  }),
  tagTypes: ["Lists", "Issues", "Project", "Members", "AuthUser", "Comments"],
  endpoints: (builder) => ({}),
});

export const {} = api;
