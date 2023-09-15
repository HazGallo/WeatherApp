import create from "zustand";
import { PropsDataWeather } from "../services/Interfaces/CityData";

const emptyData: PropsDataWeather = {
  coord: { lon: 0, lat: 0 },
  weather: [],
  base: "",
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
  },
  visibility: 0,
  wind: { speed: 0, deg: 0 },
  clouds: { all: 0 },
  dt: 0,
  sys: {
    type: 0,
    id: 0,
    country: "",
    sunrise: 0,
    sunset: 0,
  },
  timezone: 0,
  id: 0,
  name: "",
  cod: 0,
  list: [
    {
      dt: 1647345600,
      main: {
        temp: 287.39,
        feels_like: 286.38,
        temp_min: 286.69,
        temp_max: 287.39,
        pressure: 1021,
        humidity: 58,
      },
      weather: [
        {
          id: 803,
          main: "Clouds",
          description: "broken clouds",
          icon: "04d",
        },
      ],
      visibility: 10000,
      wind: { speed: 3.08, deg: 128 },
      clouds: { all: 71 },
      dt_txt: new Date("2022-03-15 12:00:00"),
      pop: 0,
      sys: {
        type: 0,
        id: 0,
        country: "",
        sunrise: 0,
        sunset: 0,
      },
    },
    // Puedes agregar más elementos de lista aquí si es necesario
  ],
};

interface InputState {
  dataWeather: PropsDataWeather;
  setDataWeather: (dataWeather: PropsDataWeather) => void;
}

const weatherlyStore = create<InputState>((set) => ({
  dataWeather: emptyData,
  setDataWeather: (dataWeather) => {
    set((state) => ({
      ...state,
      dataWeather: dataWeather,
    }));
  },
}));

export default weatherlyStore;
