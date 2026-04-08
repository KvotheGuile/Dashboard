import api from ".";
import { AxiosError } from "axios";
import type { Product, NewProductInput } from "my-types";

// Define la forma de la respuesta del backend
interface ApiResponse<T> {
  payload: T;
}

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const res = await api.get<ApiResponse<Product[]>>("/product");
    console.log(res.data.payload);
    return res.data.payload;
  } catch (error) {
    const err = error as AxiosError;

    console.error("Error fetching products:", err.message);

    // Puedes lanzar el error para manejarlo en UI
    throw err;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await api.delete(`/product/${id}`);
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error deleting product:", err.message);
    throw err;
  }
};

export const createProduct = async (data: NewProductInput): Promise<Product> => {
  try {
    const res = await api.post<ApiResponse<Product>>("/product", data);

    return res.data.payload;
  } catch (error) {
    const err = error as AxiosError;

    console.error("Error creating product:", err.message);

    throw err;
  }
};


export const updateProduct = async (id: number, data: NewProductInput): Promise<Product> => {
  try {
    const res = await api.patch<ApiResponse<Product>>(`/product/${id}`, data);

    return res.data.payload;
  } catch (error) {
    const err = error as AxiosError;

    console.error("Error updating product:", err.message);

    throw err;
  }
};
