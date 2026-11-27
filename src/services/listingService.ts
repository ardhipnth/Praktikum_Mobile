import { supabase } from "../lib/supabase";
import { ListingRow, NewListing } from "../types/listing";
import { Category, Product } from "../types/product";

const rowToProduct = (row: ListingRow): Product => ({
    id: `db-${row.id}`,
    name: row.name,
    price: row.price,
    seller: row.seller_name,
    category: row.category as Category,
    note: row.note ?? undefined,
    image: row.image ?? undefined,
});

export const getListings = async (): Promise<Product[]> => {
    const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }
    return (data as ListingRow[]).map(rowToProduct);
};

export const getListingById = async (id: string): Promise<Product> => {
    const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error("Barang tidak ditemukan");
    }
    return rowToProduct(data as ListingRow);
};

export const addListing = async (input: NewListing): Promise<void> => {
    const { error } = await supabase.from("listings").insert([input]);

    if (error) {
        throw new Error(error.message);
    }
};