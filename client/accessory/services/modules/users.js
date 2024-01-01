import { api } from '../api';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    fetchOne: build.query({
      query: id => `/customers/${id}`,
    }),
    verifyEmail: build.query({
      query: token => `/verify/${token}`,
    }),
    customerSignin: build.mutation({
      query: signinData => 
        ({
        url: '/customers/signin',
        method: 'POST',
        body: signinData.signinData,
      }),
    }),
    customerSignup: build.mutation({
      query: body => 
        ({
        url: '/customers',
        method: 'POST',
        body: body,
      }),
    }),
    forgotPassword: build.mutation({
      query: data => ({
        url: '/forgotPassword',
        method: 'POST',
        body: data,
      }),
    }),
    verifyResetCode: build.mutation({
      query: resetCodeData => ({
        url: '/verifyResetCode',
        method: 'PUT',
        body: resetCodeData,
      }),
    }),
    updatePassword: build.mutation({
      query: passwordData => ({
        url: '/updatePassword',
        method: 'PUT',
        body: passwordData,
      }),
    }),
    getExpoToken: build.mutation({
      query: expoData => ({
        url: '/expo',
        method: 'PUT',
        body: expoData,
      }),
    }),
    checkNotification: build.query({
      query: () => '/notification',
    }),

  }),
  overrideExisting: true,
});

export const {
  useLazyFetchOneQuery,
  useLazyVerifyEmailQuery,
  useCustomerSigninMutation,
  useForgotPasswordMutation,
  useVerifyResetCodeMutation,
  useUpdatePasswordMutation,
  useGetExpoTokenMutation,
  useCheckNotificationQuery,
  useGetLoggedInUserQuery,
  useCustomerSignupMutation
} = userApi;
