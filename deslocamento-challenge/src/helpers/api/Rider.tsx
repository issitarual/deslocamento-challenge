import axios, { HttpStatusCode } from "axios";
import { Rider, RiderRequest } from "@/types/RiderType";
import { API_URL, EMPTY_RIDER } from "../contants";

const RIDER = "/Cliente";

const fetchPostRider = async (rider: RiderRequest) => {
  try {
    const res = await axios.post<string>(`${API_URL + RIDER}`, rider);
    return !!res.data;
  } catch (error) {
    return false;
  }
};

const fetchGetRider = async (id: string): Promise<Rider> => {
  try {
    const res = await axios.get<Rider>(`${API_URL + RIDER}/${id}`);
    return res.data || EMPTY_RIDER;
  } catch (error) {
    return EMPTY_RIDER;
  }
};

const fetchGetAllRiders = async () => {
  try {
    const res = await axios.get<Rider[]>(`${API_URL + RIDER}`);
    return res.data;
  } catch (error) {
    return [];
  }
};

const fetchUpdateRider = async (rider: Rider) => {
  try {
    const res = await axios.put<HttpStatusCode>(
      `${API_URL + RIDER}/${rider?.id}`,
      rider
    );
    return res.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error?.response?.status;
    }
  }
};

const fetchDeleteRider = async (id: string) => {
  try {
    const res = await axios.put<HttpStatusCode>(`${API_URL + RIDER}/${id}`, {
      id,
    });
    return res.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error?.response?.status;
    }
  }
};

export {
  fetchPostRider,
  fetchGetAllRiders,
  fetchGetRider,
  fetchUpdateRider,
  fetchDeleteRider,
};
