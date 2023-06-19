import axios from "axios";
import { Driver, DriverResponse } from "@/types/DriverType";
import { API_URL } from "../contants";

const fetchPostDriver = async (driver: Driver) => {
  const DRIVER = "/Condutor";

  try {
    await axios.post<DriverResponse>(`${API_URL + DRIVER}`, driver);
    return true;
  } catch (error) {
    return(false);
  }
};

const fetchGetDriver = async () => {
  const DRIVER = "/Condutor";

  try {
    const res = await axios.get<DriverResponse>(`${API_URL + DRIVER}`);
    return res.data;
  } catch (error) {
    return(error);
  }
};

export { fetchPostDriver, fetchGetDriver };
