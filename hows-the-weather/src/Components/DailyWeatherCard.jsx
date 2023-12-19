import '../styles/dailyWeatherCard.scss';

const DailyWeatherCard = ({ data, units }) => {
  const formattedData = [];
  data.time.map((item, index) => {
    const tempObj = {
      time: new Date(item * 1000),
      maxTemp: data.temperature_2m_max[index],
      minTemp: data.temperature_2m_min[index],
      weatherCode: data.weather_code[index],
    };
    formattedData.push(tempObj);
  });
  console.log(formattedData);
  return (
    <div className="daily-weather-container container d-flex mb-5 mx-auto">
      {formattedData.map((item, index) => (
        <div key={index} className="day-weather-container col">
          <div className="day-weather-image-container">
            <p className="day-weather-image">{item.weatherCode}</p>
          </div>
          <div className="day-weather-info-container d-flex justify-content-center gap-3">
            <div className="max-temp-content">
                <p className="max-title">Max</p>
                <p className="max-temp">{item.maxTemp}°C</p>
            </div>
            <div className="min-temp-content">
                <p className="min-title">Min</p>
                <p className="min-temp">{item.minTemp}°C</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyWeatherCard;
