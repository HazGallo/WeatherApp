import { useMutation } from "react-query";
import { GetInfoWeather } from "../services/GetInfoWeather";

// import { PropsDataWeather } from "../services/Interfaces/CityData";

export const useWeather = () => {
  return useMutation(GetInfoWeather, {
    onSuccess: () => {},
  });
};
