import React from "react";
import Navbar from "../components/ui/Navbar";
import Home from "../pages/Home/Home";
import { Outlet } from "react-router";
import Footer from "../components/ui/Footer";

const MainLayOut = () => {
  return (
    <div className=" relative">
      <nav className=" absolute  w-full fixed z-30">
        <Navbar></Navbar>
      </nav>
      <div className=" h-[40px]"></div>
      <div>
        <Outlet></Outlet>
      </div>

      <footer>
        <Footer></Footer>
      </footer>

    </div>
  );
};

export default MainLayOut;
