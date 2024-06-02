"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

const Update = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const router = useRouter();

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axios.put("http://localhost:8000/update/" + id, {
      title,
      paragraph,
    });
    if (response.data == "updated successfully") {
      router.push("/");
    }
  };

  //   update data
  useEffect(() => {
    axios.get("http://localhost:8000/updateUser/" + id).then((res) => {
      // setTitle(res.data);
      setTitle(res.data.title);
      setParagraph(res.data.paragraph);
    });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-0 m- sm:m-0 -rotate-6 rounded-3xl"></div>
          <div className="relative px-4 m-10 py-10 bg-white shadow-lg rounded-3xl sm:m-0 sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Add Notes</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="title"
                      name="title"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Title
                    </label>
                  </div>
                  <div className="relative">
                    <textarea
                      autoComplete="off"
                      id="paragraph"
                      name="paragraph"
                      className="peer placeholder-transparent h-24 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 resize-none"
                      placeholder="paragraph"
                      onChange={(e) => setParagraph(e.target.value)}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Paragraph
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                      onClick={HandleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
