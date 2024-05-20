import React from "react";
import data from "../../json/sample.json";

const Card = () => {
  return (
    <>
      <div className="grid xl:grid-cols-3 gap-10 lg:grid-cols-2">
        {data.map((datas) => (
          <div className="w-96 rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg hover:cursor-pointer">
            <div className="bg-white p-7 rounded-md">
              <h1 className="font-bold text-xl mb-2">{datas.title}</h1>
              <p>{datas.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
