export interface ApiProduct {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    brand?: string;
    thumbnail: string;
}

export interface ApiProductList {
    products: ApiProduct[];
    total: number;
    skip: number;
    limit: number;
}