import baseApi from "../api/baseAPI";

const authAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<any, { page: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/user/get-all-users?page=" + page + "&limit=" + limit,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "GET",
      }),
    }),

    getUserById: builder.query<any, string>({
      query: (id) => ({
        url: `/api-auth/single_user/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery } = authAPI;
