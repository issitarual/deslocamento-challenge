import axios from "axios";
import { Driver } from "@/types/DriverType";
import { API_URL } from "../contants";

const fetchPostDriver = async (driver: Driver) => {
  const DRIVER = "/Condutor";

  try {
    await axios.post<string>(`${API_URL + DRIVER}`, driver);
    return true;
  } catch (error) {
    return false;
  }
};

const fetchGetAllDrivers = async (): Promise<Driver[]> => {
  const DRIVER = "/Condutor";

  try {
    const res = await axios.get<Driver[]>(`${API_URL + DRIVER}`);
    return res.data;
  } catch (error: any) {
    return [];
  }
};

export { fetchPostDriver, fetchGetAllDrivers };
