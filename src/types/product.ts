export type Category = "buku" | "elektronik" | "pakaian" | "perabot";

export interface Product {
    readonly id: string;
    name: string;
    price: number;
    seller: string;
    category: Category;
    note?: string;
    image?: string;
}