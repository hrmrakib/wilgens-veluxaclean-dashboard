import baseApi from "../api/baseAPI";

const authAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation<any, any>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    sendOtp: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api-auth/resend_code/",
        method: "POST",
        body,
      }),
    }),

    resendOTP: builder.mutation<any, any>({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),

    verifyOtp: builder.mutation<any, any>({
      query: (body) => ({
        url: "/auth/verify-email",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useSendOtpMutation,
  useResendOTPMutation,
  useVerifyOtpMutation,
} = authAPI;
