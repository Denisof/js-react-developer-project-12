import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import routes from './routes';
import i18n from '../i18n/i18next.js';

const customBaseQuery = fetchBaseQuery({
  baseUrl: routes.apiBase(),
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.jwtToken?.value;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const result = await customBaseQuery(args, api, extraOptions);

  if (result.error) {
    const defaultMsg = i18n.t?.('errors.network') || 'Что-то пошло не так!';
    const serverMsg = result.error?.data?.message || result.error?.error;

    toast.error(serverMsg || defaultMsg);
  }

  return result;
};

export default baseQueryWithErrorHandling;
