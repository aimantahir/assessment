import axiosInstance, { WEATHER_API_KEY } from '@utils/axios';

export const getAllWeather = async () => {
  const result = await axiosInstance.get(
    `v1/forecast.json?key=${WEATHER_API_KEY}&q=lahore&days=30`,
  );
  return result.data;
};
