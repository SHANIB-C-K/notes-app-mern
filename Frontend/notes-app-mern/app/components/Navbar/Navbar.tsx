import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  const [username] = useState(localStorage.getItem("username"));
  const router = useRouter();

  const LogoutFunction = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("login");
    window.location.reload();
  };

  return (
    <>
      <div className="h-20 w-full bg-white shadow-md flex items-center justify-between fixed">
        <h1 className="ml-10 text-2xl font-extrabold">Notes App</h1>
        <div className="flex gap-4">
          <p className="sm:block hidden">
            Hello, <span className="font-bold">{username}</span>
          </p>
          <IoLogOut
            className="mr-10 text-2xl text-red-600 hover:scale-110 duration-300 hover:shadow-sm cursor-pointer"
            onClick={LogoutFunction}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
