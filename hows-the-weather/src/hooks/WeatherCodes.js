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
import SquallImage from "../assets/squall.jpg";

const weatherCodes = {
  0: {
    name: "Clear sky",
    image: clearImage,
  },
  1: {
    name: "Mainly Clear",
    image: clearImage,
  },
  2: {
    name: "Partly Cloudy",
    image: cloudsImage,
  },
  3: {
    name: "Overcast",
    image: cloudsImage,
  },
  45: {
    name: "Fog",
    image: fogImage,
  },
  48: {
    name: "Depositing Rime Fog",
    image: fogImage,
  },
  51: {
    name: "Light Drizzle",
    image: DrizzleImage,
  },
  53: {
    name: "Moderate Drizzle",
    image: DrizzleImage,
  },
  55: {
    name: "Dense Drizzle",
    image: DrizzleImage,
  },
  56: {
    name: "Light Freezing Drizzle",
    image: DrizzleImage,
  },
  57: {
    name: "Dense Freezing Drizzle",
    image: DrizzleImage,
  },
  61: {
    name: "Slight Rain",
    image: DrizzleImage,
  },
  63: {
    name: "Moderate Rain",
    image: DrizzleImage,
  },
  65: {
    name: "Heavy Rain",
    image: DrizzleImage,
  },
  66: {
    name: "Light Freezing Rain",
    image: DrizzleImage,
  },
  67: {
    name: "Heavy Freezing Rain",
    image: DrizzleImage,
  },
  71: {
    name: "Slight Snowfall",
    image: SnowImage,
  },
  73: {
    name: "Moderate Snowfall",
    image: SnowImage,
  },
  75: {
    name: "Heavy Snowfall",
    image: SnowImage,
  },
  77: {
    name: "Snow Grains",
    image: SnowImage,
  },
  80: {
    name: "Slight Rain Showers",
    image: SnowImage,
  },
  81: {
    name: "Moderate Rain Showers",
    image: DrizzleImage,
  },
  82: {
    name: "Violent Rain Showers",
    image: DrizzleImage,
  },
  85: {
    name: "Violent Snow Showers",
    image: DrizzleImage,
  },
  86: {
    name: "Heavy Snow Showers",
    image: DrizzleImage,
  },
  95: {
    name: "Thunderstorm",
    image: ThunderstormImage,
  },
  96: {
    name: "Slight Thunderstorm",
    image: ThunderstormImage,
  },
  99: {
    name: "Heavy Thunderstorm",
    image: ThunderstormImage,
  },
};

export default weatherCodes;
