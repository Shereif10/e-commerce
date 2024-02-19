import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { userToken } from "../../Context/userToken";

export default function Navbar() {
  let navigate = useNavigate();

  let { isLogin, setIsLogin } = useContext(userToken);

  function signOut() {
    localStorage.removeItem("userToken");
    setIsLogin(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Fresh Cart Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>

              {isLogin ? (
                <li className="nav-item">
                  <Link to="cart" className="nav-link">
                    Cart
                  </Link>
                </li>
              ) : (
                ""
              )}

              <li className="nav-item">
                <Link to="products" className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="categories" className="nav-link">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link to="brands" className="nav-link">
                  Brands
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center justify-content-center">
                <i className="fa-brands fa-instagram mx-2"></i>
                <i className="fa-brands fa-facebook mx-2"></i>
                <i className="fa-brands fa-tiktok mx-2"></i>
                <i className="fa-brands fa-twitter mx-2"></i>
                <i className="fa-brands fa-linkedin mx-2"></i>
                <i className="fa-brands fa-youtube mx-2"></i>
              </li>

              {!isLogin ? (
                <>
                  <li className="nav-item">
                    <Link to="register" className="nav-link">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <span className="nav-link cursor-pointer" onClick={signOut}>
                    Sign Out
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
