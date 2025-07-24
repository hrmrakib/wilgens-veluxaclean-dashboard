import { send } from "process";
import baseApi from "../api/baseAPI";
import { get } from "http";

const notificationAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<any, void>({
      query: () => ({
        url: "/api-apps/ViewAllNotification/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "GET",
      }),
    }),

    createNotification: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api-apps/AddNotification/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
    }),
  }),
});

export const { useGetNotificationsQuery, useCreateNotificationMutation } =
  notificationAPI;
