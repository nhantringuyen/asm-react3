import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ON_LOGOUT } from "../../services/authSlice";
import { Dropdown } from "react-bootstrap";
import classes from "./Navbar.module.css"; // Import CSS module

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get user information from Redux
    const user = useSelector((state) => state.auth.user);
    const cart = useSelector((state) => state.cart.listCart);
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    // Handle logout
    const handleLogout = () => {
        dispatch(ON_LOGOUT());
        navigate("/");
    };

    // Determine active link based on current path
    const path = window.location.pathname;
    const isHome = path === "/";
    const isShop = path === "/shop";

    return (
        <header className={`bg-white ${classes.navbarContainer}`}>
            <div className={`container d-flex flex-wrap align-items-center justify-content-between`}>
                {/* Left: Home & Shop */}
                <div className={classes.navSection}>
                    <button
                        className={`${classes.navLink} ${isHome ? classes.activeLink : ""}`}
                        onClick={() => navigate("/")}
                    >
                        Home
                    </button>
                    <button
                        className={`${classes.navLink} ${isShop ? classes.activeLink : ""}`}
                        onClick={() => navigate("/shop")}
                    >
                        Shop
                    </button>
                </div>

                {/* Center: Logo */}
                <button
                    className={classes.brandLink}
                    onClick={() => navigate("/")}
                >
                    BOUTIQUE
                </button>

                {/* Right: Cart & Login */}
                <div className={classes.navSection}>
                    <button
                        className={`${classes.navLink} ${classes.cartButton}`}
                        onClick={() => navigate("/cart")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-cart-fill" viewBox="0 0 16 16">
                            <path
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg> Cart
                        {cartItemCount > 0 && (
                            <span className={classes.cartBadge}>
                {cartItemCount}
              </span>
                        )}
                    </button>

                    {/* Check login status */}
                    {user ? (
                        <Dropdown>
                            <Dropdown.Toggle as="div" className={classes.userDropdown}>
                                👤 {user.fullName}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={classes.dropdownMenu}>
                                <Dropdown.Item
                                    onClick={handleLogout}
                                    className={classes.dropdownItem}
                                >
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <button
                            className={classes.navLink}
                            onClick={() => navigate("/login")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg> Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;