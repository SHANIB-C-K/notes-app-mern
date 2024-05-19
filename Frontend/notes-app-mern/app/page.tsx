import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { FaPlus } from "react-icons/fa";
import './components/Navbar/Navbar.css'

const page = () => {
  return (
    <>
      <div className="h-screen w-screen flex flex-col bg-white text-black overflow-x-hidden">
        <Navbar />
        <div className="flex flex-col h-full w-full justify-end items-end">
          <button className="plus-btn bg-green-300 before:bg-green-600">
            <FaPlus />
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
