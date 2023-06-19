import axios, { HttpStatusCode } from "axios";
import { Vehicle } from "@/types/VehicleType";
import { API_URL } from "../contants";

const VEHICLE = "/Veiculo";

const fetchPostVehicle = async (vehicle: Vehicle) => {
  try {
    const res = await axios.post<string>(`${API_URL + VEHICLE}`, vehicle);
    return !!res.data;
  } catch (error) {
    return false;
  }
};

const fetchGetVehicle = async ({ id }: { id: string }) => {
  try {
    const res = await axios.get<Vehicle>(`${API_URL + VEHICLE}/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

const fetchGetAllVehicles = async () => {
  try {
    const res = await axios.get<Vehicle[]>(`${API_URL + VEHICLE}`);
    return res.data;
  } catch (error) {
    return [];
  }
};

const fetchUpdateVehicle = async ({ vehicle }: { vehicle: Vehicle }) => {
  try {
    const res = await axios.put<HttpStatusCode>(
      `${API_URL + VEHICLE}/${vehicle?.id}`,
      vehicle
    );
    return res.status === 200;
  } catch (error) {
    return error;
  }
};

const fetchDeleteVehicle = async ({ id }: { id: string }) => {
  try {
    const res = await axios.put<HttpStatusCode>(`${API_URL + VEHICLE}/${id}`, {
      id,
    });
    return res.status === 200;
  } catch (error) {
    return error;
  }
};

export {
  fetchPostVehicle,
  fetchGetAllVehicles,
  fetchGetVehicle,
  fetchUpdateVehicle,
  fetchDeleteVehicle,
};
