import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-white py-3">
      <div className="container">
        {/* Bên trái: Home & Shop */}
        <div className="d-flex">
          <button
            className="btn btn-link nav-link mx-3 text-dark fw-bold"
            onClick={() => navigate("/")}
          >
            <i className="text-warning">Home</i>
          </button>
          <button
            className="btn btn-link nav-link mx-3 text-dark fw-bold"
            onClick={() => navigate("/shop")}
          >
            <i>Shop</i>
          </button>
        </div>

        {/* Logo ở giữa */}
        <div className="mx-auto">
          <button
            className="btn btn-link navbar-brand fw-bold text-dark"
            onClick={() => navigate("/")}
          >
            <i>BOUTIQUE</i>
          </button>
        </div>

        {/* Bên phải: Cart & Login */}
        <div className="d-flex">
          <button
            className="btn btn-link nav-link mx-3 text-dark"
            onClick={() => navigate("/cart")}
          >
            🛒 Cart
          </button>
          <button
            className="btn btn-link nav-link mx-3 text-dark"
            onClick={() => navigate("/login")}
          >
            👤 Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
