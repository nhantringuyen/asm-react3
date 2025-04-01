import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Container, Row, Col, Spinner, Alert} from "react-bootstrap";
import { fetchProducts } from "../../services/api"; // Hàm fetch từ API
import classes from "./ProductDetail.module.css";
import ProductList from "../../components/ProductList";
import { useDispatch } from "react-redux";
import { ADD_CART } from "../../services/cartSlice";
const ProductDetail = () => {
  const { productId } = useParams(); // Lấy id từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [images , setImages] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState(null);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {

        const data = await fetchProducts(); // Lấy danh sách sản phẩm từ API
        const foundProduct = data.find((p) => p._id.$oid === productId); // Tìm sản phẩm theo ID
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedImage(foundProduct.img1); // Chọn ảnh đầu tiên làm mặc định
          setImages([foundProduct.img1, foundProduct.img2, foundProduct.img3, foundProduct.img4]);
          const foundRelatedProduct = data.filter((p) => p.category === foundProduct.category && p._id.$oid !== foundProduct._id.$oid)
              .slice(0, 4)
          if (foundRelatedProduct) {
            setRelatedProduct(foundRelatedProduct);
          }
        }

      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };

    getProduct();
  }, [productId]); // Chạy lại khi ID thay đổi

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleAddToCart = () => {
    // console.log(product);
    if (!product) return; // Kiểm tra nếu không có sản phẩm

    const item = {
      ...product,
      quantity: quantity, // Mặc định thêm 1 sản phẩm
    };

    console.log("Adding to cart:", item); // Debug xem item có đúng không
    dispatch(ADD_CART(item)); // Dispatch action

    // alert("Sản phẩm đã được thêm vào giỏ hàng!");
    setSuccess("Thêm vào giỏ hàng thành công!");
  };
  if (loading) return <Spinner animation="border" className={classes["loading"]} />;
  if (!product) return <h2 className={classes["not-found"]}>Product not found</h2>;
  return (
      <Container>
      <div className={classes["product-detail"]}>
        <Row>
          {/* Hình ảnh sản phẩm */}
          <Col lg={6} className={classes["product-images"]} style={{ display: "flex", alignItems: "flex-start" }}>
            {/* Thumbnails bên trái */}
            <div className={classes["thumbnail-container"]} style={{ display: "flex", flexDirection: "column", gap: "10px", marginRight: "15px" }}>
              {images.map((img, index) => (
                  <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index}`}
                      className={`${classes["thumbnail"]} ${selectedImage === img ? classes["active-thumbnail"] : ""}`}
                      onClick={() => setSelectedImage(img)}
                      style={{ width: "60px", height: "60px", cursor: "pointer", objectFit: "cover", borderRadius: "5px" }}
                  />
              ))}
            </div>

            {/* Ảnh lớn bên phải */}
            <img
                src={selectedImage}
                alt={product.name}
                className={classes["main-image"]}
                style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "10px" }}
            />
          </Col>

          {/* Thông tin sản phẩm */}
          <Col lg={6} className={classes["product-info"]}>
            <h1>{product.name}</h1>
            <p className={classes["price"]}>
              {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
            </p>
            <p>{product.short_desc}</p>
            <p><strong>Category:</strong> {product.category}</p>

            {/* Chọn số lượng */}
            <div className={classes["quantity-section"]}>
              <p className={classes["quantity-label"]}>QUANTITY</p>
              <div className={classes["quantity-controls"]}>
                <button className={classes["quantity-btn"]} onClick={handleDecrement}>&#9664;</button>
                <span className={classes["quantity-value"]}>{quantity}</span>
                <button className={classes["quantity-btn"]} onClick={handleIncrement}>&#9654;</button>
              </div>
              <button className={classes["add-to-cart-btn"]} onClick={handleAddToCart}>Add to cart</button>
            </div>
            {success && <Alert variant="success">{success}</Alert>}
          </Col>
        </Row>

        {/* Mô tả sản phẩm */}
        <div className={classes["description-section"]}>
          <span className={classes["description-tab"]}>Description</span>
          <div className={classes["description-content"]}>
            <h3>Product Description</h3>
            <p>{product.long_desc}</p>
          </div>
        </div>
        {/* Sản phẩm liên quan */}
        <div className={classes["related-products"]}>
          <h3>Related Products</h3>
         <ProductList products={relatedProduct} />
        </div>
      </div>
      </Container>
  );
};

export default ProductDetail;
