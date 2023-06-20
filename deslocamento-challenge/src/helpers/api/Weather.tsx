import axios from "axios";
import { Weather } from "@/types/WeatherType";
import { API_URL, EMPTY_WEATHER } from "../contants";

const WEATHER = "/WeatherForecast";

const fetchGetWeather: () => Promise<Weather> = async () => {
  try {
    const res = await axios.get<Weather[]>(`${API_URL + WEATHER}`);
    return res.data.pop() || EMPTY_WEATHER;
  } catch (error) {
    return EMPTY_WEATHER;
  }
};

export { fetchGetWeather };
