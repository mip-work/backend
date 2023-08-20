import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "jiraApiReducer",
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://jira-clone.onrender.com/api/',
    baseUrl: "http://localhost:3009/api/",
    credentials: "include",
  }),
  tagTypes: ["Lists", "Issues", "Project", "Members", "AuthUser", "Comments"],
  endpoints: (builder) => ({}),
});

export const {} = api;
