import React from "react";
import Navbar from "./components/Navbar/Navbar";

const page = () => {
  return (
    <>
      <div className="h-screen w-screen flex flex-col bg-white text-black">
        <Navbar />
      </div>
    </>
  );
};

export default page;
