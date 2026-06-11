import React from "react";
import Navbar from "../ui/Navbar";
import { Outlet } from "react-router";
import Footer from "../ui/Footer";
import log from "/hdasadh.jpg";

const RenderOutlet = () => {
  return (
    <div>
      <nav className=" absolute  w-full fixed z-30">
        <Navbar></Navbar>
      </nav>
      <div className=" h-[40px]"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-screen px-6 md:px-16 py-12 bg-gray-50">
        <div className="flex flex-col justify-center">
          <Outlet />
        </div>

        <div className=" hidden md:block">
          <div className="flex justify-center items-center h-[calc(100vh-4rem-4rem)] px-4">
            <img
              src={log}
              alt="Illustration"
              className="w-full h-full object-contain "
            />
          </div>
        </div>
      </div>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RenderOutlet;
