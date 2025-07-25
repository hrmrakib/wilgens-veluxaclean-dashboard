import baseApi from "../api/baseAPI";

const faqAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query<any, void>({
      query: () => ({
        url: "/faq/get-all-faq",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "GET",
      }),
    }),

    createFaq: builder.mutation<any, any>({
      query: (data) => ({
        url: "/faq/create-faq",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "POST",
        body: data,
      }),
    }),

    updateFaq: builder.mutation<
      any,
      { data: { question: string; answer: string }; id: string }
    >({
      query: ({ data, id }) => ({
        url: `/faq/update-faq/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "PATCH",
        body: data,
      }),
    }),

    deleteFaq: builder.mutation<any, string>({
      query: (id) => ({
        url: `/faq/delete-faq/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqAPI;
export default faqAPI;
