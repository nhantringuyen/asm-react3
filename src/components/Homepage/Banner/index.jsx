import { Link } from "react-router-dom";
import bannerImage from "../../../assets/banner1.jpg"; // Đảm bảo ảnh tồn tại

const Banner = () => {
  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Nội dung bên trái */}
          <div className="col-md-6 text-start">
            <p className="text-muted text-uppercase small">
              New Inspiration 2020
            </p>
            <h1 className="fw-bold fst-italic">20% OFF ON NEW SEASON</h1>
            <Link to="/shop" className="btn btn-dark mt-3 fst-italic">
              Browse collections
            </Link>
          </div>

          {/* Hình ảnh bên phải */}
          <div className="col-md-6 text-center">
            <img src={bannerImage} alt="Clock" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
