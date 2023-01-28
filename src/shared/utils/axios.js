import store from '@store/index';
import { minusLoadingCnt, plusLoadingCnt } from '@store/slice/utilSlice';
import axios from 'axios';

const baseURL = 'https://api.weatherapi.com/';

export const WEATHER_API_KEY = '72ce75c0a84a4aeb9d3112800232701';

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  function (req) {
    store.dispatch(plusLoadingCnt());
    return req;
  },
  function (error) {
    store.dispatch(minusLoadingCnt());
    return error;
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    store.dispatch(minusLoadingCnt());
    return response;
  },
  function (error) {
    store.dispatch(minusLoadingCnt());
    return error;
  },
);

export default axiosInstance;
