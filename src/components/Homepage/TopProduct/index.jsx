import React, { useEffect, useState } from "react";
import ProductList from "../../ProductList";
import { fetchProducts } from "../../../services/api";
import classes from "./TopProduct.module.css";

const TopProduct = () => {
  const [products, setProducts] = useState([]);
  // const dispatch = useDispatch();

  // Hàm để lấy dữ liệu từ API
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.slice(0, 8)); // Chỉ lấy 8 sản phẩm đầu tiên
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getProducts();
  }, []);

  // Hàm chuyển đổi giá thành chuỗi có dấu chấm ngăn cách
  // const formatPrice = (price) => {
  //   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // };

  return (
    <section className={classes["top-product"]}>
      <h3 className={classes["sub-title"]}>MADE THE HARD WAY</h3>
      <h2 className={classes["sec-title"]}>TOP TRENDING PRODUCTS</h2>
      <ProductList products={products} isTopProduct={true} columns={4} />
    </section>
  );
};

export default TopProduct;
