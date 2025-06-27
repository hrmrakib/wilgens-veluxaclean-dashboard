import { create } from "domain";
import baseApi from "../api/baseAPI";

const authAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query<any, any>({
      query: () => ({
        url: "/api-apps/ViewAllServices/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),

    getServiceById: builder.query<any, string>({
      query: (id) => ({
        url: `/api-apps/ViewSingleService/?service_id=${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),

    createService: builder.mutation<any, any>({
      query: (data) => ({
        url: "/api-apps/AddNewService/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        body: data,
      }),
    }),

    updateService: builder.mutation<any, { data: any; id: string }>({
      query: ({ data, id }) => ({
        url: `/api-apps/UpdateService/?service_id=${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    deleteService: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api-apps/DeleteService/?service_id=${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "DELETE",
      }),
    }),

    viewAllItems: builder.query<any, any>({
      query: (id) => ({
        url: `/api-apps/ViewAllItems/?service_id=${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
