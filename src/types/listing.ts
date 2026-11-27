import { Category } from "./product";

export interface ListingRow {
    id: string;
    user_id: string;
    name: string;
    price: number;
    category: string;
    note: string | null;
    seller_name: string;
    image: string | null;
    created_at: string;
}

export interface NewListing {
    name: string;
    price: number;
    category: Category;
    note?: string;
    seller_name: string;
}