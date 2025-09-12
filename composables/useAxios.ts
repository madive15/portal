import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { useLoginStore } from '~/stores/login';
import { useLoadingStore } from '~/stores';

const baseURL = import.meta.env.VITE_API_URL as string;

type AxiosType = {
  useLoading: boolean;
};

export const useAxios = (
  { useLoading = true }?: AxiosType = { useLoading: true }
) => {
  const loginStore = useLoginStore();
  const loadingStore = useLoadingStore();

  const instance = axios.create({
    baseURL,
    withCredentials: true
  });

  instance.interceptors.request.use(
    (config) => {
      if (useLoading) {
        loadingStore.incrementLoadCount();
      }

      return Promise.resolve(config);
    },
    (error: AxiosError) => {
      if (useLoading) {
        loadingStore.incrementLoadCount();
      }

      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse<any, any>) => {
      loginStore.resetTimeout();
      if (useLoading) {
        loadingStore.decrementLoadCount();
      }
      return Promise.resolve(response);
    },
    (error: AxiosError) => {
      loginStore.resetTimeout();
      if (error.status === 403) {
        loadingStore.resetLoadCount();
        return Promise.reject(error);
      }

      if (useLoading) {
        loadingStore.decrementLoadCount();
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
