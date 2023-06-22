import axios, { HttpStatusCode } from "axios";
import { DriverRequest, Driver } from "@/types/DriverType";
import { API_URL, EMPTY_DRIVER } from "../contants";

const DRIVER = "/Condutor";

const fetchPostDriver = async (driver: DriverRequest) => {
  try {
    await axios.post<string>(`${API_URL + DRIVER}`, driver);
    return true;
  } catch (error) {
    return false;
  }
};

const fetchGetAllDrivers: () => Promise<Driver[]> = async () => {
  try {
    const res = await axios.get<Driver[]>(`${API_URL + DRIVER}`);
    return res.data || EMPTY_DRIVER;
  } catch (error) {
    return [EMPTY_DRIVER];
  }
};

const fetchGetDriver = async (id: string) => {
  try {
    const res = await axios.get<Driver>(`${API_URL + DRIVER}/${id}`);
    return res.data || EMPTY_DRIVER;
  } catch (error) {
    return EMPTY_DRIVER;
  }
};

const fetchUpdateDriver = async (driver: Driver) => {
  try {
    const res = await axios.put<HttpStatusCode>(
      `${API_URL + DRIVER}/${driver.id}`,
      driver
    );
    return res.status === 200;
  } catch (error) {
    return error;
  }
};

const fetchDeleteDriver = async (id: string) => {
  try {
    const res = await axios.put<HttpStatusCode>(`${API_URL + DRIVER}/${id}`, {
      id,
    });
    return res.status === 200;
  } catch (error) {
    return error;
  }
};

export {
  fetchPostDriver,
  fetchGetAllDrivers,
  fetchGetDriver,
  fetchUpdateDriver,
  fetchDeleteDriver,
};
