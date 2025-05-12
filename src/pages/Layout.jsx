import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Menu from "../components/Menu";
import "./layout.css";
import { ThemeContext } from "../context/ThemeContext";
import { useTheme } from "../utils/useTheme";
const Layout = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className="main" id={theme}>
        <Header />
        <div className="content">
          <Outlet />
        </div>
        <Menu />
      </main>
    </ThemeContext.Provider>
  );
};

export default Layout;
