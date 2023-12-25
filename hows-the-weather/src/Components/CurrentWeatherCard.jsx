import "../styles/currentWeatherCard.scss";
import $ from  'jquery';
import TimeAndDateComponent from "./TimeAndDateComponent";
import minTempIcon from '../assets/minTemp_icon.svg';
import mistImage from "../assets/mist_smoke_haze_fog.jpg";
import smokeImage from "../assets/mist_smoke_haze_fog.jpg";
import hazeImage from "../assets/mist_smoke_haze_fog.jpg";
import fogImage from "../assets/mist_smoke_haze_fog.jpg";
import clearImage from "../assets/clear.jpg";
import cloudsImage from "../assets/clouds.jpg";
import DrizzleImage from "../assets/drizzle.jpg";
import ThunderstormImage from "../assets/thunderstorm.jpg";
import TornadoImage from "../assets/tornado.jpg";
import SnowImage from "../assets/snow.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperature0, faTemperature4, faWind, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const CurrentWeatherCard = ({ data }) => {
  const weatherStockImages = {
    Mist: mistImage,
    Smoke: smokeImage,
    Haze: hazeImage,
    Fog: fogImage,
    Clear: clearImage,
    Clouds: cloudsImage,
    Drizzle: DrizzleImage,
    Thunderstorm: ThunderstormImage,
    Tornado: TornadoImage,
    Snow: SnowImage,
  };

  $('#root').css('background-image', `url(${weatherStockImages[data.weatherMain]})`);

  return (
    <>
      <div className="current-weather-container d-flex justify-content-around ms-4 mt-4">
      <div className="current-weather-backdrop"></div>
        <div className="temperature-container">
          <p className="temp-content d-flex align-items-center justify-content-center">
            {data.mainTemperature}°C
          </p>
        </div>
        <div className="details-container d-flex flex-column gap-3">
          <div className="desc-container">
            <p className="desc-name d-flex align-items-center justify-content-center"><img src={`https://openweathermap.org/img/wn/${data.weatherIcon}@2x.png`}/>{data.weatherMain} <span>({data.weatherDescription})</span></p>
          </div>
          <div className="details-content d-flex gap-4">
          <div className="details">
              <div className="title">
                <p className="title-name">Min Temp (°C)</p>
              </div>
              <div className="details-info">
                <p className="d-flex justify-content-center align-items-center gap-1"><FontAwesomeIcon icon={faTemperature0}/>{data.minTemp}°C</p>
              </div>
            </div>
            <div className="details">
              <div className="title">
                <p className="title-name">Max Temp (°C)</p>
              </div>
              <div className="details-info">
                <p className="d-flex justify-content-center align-items-center gap-1"><FontAwesomeIcon icon={faTemperature4}/>{data.maxTemp}°C</p>
              </div>
            </div>
            <div className="details">
              <div className="title">
                <p className="title-name">Humidity</p>
              </div>
              <div className="details-info">
                <p className="d-flex justify-content-center align-items-center gap-1"><FontAwesomeIcon/>{data.humidity}%</p>
              </div>
            </div>
            <div className="details">
              <div className="title">
                <p className="title-name">Wind Speed</p>
              </div>
              <div className="details-info">
                <p className="d-flex justify-content-center align-items-center gap-1"><FontAwesomeIcon icon={faWind}/>{data.windSpeed} m/s</p>
              </div>
            </div>
            <div className="details">
              <div className="title">
                <p className="title-name">Pressure</p>
              </div>
              <div className="details-info">
                <p className="d-flex justify-content-center align-items-center gap-1"><FontAwesomeIcon icon={faArrowDown}/>{data.pressure} hPa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TimeAndDateComponent
        timeStamp={data.timestamp}
      />
    </>
  );
};

export default CurrentWeatherCard;
