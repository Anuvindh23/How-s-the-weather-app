const useWeatherData = () => {

  const getInitialWeatherData = async (lat, lon) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,rain,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timeformat=unixtime&timezone=auto`;
    const fetchResponse = await fetch(url);
    if (fetchResponse.status === 200) {
        const data = await fetchResponse.json();
        return data;
    } else {
        console.log("Geolocation not supported by this browser.");
    }
  };

  const getSpecificWeatherData = async (cityName) => {
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    const fetchResponse = await fetch(url);

    if (fetchResponse.status === 200) {
      const data = await fetchResponse.json();
      return data;
    } else {
      throw new Error("error");
    }
  };

  return {
    static: {
      getInitialWeatherData,
      getSpecificWeatherData,
    },
  };
};

export default useWeatherData;
