import React from "react";
import logo from "../assets/24-fitcamp-logo.png";
import './header.css'
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="24 fit camp logo" />
        <span>24-Fit Camp</span>
      </div>
      <nav>
        <div className="user">
          <span>Hey, Member</span>
          <i className="fa-solid fa-circle-user member-icon"></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
