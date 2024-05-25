"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState([]);
  const router = useRouter();

  const GotoRegisterOrLogin = () => {
    if (login == true) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

  const HandleSubmit = (e: any) => {
    e.preventDefault();
    axios.post("http://localhost:8000/auth", {
      email,
      password,
    });
  };

  const HandleSubmitLogin = (e: any) => {
    e.preventDefault();
    axios.post("http://localhost:8000/auth", {
      email,
      password,
    });

    return (
      <>
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transhtmlForm -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold">
                    {login ? "Register" : "Login"}
                  </h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="password"
                        name="password"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      {login ? (
                        <button
                          className="bg-cyan-500 text-white rounded-md px-2 py-1"
                          onClick={HandleSubmit}
                        >
                          Submit
                        </button>
                      ) : (
                        <button
                          className="bg-cyan-500 text-white rounded-md px-2 py-1"
                          onClick={() => HandleSubmitLogin}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                  {login ? (
                    <p>
                      You are already a account{" "}
                      <a
                        href="#"
                        className="text-blue-700"
                        onClick={GotoRegisterOrLogin}
                      >
                        login
                      </a>
                    </p>
                  ) : (
                    <p>
                      You have not a account{" "}
                      <a
                        href="#"
                        className="text-blue-700"
                        onClick={GotoRegisterOrLogin}
                      >
                        register
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
};

export default page;
