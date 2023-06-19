import axios from "axios";
import { Rider, RiderResponse } from "@/types/RiderType";
import { API_URL } from "../contants";

const fetchPostRider = async (rider: Rider) => {
  const RIDER = "/Cliente";

  try {
    const res = await axios.post<string>(`${API_URL + RIDER}`, rider);
    return true;
  } catch (error) {
    return(false);
  }
};

const fetchGetAllRiders = async (): Promise<Rider[] > => {
  const RIDER = "/Cliente";

  try {
    const res = await axios.get<Rider[]>(`${API_URL + RIDER}`);
    return res.data;
  } catch (error) {
    return [];
  }
};

export { fetchPostRider, fetchGetAllRiders };