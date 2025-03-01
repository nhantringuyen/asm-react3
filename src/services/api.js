// api.js
export const fetchProducts = async () => {
  try {
    const response = await fetch(
      "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
    );
    const data = await response.json();
    return data; // Trả về dữ liệu sản phẩm
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Ném lỗi ra ngoài nếu có
  }
};
