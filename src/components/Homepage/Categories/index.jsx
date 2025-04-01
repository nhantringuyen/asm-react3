import { Link } from "react-router-dom";
import classes from "./Categories.module.css"; // Import file CSS tùy chỉnh
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
    <section className="text-center my-5">
      <p className="text-muted fst-italic">CAREFULLY CREATED COLLECTIONS</p>
      <h2 className="fw-bold fst-italic">BROWSE OUR CATEGORIES</h2>
      <div className="row g-4 mt-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${index < 2 ? "col-lg-6" : "col-lg-4"} col-md-4`} // 2 items per row for the first 2 items on large screens, 3 items for the rest
          >
            <Link to="/shop" className={classes["category-card"]}>
              <img
                src={category.img}
                alt={category.name}
                className="img-fluid"
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
