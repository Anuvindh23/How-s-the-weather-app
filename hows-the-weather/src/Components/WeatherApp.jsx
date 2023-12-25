import { useEffect, useRef, useState } from "react";
import useWeatherData from "../hooks/WeatherData";
import InitialLoadingScreen from "./InitialLoadingScreen";
import CurrentWeatherCard from "./CurrentWeatherCard";
import DailyWeatherCard from "./DailyWeatherCard";
import "../styles/weatherApp.scss";

const WeatherApp = () => {
  const isPageMounted = useRef(true);
  const [positionRetrieved, setPositionRetrieved] = useState(false);

  const {
    state: weatherData,
    static: { getWeatherData },
  } = useWeatherData();

  useEffect(() => {
    if(isPageMounted) {
      const fetchInitialLocationWeatherData = () => {
        if ("geolocation" in navigator && !positionRetrieved) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            await getWeatherData(lat, lon);
          });
        }
        setPositionRetrieved(true);
      };

      setTimeout(fetchInitialLocationWeatherData, 7000);
    }

    return () => {
      isPageMounted.current = false;
    }
  }, []);

  return (
    <>
      {
        (weatherData.dailyWeatherData.status === 'success') ? (
          <>
            <CurrentWeatherCard
              data={weatherData.currentWeatherData}
            />
            <DailyWeatherCard
              data={weatherData.dailyWeatherData}
            />
          </>
        ) : (
          <InitialLoadingScreen/>
        )
      }
    </>
  );
};

export default WeatherApp;
