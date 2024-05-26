import React, { useEffect, useState } from "react";
import data from "../../json/sample.json";
import axios from "axios";

const Card = () => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((result) => setDatas(result.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="grid xl:grid-cols-3 gap-10 lg:grid-cols-2">
        {datas.map(({title, paragraph, _id}) => (
          <div
          key={_id}
            className="w-96 rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg hover:cursor-pointer hover:scale-105 duration-300"
            title="Your note"
          >
            <div className="bg-white p-7 rounded-md">
              <h1 className="font-bold text-xl mb-2">{title}</h1>
              <p className="overflow-hidden">{paragraph}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
