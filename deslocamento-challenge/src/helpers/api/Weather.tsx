import axios from "axios";
import { Weather } from "@/types/WeatherType";
import { API_URL } from "../contants";

const WEATHER = "/WeatherForecast";

const fetchGetWeather = async () => {
  try {
    const res = await axios.get<Weather>(`${API_URL + WEATHER}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export { fetchGetWeather };
