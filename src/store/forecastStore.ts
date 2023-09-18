import create from "zustand";
import { PropsCityForecast } from "../services/Interfaces/CityForecast";

export const forecastEmpty: PropsCityForecast = {
  dt: 0, // Asigna un valor adecuado para 'dt' según tus necesidades
  main: {
    temp: 0, // Asigna valores adecuados para 'temp', 'feels_like' y 'humidity'
    feels_like: 0,
    humidity: 0,
  },
  weather: [], // Un arreglo vacío para 'weather'
};

interface InputState2 {
  dataForecast: PropsCityForecast;
  setDataForecast: (dataForecast: PropsCityForecast) => void;
}

const forecastStore = create<InputState2>((set) => ({
  dataForecast: forecastEmpty,
  setDataForecast: (dataForecast) => {
    set((state) => ({
      ...state,
      dataForecast: dataForecast,
    }));
  },
}));

export default forecastStore;
