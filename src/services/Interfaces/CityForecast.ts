export interface PropsCityForecast {
  dt: number;
  main: Main;
  weather: Weather[];
}

export interface Main {
  temp: number;
  feels_like: number;
  humidity: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
