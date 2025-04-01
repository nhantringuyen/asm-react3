import { Link } from "react-router-dom";
import bannerImage from "../../../assets/banner1.jpg";
import classes from "./banner.module.css";
const Banner = () => {
  return (
    <section className={classes["banner-sec"]}>
        <div className="row align-items-center">
          <div className={`${classes["col-left"]} col-md-6 text-start`}>
            <p className="text-muted text-uppercase small">
              New Inspiration 2020
            </p>
            <h1 className="fw-bold fst-italic">20% OFF ON NEW SEASON</h1>
            <Link to="/shop" className="btn btn-dark mt-3 fst-italic">
              Browse collections
            </Link>
          </div>
          <div className="col-md-6">
            <img src={bannerImage} alt="Clock" className="img-fluid" />
          </div>
        </div>
    </section>
  );
};

export default Banner;
