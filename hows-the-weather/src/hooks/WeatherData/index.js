const useWeatherData = () => {
  const API_KEY = "1077a87a4edcc4df0c0e7ca012bf62ac";

  const getInitialWeatherData = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const fetchResponse = await fetch(url);
    if (fetchResponse.status === 200) {
        const data = await fetchResponse.json();
        return data;
    } else {
        console.log("Geolocation not supported by this browser.");
    }
  };

  const getSpecificWeatherData = async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
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
