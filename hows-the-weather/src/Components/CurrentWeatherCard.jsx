import "../styles/currentWeatherCard.scss";
import weatherCodes from "../hooks/WeatherCodes";
const CurrentWeatherCard = ({ data, units }) => {
  return (
    <>
      <div className="current-weather-container col-5 d-flex justify-content-around ms-5 mt-5">
        <div className="temperature-container col-3">
          <p className="temp-content d-flex align-items-center justify-content-center">
            {data.temperature_2m}
            {units.temperature_2m}
          </p>
        </div>
        <div className="details-container col-7 d-flex flex-column gap-3">
          <div className="desc-container">
            <p className="desc-name">{weatherCodes[data.weather_code].name}</p>
          </div>
          <div className="details-content d-flex gap-4">
            <div className="details col">
              <div className="title">
                <p className="title-name">Humidity</p>
              </div>
              <div className="details-info">
                <p>{data.relative_humidity_2m}{units.relative_humidity_2m}</p>
              </div>
            </div>
            <div className="details col">
              <div className="title">
                <p className="title-name">Wind Speed</p>
              </div>
              <div className="details-info">
                <p>{data.wind_speed_10m}{units.wind_speed_10m}</p>
              </div>
            </div>
            <div className="details col">
              <div className="title">
                <p className="title-name">Rain</p>
              </div>
              <div className="details-info">
                <p>{data.rain}{units.rain}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentWeatherCard;
