import '../styles/dailyWeatherCard.scss';

const DailyWeatherCard = ({ data }) => {
  const formattedData = [];
  data.dailyData.time.map((item, index) => {
    const d = new Date(item);
    const date = d.getDate();
    const month = d.getMonth();
    const day = d.getUTCDay();
    const tempObj = {
      time: { date, month, day },
      maxTemp: data.dailyData.temperature_2m_max[index],
      minTemp: data.dailyData.temperature_2m_min[index],
      weatherCode: data.dailyData.weather_code[index],
    };
    formattedData.push(tempObj);
  });
  return (
    <div className="daily-weather-container me-4">
    <div className='daily-weather-backdrop'></div>
      <div className='day-weather-container-group'>
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
    </div>
  );
};

export default DailyWeatherCard;
