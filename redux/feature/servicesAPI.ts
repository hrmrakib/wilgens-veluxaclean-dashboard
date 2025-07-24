import { create } from "domain";
import baseApi from "../api/baseAPI";

const authAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query<any, any>({
      query: () => ({
        url: "/service/get-all-service",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "GET",
      }),
    }),

    getServiceById: builder.query<any, string>({
      query: (id) => ({
        url: `/service/get-details/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "GET",
      }),
    }),

    createService: builder.mutation<any, any>({
      query: (data) => ({
        url: "/service/create-service",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "POST",
        body: data,
      }),
    }),

    updateService: builder.mutation<any, { data: any; id: string }>({
      query: ({ data, id }) => ({
        url: `/service/update-service/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    deleteService: builder.mutation<any, string>({
      query: (id) => ({
        url: `/service/delete-service/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "DELETE",
      }),
    }),

    viewAllItems: builder.query<any, any>({
      query: (id) => ({
        url: `/api-apps/ViewAllItems/?service_id=${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useViewAllItemsQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = authAPI;
