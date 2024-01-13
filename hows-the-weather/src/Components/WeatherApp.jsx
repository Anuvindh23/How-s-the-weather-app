import { useEffect, useRef, useState } from "react";
import useWeatherData from "../hooks/WeatherData";
import InitialLoadingScreen from "./InitialLoadingScreen";
import CurrentWeatherCard from "./CurrentWeatherCard";
import DailyWeatherCard from "./DailyWeatherCard";
import "../styles/weatherApp.scss";
import LandingModal from "./LandingModal";
// import { indexDBOperation } from "../Functions/indexedDBfunctions";

const WeatherApp = () => {
  const isPageMounted = useRef(true);
  const [positionRetrieved, setPositionRetrieved] = useState(false);

  const {
    state: weatherData,
    static: { getWeatherData },
  } = useWeatherData();

  // const handleIndexDB = async () => {
  //   const versionNumber = 1;
  //   let currentVersion;
  //   indexDBOperation('sampleDB', 'objStore1', 'id', versionNumber).then(async (res) => {
  //     res.IDBstoreData({
  //       id: 23,
  //       data: 'anuvindh',
  //     });
  //     currentVersion = await res.getVersion();
  //     if(versionNumber === currentVersion) {
  //       const newVersion = currentVersion + 1;
  //       indexDBOperation('sampleDB', 'objStore2', 'virtualId', newVersion).then((resp) => {
  //         resp.IDBstoreData({
  //           virtualId: 34,
  //           data: 'anu',
  //         });
  //       })
  //     }
  //   })
  // }

  // handleIndexDB();

  useEffect(() => {
    if(isPageMounted) {
      const fetchInitialLocationWeatherData = () => {
        if ("geolocation" in navigator && !positionRetrieved) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            await getWeatherData(lat, lon);
          });
        }
        setPositionRetrieved(true);
      };

      setTimeout(fetchInitialLocationWeatherData, 1000);
    }

    return () => {
      isPageMounted.current = false;
    }
  }, []);

  return (
    <>
      {/* {
        (weatherData.dailyWeatherData.status === 'success') ? (
          <>
            <CurrentWeatherCard
              data={weatherData.currentWeatherData}
            />
            <DailyWeatherCard
              data={weatherData.dailyWeatherData}
            />
          </>
        ) : (
          <InitialLoadingScreen/>
        )
      } */}
      <LandingModal/>
    </>
  );
};

export default WeatherApp;
