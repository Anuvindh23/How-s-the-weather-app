import { useState } from "react";

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState({
    locationName: false,
    currentWeatherData: {
      status: false,
      timestamp: false,
      humidity: false,
      temperature: false,
      windSpeed: false,
      weatherIcon: false,
      weatherMain: false,
      weatherDescription: false,
    },
    dailyWeatherData: {
      status: false,
      dailyData: false,
      dailyUnits: false,
    }
  });

  const getWeatherData = async (lat, lon) => {
    const currentWeatherDataUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=1077a87a4edcc4df0c0e7ca012bf62ac`;
    const cwdResponse = await fetch(currentWeatherDataUrl);
    if (cwdResponse.status === 200) {
        const data = await cwdResponse.json();
        setWeatherData((prevObj) => ({
          ...prevObj,
          locationName: data.name,
          currentWeatherData: {
            status: 'success',
            timestamp: data.dt * 1000,
            humidity: data.main.humidity,
            mainTemperature: data.main.temp,
            minTemp: data.main.temp_min,
            maxTemp: data.main.temp_max,
            windSpeed: data.wind.speed,
            weatherIcon: data.weather[0].icon,
            weatherMain: data.weather[0].main,
            weatherDescription: data.weather[0].description,
            pressure: data.main.pressure,
          },
        }));
    } else {
        console.log("Something wrong happened while getting the current weather data from server! 🥲");
    }

    const dailyWeatherDataUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min`;
    const dwdResponse = await fetch(dailyWeatherDataUrl);
    if (dwdResponse.status === 200) {
      const data = await dwdResponse.json();
      setWeatherData((prevObj) => ({
        ...prevObj,
        dailyWeatherData: {
          status: 'success',
          dailyData:data.daily,
          dailyUnits:data.daily_units,
        }
      }))
    } else {
      console.log('Something wrong happened while getting the daily weather data from the server! 😢')
    }
  }
  return {
    state: weatherData,
    setState: setWeatherData,
    static: {
      getWeatherData,
    },
  };
};

export default useWeatherData;
