"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../components/loading/page";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
    } else {
      const res = await axios.post("http://localhost:8000/register", {
        email,
        password,
      });
      if (res.data == "email already exist") {
        setError("Email already exist");
      } else if (res.data == "registered successfully") {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    const logedin = localStorage.getItem("login");
    if (logedin === "true") {
      router.push("/");
    } else {
      router.push("/register");
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transhtmlForm m-10 sm:m-0 -skew-y-0 -rotate-6 rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg m-10 sm:m-0 rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold">Register</h1>
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
                      <button
                        className="bg-cyan-500 text-white rounded-md px-2 py-1"
                        onClick={HandleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>

                  <p>
                    You are already a account{" "}
                    <a href="login" className="text-blue-700">
                      login
                    </a>
                  </p>
                </div>
              </div>
              <div className="text-red-600 mt-5">{error}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
