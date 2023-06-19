import axios from "axios";
import { Weather } from "@/types/WeatherType";
import { API_URL } from "../contants";
import Error from "next/error";

const WEATHER = "/WeatherForecast";

const fetchGetWeather: () => Promise<Weather> = async () => {
  const emptyWeather = { date: "", summary: "", temperatureC: 0, temperatureF: 0 }
  try {
    const res = await axios.get<Weather[]>(`${API_URL + WEATHER}`);
    return res.data.pop() || emptyWeather;
  } catch (error) {
    return emptyWeather;
  }
};

export { fetchGetWeather };
