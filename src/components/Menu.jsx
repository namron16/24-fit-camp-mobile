import React from "react";
import { NavLink } from "react-router-dom";
import "./menu.css";

const Menu = () => {
  return (
    <div className="main-menu">
      <NavLink
        to={"."}
        className={({ isActive }) => (isActive ? "active" : "")}
        end
      >
        <i className="fa-solid fa-chart-simple"></i>
        <span>Overview</span>
      </NavLink>
      <NavLink
        to={"gym"}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <i className="fa-solid fa-dumbbell"></i>
        <span>Gym</span>
      </NavLink>
      <NavLink
        to={"profile"}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <i className="fa-regular fa-circle-user"></i>
        <span>Profile</span>
      </NavLink>
      <NavLink
        to={"notifications"}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <i className="fa-regular fa-bell"></i>

        <span>Notifications</span>
      </NavLink>
      <NavLink
        to={"settings"}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <i className="fa-solid fa-gear"></i>
        <span>Settings</span>
      </NavLink>
    </div>
  );
};

export default Menu;
