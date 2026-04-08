import api from ".";
import { AxiosError } from "axios";
import type { Category } from "my-types";

// Define la forma de la respuesta del backend
interface ApiResponse<T> {
  payload: T;
}

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const res = await api.get<ApiResponse<Category[]>>("/category");
    console.log(res.data.payload);
    return res.data.payload;
  } catch (error) {
    const err = error as AxiosError;

    console.error("Error fetching categories:", err.message);

    // Puedes lanzar el error para manejarlo en UI
    throw err;
  }
};