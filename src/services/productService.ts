import { products as localProducts } from "../data/products";
import { ApiProduct, ApiProductList } from "../types/api";
import { Category, Product } from "../types/product";
import { delay } from "../utils/delay";

const BASE_URL = "https://dummyjson.com";
const KURS = 18200;

const mapCategory = (apiCategory: string): Category | null => {
    if (["smartphones", "laptops", "tablets", "mobile-accessories"].includes(apiCategory)) {
        return "elektronik";
    }
    if (["mens-shirts", "womens-dresses", "tops", "mens-shoes", "womens-shoes"].includes(apiCategory)) {
        return "pakaian";
    }
    if (["furniture", "home-decoration", "kitchen-accessories"].includes(apiCategory)) {
        return "perabot";
    }
    return null;
};

const toProduct = (item: ApiProduct): Product | null => {
    const category = mapCategory(item.category);
    if (category === null) {
        return null;
    }
    return {
        id: `api-${item.id}`,
        name: item.title,
        price: Math.round(item.price * KURS),
        seller: item.brand ?? "Toko Kampus",
        category,
        note: item.description,
        image: item.thumbnail,
    };
};

export const fetchApiProducts = (): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}/products?limit=100&select=title,description,category,price,brand,thumbnail`)
            .then((response) => {
                if (!response.ok) {
                    reject(`Server bermasalah (kode ${response.status})`);
                    return null;
                }
                return response.json() as Promise<ApiProductList>;
            })
            .then((data) => {
                if (data === null) {
                    return;
                }
                const result: Product[] = [];
                for (const item of data.products) {
                    const product = toProduct(item);
                    if (product !== null) {
                        result.push(product);
                    }
                }
                resolve(result.slice(0, 12));
            })
            .catch(() => reject("Tidak dapat terhubung ke server. Cek koneksi internet."));
    });
};

export const getAllProducts = async (): Promise<Product[]> => {
    await delay(500); // simulasi server agak lambat
    const apiProducts = await fetchApiProducts();
    return localProducts.concat(apiProducts);
};

export const getProductDetail = async (id: string): Promise<Product> => {
    const local = localProducts.find((p) => p.id === id);
    if (local) {
        return local;
    }

    if (id.startsWith("api-")) {
        const apiId = id.replace("api-", "");
        const response = await fetch(`${BASE_URL}/products/${apiId}`);
        if (!response.ok) {
            throw new Error("Barang tidak ditemukan di server");
        }
        const item: ApiProduct = await response.json();
        const product = toProduct(item);
        if (product !== null) {
            return product;
        }
    }

    throw new Error("Barang tidak ditemukan");
};