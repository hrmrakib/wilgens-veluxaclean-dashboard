import baseApi from "../api/baseAPI";

const authAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewAllItems: builder.query<any, any>({
      query: (id) => ({
        url: `/api-apps/ViewAllItems/?service_id=${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "GET",
      }),
    }),

    createItem: builder.mutation<any, any>({
      query: (data) => ({
        url: `/api-apps/CreateItem/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const { useViewAllItemsQuery, useCreateItemMutation } = authAPI;
