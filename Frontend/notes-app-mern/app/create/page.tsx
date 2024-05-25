"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const create = () => {
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const router = useRouter();

  const HandleSubmit = (e: any) => {
    e.preventDefault();
    console.log(title);
    console.log(paragraph);
    axios.post("http://localhost:8000/create/", {
      title: title,
      paragraph: paragraph,
    });
    router.push("/");
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <form action="#" method="post">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter paragraph"
            name="paragraph"
            value={paragraph}
            onChange={(e) => {
              setParagraph(e.target.value);
            }}
          />
          <input type="submit" onClick={HandleSubmit} />
        </form>
      </div>
    </>
  );
};

export default create;
