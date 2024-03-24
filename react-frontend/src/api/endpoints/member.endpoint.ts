// quase finalizado
import { api } from '../api';
import type { AddMember, Member, RemoveMember } from '../apiTypes';

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    members: builder.query<any, any>({
      query: (projectId) => ({
        url: `project/${projectId}/members`,
      }),
      providesTags: ['Members'],
    }),
    removeMember: builder.mutation<any, any>({
      query: (body) => ({
        url: `member/remove`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Members'],
    }),
    addMember: builder.mutation<any, any>({
      query: (body) => ({
        url: `member/add`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Members'],
    }),
  }),
  overrideExisting: false,
});

export const { useMembersQuery, useRemoveMemberMutation, useAddMemberMutation } = extendedApi;

// selectors
export const selectMembers = (projectId: string | undefined) =>
  extendedApi.useMembersQuery(projectId, {
    selectFromResult: ({ data }) => ({ members: data }),
  });