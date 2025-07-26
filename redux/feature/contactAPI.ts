import { get } from "http";
import baseApi from "../api/baseAPI";

const contactAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContacts: builder.query<any, any>({
      query: ({ page = 1, limit = 10, status = "" }) => ({
        url: `/contact/get-all-cleaning-contact?page=${page}&limit=${limit}&status=${status}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "GET",
      }),
    }),

    createContact: builder.mutation<any, any>({
      query: (data) => ({
        url: `/api-apps/CreateContact/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    updateContactStatus: builder.mutation<any, { data: any; id: string }>({
      query: ({ data, id }) => ({
        url: `/contact/cleaning-status/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    deleteContact: builder.mutation<any, string>({
      query: (id) => ({
        url: `/contact/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useCreateContactMutation,
  useUpdateContactStatusMutation,
  useDeleteContactMutation,
} = contactAPI;
export default contactAPI;
