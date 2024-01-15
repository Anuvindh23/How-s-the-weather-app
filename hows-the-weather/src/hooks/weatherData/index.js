const useWeatherData = () => {
  const API_KEY = "1077a87a4edcc4df0c0e7ca012bf62ac";

  const getInitialWeatherData = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const fetchResponse = await fetch(url);
    if (fetchResponse.status === 200) {
      const weatherMapData = await fetchResponse.json();

      const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min`;
      const meteoFetchResponse = await fetch(meteoUrl);

      if(meteoFetchResponse.status === 200) {
        const meteoData = await meteoFetchResponse.json();
        return { weatherMapData, meteoData};
      }
    } else {
        console.log("Geolocation not supported by this browser.");
    }
  };

  const getSpecificWeatherData = async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    const fetchResponse = await fetch(url);

    if (fetchResponse.status === 200) {
      const weatherMapData = await fetchResponse.json();

      const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${weatherMapData.coord.lat}&longitude=${weatherMapData.coord.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min`;
      const meteoFetchResponse = await fetch(meteoUrl);

      if(meteoFetchResponse.status === 200) {
        const meteoData = await meteoFetchResponse.json();
        return { weatherMapData, meteoData};
      }
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