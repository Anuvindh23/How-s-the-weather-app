const stopTimeInterval = () => {
    clearInterval(timeIntervalId);
  };

  const updateLiveTime = (timestamp) => {
    const time = new Date(timestamp);
    let hours = time.getUTCHours();
    let minutes = time.getUTCMinutes();
    let seconds = time.getUTCSeconds();

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "August",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let day = time.getUTCDay();
    let month = time.getUTCMonth();
    let date = time.getUTCDate();
    let year = time.getFullYear();
    const extractedTime = hours + ":" + minutes + ":" + seconds;
    const dateFormat = `${date} ${months[month]} ${year} - ${days[day]}`;
    setTime(extractedTime);
    setDate(dateFormat);
  };

  import { useState } from "react";
import "../styles/weatherApp.scss";
// import WeatherCodes from "../hooks/WeatherCodes";
import useWeatherData from "../hooks/WeatherData";
import searchIcon from "../assets/search_icon.svg";
import locationIcon from "../assets/location_icon.svg";
import tempIcon from "../assets/temperature_icon.svg";
import humidityIcon from "../assets/humidity_icon.svg";
import windspeedIcon from "../assets/windspeed_icon.svg";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [loader, setLoader] = useState(false);
  const [timeIntervalId, setTimeIntervalId] = useState();
  const [positionRetrieved, setPositionRetrieved] = useState(false);
  const [time, setTime] = useState();
  const [date, setDate] = useState();

  const {
    static: { getSpecificWeatherData, getInitialWeatherData },
  } = useWeatherData();



  if ("geolocation" in navigator && !positionRetrieved) {
    setInfo(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getInitialWeatherData(lat, lon)
        .then((res) => {
          setInfo(false);
          setWeatherData(res);

          let timestamp = res.dt * 1000 + res.timezone * 1000;
          const intervalId = setInterval(function () {
            timestamp += 1000;
            updateLiveTime(timestamp);
          }, 1000);
          setTimeIntervalId(intervalId);
        })
        .catch((err) => console.log(err));
    });
    setPositionRetrieved(true);
  }

  const getWeatherData = async () => {
    setLoader(true);

    if (timeIntervalId) {
      console.log(timeIntervalId);
      stopTimeInterval();
      setTimeIntervalId(null);
    }

    const cityName = document.getElementsByClassName("place-input")[0].value;
    getSpecificWeatherData(cityName)
      .then((res) => {
        setLoader(false);
        setWeatherData(res);
        const iconUrl = `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
        setWeatherIcon(iconUrl);

        let timestamp = res.dt * 1000 + res.timezone * 1000;
        const intervalId = setInterval(function () {
          timestamp += 1000;
          updateLiveTime(timestamp);
        }, 1000);
        setTimeIntervalId(intervalId);
      })
      .catch((err) => {
        setLoader(false);
        setError(true);
        setTimeout(function () {
          setError(false);
        }, 8000);
        console.log(err);
      });
  };
  return (
    <>
      {weatherData && (
        <div className="weather-image-container">
          <img
            src={weatherStockImages[weatherData.weather[0].main]}
          />
        </div>
      )}
      <div className={`card-container ${weatherData ? "data-received" : ""}`}>
        <div className="weather-img-container">
          <img src={weatherIcon} />
          {weatherData && (
            <div className="weather-main-desc-container">
              <div className="main-container">
                <p>{weatherData.weather[0].main}</p>
              </div>
              <div className="desc-container">
                <p>{weatherData.weather[0].description}</p>
              </div>
            </div>
          )}
        </div>
        <div className="search-container">
          <input className="place-input" placeholder="Enter city name"></input>
          <button onClick={getWeatherData} className="submit-btn">
            {loader || info ? (
              <span className="loader"></span>
            ) : (
              <img src={searchIcon} height={"30px"} />
            )}
          </button>
        </div>
        <div className={`search-results ${weatherData ? "inner-data" : ""}`}>
          {weatherData ? (
            <>
              <div className="data-field">
                <p>Location</p>
                <div className="info-container">
                  <img src={locationIcon} height="20px" />
                  <p className="place">
                    {weatherData.name}, {weatherData.sys.country}
                  </p>
                </div>
              </div>
              <div className="data-field">
                <p>Temperature</p>
                <div className="info-container">
                  <img src={tempIcon} height="20px" />
                  <p className="temperature">{weatherData.main.temp}°C</p>
                </div>
              </div>
              <div className="data-field">
                <p>Humidity</p>
                <div className="info-container">
                  <img src={humidityIcon} height="20px" />
                  <p className="humidity">{weatherData.main.humidity}%</p>
                </div>
              </div>
              <div className="data-field">
                <p>Wind Speed</p>
                <div className="info-container">
                  <img src={windspeedIcon} height="20px" />
                  <p className="wind-speed">
                    {weatherData.wind.speed} meter/sec
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p>Get your city&apos;s weather results here</p>
          )}
        </div>
      </div>
      {weatherData && (
        <div className="time-container">
          <p className="day">{date ? date: ''}</p>
          <p className="livetime">{time ? time : "00:00:00"}</p>
        </div>
      )}
      <div className={`error-container ${error ? "show-error" : ""}`}>
        <p>
          Oops! Looks like the city you entered is not available. Please check
          the spelling of the city you entered is correct.
        </p>
      </div>
      <div
        className={`initial-info-container ${
          info ? "show-info" : weatherData ? "hide-info" : ""
        }`}
      >
        <p>
          Please wait until we find your Geo Location and provide weather
          information.
        </p>
        <span className="loader"></span>
      </div>
    </>
  );
};

export default WeatherApp;
