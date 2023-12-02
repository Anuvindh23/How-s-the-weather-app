// import React from "react";

const WeatherApp = () => {

    const getWeatherData = async () => {
        const cityName = document.getElementsByClassName('entered-place')[0].value;
        const API_KEY = "1077a87a4edcc4df0c0e7ca012bf62ac";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
        const fetchResponse = await fetch(url);
        const data = await fetchResponse.json();
        console.log(data, 'parsed');
        if(data) {
            const searchEl = document.getElementsByClassName('search-results');
            searchEl[0].innerHTML = data;
        }
    }
  return (
    <>
        <div>
        <div className="search-container">
            <input className="entered-place"></input>
            <button onClick={getWeatherData}>Submit</button>
        </div>
        <div className="search-results">None</div>
        </div>
    </>
  );
};

export default WeatherApp;
