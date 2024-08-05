// src/api/api.ts
import { Product, } from "../model/product";

const API_URL = 'https://api.escuelajs.co/api/v1/products';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const response = await fetch(`${API_URL}/${product.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const deleteProduct = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
