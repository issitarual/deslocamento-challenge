import axios, { HttpStatusCode } from "axios";
import { Driver } from "@/types/DriverType";
import { API_URL } from "../contants";

const DRIVER = "/Condutor";

const fetchPostDriver = async (driver: Driver) => {
  try {
    await axios.post<string>(`${API_URL + DRIVER}`, driver);
    return true;
  } catch (error) {
    return false;
  }
};

const fetchGetAllDrivers: () => Promise<Driver[]> = async () => {
  const emptyDriver = [
    {
      id: "",
      nome: "",
      numeroHabilitacao: "",
      categoriaHabilitacao: "",
      vencimentoHabilitacao: "",
    },
  ];
  try {
    const res = await axios.get<Driver[]>(`${API_URL + DRIVER}`);
    return res.data || emptyDriver;
  } catch (error) {
    return emptyDriver
  }
};

const fetchGetDriver = async ({ id }: { id: string }) => {
  try {
    const res = await axios.get<Driver>(`${API_URL + DRIVER}/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

const fetchUpdateDriver = async ({ driver }: { driver: Driver }) => {
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

const fetchDeleteDriver = async ({ id }: { id: string }) => {
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
