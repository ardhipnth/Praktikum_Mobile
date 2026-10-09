import { Product } from "../types/product";

export const products: Product[] = [
    { id: "1", name: "Kalkulator Casio fx-991", price: 120000, seller: "Andi", category: "elektronik", note: "Masih mulus", image: "https://www.casio.com/content/dam/casio/product-info/locales/id/id/calc/product/scientific/F/FX/FX9/fx-991EX/assets/fx-991EX_F.png.transform/main-visual-sp/image.png" },
    { id: "2", name: "Buku Algoritma & Pemrograman", price: 45000, seller: "Budi", category: "buku", image: "https://cdn.gramedia.com/uploads/product-metas/aere-r-r4a.jpg" },
    { id: "3", name: "Jaket Almamater UMM", price: 80000, seller: "Citra", category: "pakaian", image: "https://wiraldiputra21.weebly.com/uploads/8/2/7/7/82778650/7903429.jpg" },
    { id: "4", name: "Kipas Angin Kos", price: 60000, seller: "Dina", category: "perabot", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO6S7T6z1YW6nepNm2yWLhhGexkJhs_l14lFLlpirYtQ&s=10" },
];

const bukuImages: string[] = [
    "https://penerbitlitnus.co.id/wp-content/uploads/2025/08/3323.jpg",
    "https://deepublishstore.com/wp-content/uploads/2019/11/Matematika-Terapan_Moh.-Hartono_Netprom-Nurhadi-depan-scaled.jpg",
    "https://i0.wp.com/agosbookstore.com/wp-content/uploads/2022/06/4de6a113-8e07-461c-8a7b-72835d8981e6-1.jpg?fit=700%2C1000&ssl=1",
];

for (let i = 1; i <= 3; i++) {
    products.push({
        id: `buku-${i}`,
        name: `Buku Kuliah Semester ${i}`,
        price: i * 15000,
        seller: "Mahasiswa UMM",
        category: "buku",
        image: bukuImages[i - 1],
    });
}