import axios from "axios";
import api from "../config/api";
import { Coords, Historic } from "../models/historicModel";

export type CreateHistoricServiceRequest = {
  licensePlate: string;
  description: string;
  coords: Coords[];
}

export type CreateHistoricServiceResponse = {}

export const createHistoricService =
  async (data: CreateHistoricServiceRequest): Promise<CreateHistoricServiceResponse> => {
    try {
      const response = await api.post<CreateHistoricServiceResponse>('/histories', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message)
      }
      throw error;
    }
  }

export interface GetCarInUseServiceResponse extends Historic { }

export const getCarInUseService = async (): Promise<GetCarInUseServiceResponse> => {
  try {
    const response = await api.get<GetCarInUseServiceResponse>('/histories/get-car-in-use');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message)
    }
    throw error;
  }
}

export interface GetHistoricByIdServiceResponse extends Historic { }

export const getHistoricByIdService = async (id: string): Promise<GetHistoricByIdServiceResponse> => {
  try {
    const response = await api.get<GetHistoricByIdServiceResponse>(`/histories/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message)
    }
    throw error;
  }
}