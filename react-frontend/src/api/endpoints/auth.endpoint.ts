import { api } from '../api';
import { AuthUser, PublicUser, updateAuthUser } from '../apiTypes';

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    authUser: builder.query<AuthUser, void>({
      query: () => ({ url: '/user' }),
      providesTags: ['AuthUser'],
    }),
    updateAuthUser: builder.mutation<AuthUser, updateAuthUser>({
      query: (body) => ({
        url: 'user/authUser/update',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['AuthUser'],
    }),
  }),
  overrideExisting: false,
});

export const { useAuthUserQuery, useUpdateAuthUserMutation } = extendedApi;

// selectors
export const selectAuthUser = () =>
  extendedApi.useAuthUserQuery(undefined, {
    selectFromResult: ({ data }) => ({ authUser: data }),
  });
