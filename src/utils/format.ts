export const formatRupiah = (price: number): string =>
    `Rp ${price.toLocaleString("id-ID")}`;