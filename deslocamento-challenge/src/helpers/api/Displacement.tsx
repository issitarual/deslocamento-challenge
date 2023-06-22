import axios, { HttpStatusCode } from "axios";
import { Displacement } from "@/types/DisplacementType";
import { API_URL } from "../contants";

const DISPLACEMENT = "/Deslocamento";

const fetchPostDisplacement = async (displacement: Displacement) => {
  try {
    const res = await axios.post<string>(
      `${API_URL + DISPLACEMENT}/IniciarDeslocamento`,
      displacement
    );
    return !!res.data;
  } catch (error) {
    return false;
  }
};

const fetchGetDisplacement = async (id: string) => {
  try {
    const res = await axios.get<Displacement>(
      `${API_URL + DISPLACEMENT}/${id}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

const fetchGetAllDisplacements: () => Promise<Displacement[]> = async () => {
  try {
    const res = await axios.get<Displacement[]>(`${API_URL + DISPLACEMENT}`);
    return res.data || [];
  } catch (error) {
    return [];
  }
};

const fetchUpdateDisplacement = async (displacement: Displacement) => {
  try {
    const res = await axios.put<HttpStatusCode>(
      `${API_URL + DISPLACEMENT}/${displacement.id}/EncerrarDeslocamento`,
      displacement
    );
    return res.status === 200;
  } catch (error) {
    return error;
  }
};

const fetchDeleteDisplacement = async (id: string) => {
  try {
    const res = await axios.put<HttpStatusCode>(
      `${API_URL + DISPLACEMENT}/${id}`,
      {
        id,
      }
    );
    return res.status === 200;
  } catch (error) {
    return error;
  }
};

export {
  fetchPostDisplacement,
  fetchGetAllDisplacements,
  fetchGetDisplacement,
  fetchUpdateDisplacement,
  fetchDeleteDisplacement,
};
