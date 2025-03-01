import { Link } from "react-router-dom";
import "./Categories.css"; // Import file CSS tùy chỉnh
import iphoneImg from "../../../assets/product_1.png";
import macImg from "../../../assets/product_2.png";
import ipadImg from "../../../assets/product_3.png";
import watchImg from "../../../assets/product_4.png";
import airpodsImg from "../../../assets/product_5.png";

const categories = [
  { name: "iPhone", img: iphoneImg },
  { name: "Mac", img: macImg },
  { name: "iPad", img: ipadImg },
  { name: "WATCH", img: watchImg },
  { name: "AirPods", img: airpodsImg },
];

const Categories = () => {
  return (
    <div className="container text-center my-5">
      <p className="text-muted fst-italic">CAREFULLY CREATED COLLECTIONS</p>
      <h2 className="fw-bold fst-italic">BROWSE OUR CATEGORIES</h2>
      <div className="row g-4 mt-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${index < 2 ? "col-lg-6" : "col-lg-4"} col-md-4`} // 2 items per row for the first 2 items on large screens, 3 items for the rest
          >
            <Link to="/shop" className="category-card">
              <img
                src={category.img}
                alt={category.name}
                className="img-fluid"
              />
              <h4 className="mt-2">{category.name}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
