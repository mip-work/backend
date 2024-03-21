import { api } from "../api";
import type {
  CreateProject,
  EditProject,
  LeaveProject,
  Project,
} from "../apiTypes";

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    project: builder.query<Project, number>({
      query: (projectId) => ({
        url: "project/projects/" + projectId,
      }),
      providesTags: ["Project"],
    }),
    leaveProject: builder.mutation<void, LeaveProject>({
      query: ({ projectId, ...body }) => ({
        url: `project/${projectId}/leave`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Project"],
    }),
    updateProject: builder.mutation<void, EditProject>({
      query: (body) => ({ url: `project/${body.id}`, method: "PUT", body }),
      invalidatesTags: ["Project"],
      async onQueryStarted({ id, ...newData }, { dispatch }) {
        dispatch(
          extendedApi.util.updateQueryData("project", id, (oldData) => ({
            ...oldData,
            ...newData,
          }))
        );
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useProjectQuery,
  useUpdateProjectMutation,
  useLeaveProjectMutation,
} = extendedApi;

// selectors
export const selectCurrentProject = (projectId: number) =>
  extendedApi.useProjectQuery(projectId, {
    selectFromResult: ({ data }) => ({ project: data }),
  });
