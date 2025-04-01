import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../services/api";
import ProductList from "../../components/ProductList";
import PageHeader from "../../components/PageHeader";
import { Row, Container, Col, Form, Pagination } from "react-bootstrap";
import classes from "./ShopPage.module.css";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  // Lọc sản phẩm theo danh mục
  let filteredProducts = category === "All"
      ? products
      : products.filter((p) => p.category === category);

  // Tìm kiếm sản phẩm
  filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp sản phẩm
  if (sortOption === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Phân trang sản phẩm
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
      <Container className={classes["shop-page"]}>
        <PageHeader title="SHOP" />
        <section className="shop-body">
        <Row>
          {/* Sidebar */}
          <Col lg={3}>
            <aside className={classes["sidebar"]}>
              <h3 className={classes["sidebar-title"]}>CATEGORIES</h3>
              <ul className={classes["category-list"]}>
                <li className={classes["category-main"]}>APPLE</li>
                <li onClick={() => setCategory("All")} className={category === "All" ? classes["active"] : ""}>All</li>

                <li className={classes["category-main"]}>IPHONE & MAC</li>
                <li onClick={() => setCategory("iphone")} className={category === "iphone" ? classes["active"] : ""}>iPhone</li>
                <li onClick={() => setCategory("ipad")} className={category === "ipad" ? classes["active"] : ""}>iPad</li>
                <li onClick={() => setCategory("macbook")} className={category === "macbook" ? classes["active"] : ""}>Macbook</li>

                <li className={classes["category-main"]}>WIRELESS</li>
                <li onClick={() => setCategory("airpod")} className={category === "airpod" ? classes["active"] : ""}>AirPods</li>
                <li onClick={() => setCategory("watch")} className={category === "watch" ? classes["active"] : ""}>Apple Watch</li>

                <li className={classes["category-main"]}>OTHER</li>
                <li onClick={() => setCategory("mouse")} className={category === "mouse" ? classes["active"] : ""}>Mouse</li>
                <li onClick={() => setCategory("keyboard")} className={category === "keyboard" ? classes["active"] : ""}>Keyboard</li>
                <li onClick={() => setCategory("other")} className={category === "other" ? classes["active"] : ""}>Other</li>
              </ul>
            </aside>
          </Col>

          {/* Main Content */}
          <Col lg={9}>
            <div className={`${classes["top-controls"]} gap-5`}>
              {/* Thanh tìm kiếm */}
              <Form.Control
                  type="text"
                  placeholder="Enter Search Here!"
                  className={classes["search-box"]}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Bộ lọc sắp xếp */}
              <Form.Select
                  className={classes["sort-select"]}
                  onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Default sorting</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </Form.Select>
            </div>

            <h2>{category === "All" ? "All Products" : category}</h2>

            {/* Hiển thị sản phẩm hoặc thông báo khi không có sản phẩm */}
            {currentProducts.length > 0 ? (
                <ProductList products={currentProducts} />
            ) : (
                <p className={classes["no-products"]}>No products available.</p>
            )}

            {/* Phân trang */}
            <Pagination className={classes["pagination"]}>
              <Pagination.Prev className={classes["page-item"]}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
              />
              {[...Array(Math.ceil(filteredProducts.length / productsPerPage))].map((_, index) => (
                  <Pagination.Item     className={`${classes["page-item"]} ${index + 1 === currentPage ? classes.active : ""}`}
                     key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </Pagination.Item>
              ))}
              <Pagination.Next className={classes["page-item"]}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredProducts.length / productsPerPage)))}
                  disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
              />
            </Pagination>
          </Col>
        </Row>
        </section>
      </Container>
  );
};

export default ShopPage;
