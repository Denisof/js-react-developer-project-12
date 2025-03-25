import axios from 'axios';
import { toast } from 'react-toastify';
import i18next from '../i18n/i18next.js';
import routes  from "./routes.js";

const instance = axios.create({
  baseURL: routes.apiBase(),
  timeout: 10000,
});

instance.interceptors.response.use(
  response => response,
  error => {
    toast.error(i18next.t('errors.networkError'));
    return Promise.reject(error);
  }
);

export default instance;
