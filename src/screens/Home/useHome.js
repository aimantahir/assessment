import { getAllWeather } from '@apis/weatherApi';
import { setCityName, setForcastDays, setSelectedWeather } from '@store/slice/weatherSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from '@utils/moment';

const useHome = () => {
  const dispatch = useDispatch();

  const callWeatherApi = async () => {
    const result = await getAllWeather();
    if (result) {
      const city = result.location.name;
      const forcastDays = result.forecast.forecastday.map((item) => {
        return {
          id: item.date_epoch,
          date: item.date,
          crTempreture: item.day.avgtemp_c,
          humidity: item.day.avghumidity,
          windSpeed: item.day.maxwind_kph,
          lowestTemp: item.day.mintemp_c,
          highestTemp: item.day.maxtemp_c,
          icon: item.day.condition.icon,
          hoursData: item.hour.map((hour) => {
            return {
              id: hour.time_epoch,
              time: hour.time,
              temp: hour.temp_c,
              humidity: hour.humidity,
              wind: hour.wind_kph,
              icon: hour.condition.icon,
            };
          }),
        };
      });
      dispatch(
        setSelectedWeather({
          date: moment(result.current.last_updated, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD'),
          temp: result.current.temp_c,
          humidity: result.current.humidity,
          wind: result.current.wind_kph,
          icon: result.current.condition.icon,
          hoursData: result.forecast.forecastday[0].hour.map((hour) => {
            return {
              id: hour.time_epoch,
              time: hour.time,
              temp: hour.temp_c,
              humidity: hour.humidity,
              wind: hour.wind_kph,
              icon: hour.condition.icon,
            };
          }),
        }),
      );
      dispatch(setForcastDays(forcastDays));
      dispatch(setCityName(city));
    }
  };

  useEffect(() => {
    callWeatherApi();
  }, []);

  return {};
};

export default useHome;
