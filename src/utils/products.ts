import { products } from "../data/products";
import { Product } from "../types/product";

export const getProductById = (id: string): Product | undefined =>
    products.find((p) => p.id === id);