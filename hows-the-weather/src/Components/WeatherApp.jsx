import { useState } from "react";
import useWeatherData from "../hooks/WeatherData";
import InitialLoadingScreen from "./InitialLoadingScreen";
import CurrentWeatherCard from "./CurrentWeatherCard";
import DailyWeatherCard from "./DailyWeatherCard";
import "../styles/weatherApp.scss";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [positionRetrieved, setPositionRetrieved] = useState(false);

  const {
    static: { getInitialWeatherData },
  } = useWeatherData();

  setTimeout(() => {
    if ("geolocation" in navigator && !positionRetrieved) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getInitialWeatherData(lat, lon)
          .then((res) => {
            setWeatherData(res);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
    setPositionRetrieved(true);
  }, 7000);

  return (
    <>
      {!weatherData ? (
        <InitialLoadingScreen />
      ) : (
        <>
          <CurrentWeatherCard
            data={weatherData.current}
            units={weatherData.current_units}
          />
          <DailyWeatherCard
            data={weatherData.daily}
            units={weatherData.daily_units}
          />
        </>
      )}
    </>
  );
};

export default WeatherApp;
