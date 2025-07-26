import baseApi from "../api/baseAPI";

const paymentAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayment: builder.query<any, { page: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/payment/get-all-payment?page=${page}&limit=${limit}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPaymentQuery } = paymentAPI;
export default paymentAPI;
