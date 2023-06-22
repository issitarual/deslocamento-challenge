import axios, { HttpStatusCode } from "axios";
import { DriverRequest, DriverResponse } from "@/types/DriverType";
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

const fetchGetAllDrivers: () => Promise<DriverResponse[]> = async () => {
  try {
    const res = await axios.get<DriverResponse[]>(`${API_URL + DRIVER}`);
    return res.data || EMPTY_DRIVER;
  } catch (error) {
    return [EMPTY_DRIVER];
  }
};

const fetchGetDriver = async (id: string) => {
  try {
    const res = await axios.get<DriverResponse>(`${API_URL + DRIVER}/${id}`);
    return res.data || EMPTY_DRIVER;
  } catch (error) {
    return EMPTY_DRIVER;
  }
};

const fetchUpdateDriver = async (driver: DriverResponse) => {
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
