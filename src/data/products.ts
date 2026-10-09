import { Product } from "../types/product";

export const products: Product[] = [
    { id: "1", name: "Kalkulator Casio fx-991", price: 120000, seller: "Andi", category: "elektronik", note: "Masih mulus" },
    { id: "2", name: "Buku Algoritma & Pemrograman", price: 45000, seller: "Budi", category: "buku" },
    { id: "3", name: "Jaket Almamater UMM", price: 80000, seller: "Citra", category: "pakaian" },
    { id: "4", name: "Kipas Angin Kos", price: 60000, seller: "Dina", category: "perabot" },
];

for (let i = 1; i <= 3; i++) {
    products.push({
        id: `buku-${i}`,
        name: `Buku Kuliah Semester ${i}`,
        price: i * 15000,
        seller: "Mahasiswa UMM",
        category: "buku",
    });
}