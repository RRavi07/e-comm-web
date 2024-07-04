import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div style={{ position: "fixed", top: "0px", zIndex: "3", width: "100%" }} >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <h1 className="navbar-brand">Shopping.com</h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/product">Product</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/order">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/address">Address</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/CheckOut">CheckOut</Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile <i className="fa-solid fa-user"></i></Link>
              </li>
            </ul> 
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
