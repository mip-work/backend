import { api } from "../api";
import type { dndOrderData, IssueQuery, Issues } from "../apiTypes";

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    issues: builder.query<any, any>({
      query: ({ projectId, userId: uid, issueSearched }) => {
        let queryParams = [];

        if (uid) {
          queryParams.push(`?userId=${uid}`);
        }

        if (issueSearched) {
          queryParams.push(`?summary=${issueSearched}`);
        }

        return {
          url: `issue/${projectId}`,
        };
      },
      providesTags: ["Issues"],
    }),
    createIssue: builder.mutation<void, any>({
      query: (body) => ({ url: "issue/create", method: "POST", body }),
      invalidatesTags: ["Issues"],
    }),
    updateIssue: builder.mutation<void, any>({
      query: ({ id, body }) => ({
        url: `issue/${id}/update`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Issues"],
    }),
    deleteIssue: builder.mutation<void, any>({
      query: ({ issueId, projectId }) => ({
        url: `issue/${issueId}/delete`,
        method: "DELETE",
        body: { projectId },
      }),
      invalidatesTags: ["Issues"],
    }),
  }),
  overrideExisting: false,
});

// hooks
export const {
  useIssuesQuery,
  useCreateIssueMutation,
  useUpdateIssueMutation,
  useDeleteIssueMutation,
} = extendedApi;

// selectors
interface IssueSelector extends IssueQuery {
  listId: number;
}

export const selectIssuesArray = ({ listId, ...query }: IssueSelector) =>
  extendedApi.useIssuesQuery(query, {
    selectFromResult: ({ data }) => ({
      issues: data ? data[listId] : [],
    }),
    refetchOnMountOrArgChange: true,
  });

// helpers
const updateIssueOrderLocally = (issues: Issues, { s, d }: dndOrderData) => {
  const source = issues[s.sId].slice(0);
  const target = issues[d.dId].slice(0);
  const draggedIssue = source.splice(s.index, 1)[0]; // remove dragged item from its source list
  (s.sId === d.dId ? source : target).splice(d.index, 0, draggedIssue); // insert dragged item into target list
  return { ...issues, [d.dId]: target, [s.sId]: source } as Issues;
};
