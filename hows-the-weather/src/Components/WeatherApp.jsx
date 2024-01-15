import { useState, useEffect } from "react";
import "../styles/weatherApp.scss";
import useWeatherData from "../hooks/WeatherData";
import searchIcon from "../assets/search_icon.svg";
import locationIcon from "../assets/location_icon.svg";
import tempIcon from "../assets/temperature_icon.svg";
import humidityIcon from "../assets/humidity_icon.svg";
import windspeedIcon from "../assets/windspeed_icon.svg";
import weatherIcon from "../assets/weather_logo.svg";
import weatherStockImages from "../Functions/weatherImageMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [dailyWeatherData, setdailyWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [loader, setLoader] = useState(false);
  const [positionRetrieved, setPositionRetrieved] = useState(false);
  const [timestamp, setTimestamp] = useState(null);

  const device = window.matchMedia("(max-width: 600px)").matches
    ? "mobile"
    : "web";

  const {
    static: { getSpecificWeatherData, getInitialWeatherData },
  } = useWeatherData();

  const updateLiveTime = (timestamp) => {
    const time = new Date(timestamp);
    let hours = time.getUTCHours();
    let minutes = time.getUTCMinutes();
    let seconds = time.getUTCSeconds();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec" ];
    let day = time.getUTCDay();
    let month = time.getUTCMonth();
    let date = time.getUTCDate();
    let year = time.getFullYear();

    let lastDig = date.toString().split("").at(-1);
    lastDig = Number(lastDig);
    let dateJoin = "";
    if (lastDig === 1) {
      dateJoin = "st";
    } else if (lastDig === 2) {
      dateJoin = "nd";
    } else if (lastDig === 3) {
      dateJoin = "rd";
    } else if ((lastDig >= 4 && lastDig <= 9) || lastDig === 0) {
      dateJoin = "th";
    }

    const extractedTime = hours + ":" + minutes + ":" + seconds;
    const dateFormat = `${days[day]}, ${date}${dateJoin} ${months[month]} ${year}`;
    const dayEl = document.querySelector(".day");
    const liveTimeEl = document.querySelector(".livetime");
    if (dayEl && liveTimeEl) {
      dayEl.innerHTML = dateFormat;
      liveTimeEl.innerHTML = extractedTime;
    }
  };

  if ("geolocation" in navigator && !positionRetrieved) {
    setInfo(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getInitialWeatherData(lat, lon)
        .then((res) => {
          setInfo(false);
          setWeatherData(res.weatherMapData);
          const dailyData = res.meteoData.daily.time.map((item, index) => {
            return {
              time: item,
              maxTemp: Math.round(res.meteoData.daily.temperature_2m_max[index]),
              minTemp: Math.round(res.meteoData.daily.temperature_2m_min[index]),
            }
          })
          setdailyWeatherData(dailyData);

          let timestamp =
            res.weatherMapData.dt * 1000 + res.weatherMapData.timezone * 1000;
            setTimestamp(timestamp);
        })
        .catch((err) => console.log(err));
    });
    setPositionRetrieved(true);
  }

  const getWeatherData = () => {
    setLoader(true);
    const cityName = document.getElementsByClassName("place-input")[0].value;
    getSpecificWeatherData(cityName)
      .then((res) => {
        setLoader(false);
        setWeatherData(res.weatherMapData);
        const dailyData = res.meteoData.daily.time.map((item, index) => {
          return {
            time: item,
            maxTemp: Math.round(res.meteoData.daily.temperature_2m_max[index]),
            minTemp: Math.round(res.meteoData.daily.temperature_2m_min[index]),
          };
        });
        setdailyWeatherData(dailyData);

        let timestamp = res.weatherMapData.dt * 1000 + res.weatherMapData.timezone * 1000;
        setTimestamp(timestamp);
      })
      .catch(() => {
        setLoader(false);
        setError(true);
        setTimeout(function () {
          setError(false);
        }, 8000);
        document.getElementsByClassName("place-input")[0].value = "";
      });
  };

  useEffect(() => {
    let id;
    if(timestamp) {
      id = setInterval(() => {
        const temp = timestamp + 1000;
        setTimestamp(temp);
        updateLiveTime(temp);
      }, 1000);
    }

    return () => {
      clearInterval(id);
    }
  }, [timestamp])

  return (
    <>
      {device === "web" && (
        <>
          {weatherData && (
            <div className="weather-image-container">
              <img
                src={weatherStockImages[weatherData?.weather[0]?.main]}
                alt="weather stock image"
              />
            </div>
          )}
          <div
            className={`card-container ${weatherData ? "data-received" : ""}`}
          >
            <div
              className={`search-img-container ${
                weatherData ? "flex d-flex justify-content-between w-100" : ""
              }`}
            >
              <div className="weather-img-container">
                <img
                  src={weatherIcon}
                  height={`${weatherData ? "100px" : "65px"}`}
                  width={`${weatherData ? "100px" : "65px"}`}
                  alt="logo icon"
                />
              </div>
              <div className={`search-container ${weatherData ? "" : "mt-4"}`}>
                <input
                  className="place-input"
                  placeholder="Enter city name"
                ></input>
                <button
                  onClick={getWeatherData}
                  className="submit-btn"
                  name="submit Button"
                  id="submit-btn"
                >
                  {loader || info ? (
                    <span className="loader"></span>
                  ) : (
                    <img src={searchIcon} height={"30px"} alt="search icon" />
                  )}
                </button>
              </div>
            </div>
            <div
              className={`search-results ${weatherData ? "inner-data" : ""}`}
            >
              {weatherData ? (
                <>
                  <div className="data-field">
                    <p>Location</p>
                    <div className="info-container">
                      <img
                        src={locationIcon}
                        height="20px"
                        alt="location icon"
                      />
                      <p className="place">
                        {weatherData.name}, {weatherData.sys.country}
                      </p>
                    </div>
                  </div>
                  <div className="data-field">
                    <p>Temperature</p>
                    <div className="info-container">
                      <img
                        src={tempIcon}
                        height="20px"
                        alt="temperature icon"
                      />
                      <p className="temperature">{weatherData.main.temp}°C</p>
                    </div>
                  </div>
                  <div className="data-field">
                    <p>Humidity</p>
                    <div className="info-container">
                      <img
                        src={humidityIcon}
                        height="20px"
                        alt="humidity icon"
                      />
                      <p className="humidity">{weatherData.main.humidity}%</p>
                    </div>
                  </div>
                  <div className="data-field">
                    <p>Wind Speed</p>
                    <div className="info-container">
                      <img
                        src={windspeedIcon}
                        height="20px"
                        alt="wind speed icon"
                      />
                      <p className="wind-speed">
                        {weatherData.wind.speed} meter/sec
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            {!weatherData ? (
              <p>Get your city&apos;s weather results here</p>
            ) : (
              <></>
            )}
            {dailyWeatherData && (
              <div>
                <h5 className="daily-text text-center">
                  7 days Forecast Updates:
                </h5>
                <div className="data-grid">
                  {dailyWeatherData.map((item, index) => (
                    <div key={index} className="daily-data-cell">
                      <div className="img-date-container">
                        <FontAwesomeIcon icon={faCloud} />
                        <p>{item.time}</p>
                      </div>
                      <div className="temp-container">
                        <div>
                          <p>Min</p>
                          <p>{item.minTemp}°C</p>
                        </div>
                        <div>
                          <p>Max</p>
                          <p>{item.maxTemp}°C</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {weatherData && (
            <>
              <div className="time-container">
                <p className="day"></p>
                <p className="livetime">00:00:00</p>
              </div>
              <div className="today-weather-main-desc-container">
                <div className="img-main-container">
                  <p>Today&apos;s weather condition in {weatherData.name}: </p>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="img-container">
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt="Weather Icon"
                      ></img>
                    </div>
                    <h4>{weatherData.weather[0].main}</h4>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className={`error-container ${error ? "show-error" : ""}`}>
            <p>
              Oops! Looks like the city you entered is not available. Please
              check the spelling of the city you entered is correct.
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
      )}
      {device === "mobile" && (
        <>
          {weatherData && (
            <div className="weather-image-container">
              <img
                src={weatherStockImages[weatherData?.weather[0]?.main]}
                alt="weather stock image"
              />
            </div>
          )}
          {weatherData && (
            <>
              <div className="time-container">
                <p className="day"></p>
                <p className="livetime text-end">00:00:00</p>
              </div>
              <div className="today-weather-main-desc-container">
                <div className="img-main-container">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="img-container">
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt="Weather Icon"
                      ></img>
                    </div>
                    <h4>{weatherData.weather[0].main}</h4>
                  </div>
                </div>
              </div>
            </>
          )}
          <div
            className={`card-container col-11 mx-auto mt-3 ${
              weatherData ? "data-received" : ""
            }`}
          >
            <div
              className={`search-img-container ${
                weatherData ? "flex d-block w-100" : ""
              }`}
            >
              <div className="weather-img-container">
                <img
                  src={weatherIcon}
                  height="65px"
                  width="65px"
                  alt="logo icon"
                />
              </div>
              <div className={`search-container ${weatherData ? "" : "mt-4"}`}>
                <input
                  className="place-input"
                  placeholder="Enter city name"
                ></input>
                <button
                  onClick={getWeatherData}
                  className="submit-btn"
                  name="submit Button"
                  id="submit-btn"
                >
                  {loader || info ? (
                    <span className="loader"></span>
                  ) : (
                    <img src={searchIcon} height={"30px"} alt="search icon" />
                  )}
                </button>
              </div>
            </div>
            <div
              className={`search-results ${weatherData ? "inner-data" : ""}`}
            >
              {weatherData ? (
                <>
                  <div className="data-field">
                    <p>Location</p>
                    <div className="info-container">
                      <img
                        src={locationIcon}
                        height="20px"
                        alt="location icon"
                      />
                      <p className="place">
                        {weatherData.name}, {weatherData.sys.country}
                      </p>
                    </div>
                  </div>
                  <div className="data-field">
                    <p>Temperature</p>
                    <div className="info-container">
                      <img
                        src={tempIcon}
                        height="20px"
                        alt="temperature icon"
                      />
                      <p className="temperature">{weatherData.main.temp}°C</p>
                    </div>
                  </div>
                  <div className="data-field">
                    <p>Humidity</p>
                    <div className="info-container">
                      <img
                        src={humidityIcon}
                        height="20px"
                        alt="humidity icon"
                      />
                      <p className="humidity">{weatherData.main.humidity}%</p>
                    </div>
                  </div>
                  <div className="data-field">
                    <p>Wind Speed</p>
                    <div className="info-container">
                      <img
                        src={windspeedIcon}
                        height="20px"
                        alt="wind speed icon"
                      />
                      <p className="wind-speed">{weatherData.wind.speed} m/s</p>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            {
          !weatherData ? <p className="text-center">Get your city&apos;s weather results here</p> : <></>
        }
          </div>
          {dailyWeatherData && (
            <div className="mt-3">
              <h5 className="daily-text text-center mt-4">
                7 days Forecast Updates:
              </h5>
              <div className="data-grid col-11 mx-auto">
                {dailyWeatherData.map((item, index) => (
                  <div key={index} className="daily-data-cell">
                    <div className="img-date-container">
                      <FontAwesomeIcon icon={faCloud} />
                      <p>{item.time}</p>
                    </div>
                    <div className="temp-container">
                      <div>
                        <p>Min</p>
                        <p>{item.minTemp}°C</p>
                      </div>
                      <div>
                        <p>Max</p>
                        <p>{item.maxTemp}°C</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      {
        weatherData ? <div className="sample-div"></div> : <></>
      }
      <div className={`error-container ${error ? "show-error" : ""}`}>
            <p>
              Oops! Looks like the city you entered is not available. Please
              check the spelling of the city you entered is correct.
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
            <span className="loader info"></span>
          </div>
    </>
  );
};

export default WeatherApp;
