

import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api/api';
import { Product } from '../model/product';

export const getProducts = async (): Promise<Product[]> => {
    return await fetchProducts();
  };
  
  export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    return await createProduct(product);
  };
  
  export const editProduct = async (product: Product): Promise<Product> => {
    return await updateProduct(product);
  };
  
  export const removeProduct = async (id: number): Promise<void> => {
    await deleteProduct(id);
  };