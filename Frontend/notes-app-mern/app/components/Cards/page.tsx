import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";

const Card = () => {
  const [datas, setDatas] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    axios
      .get("http://localhost:8000/")
      .then((result) => {
        const data = result.data.filter(
          (item: any) => item.username === username
        );
        setDatas(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const HandleDelete = async (_id: any) => {
    const response = await axios.delete("http://localhost:8000/delete/" + _id);
    if (response.data === "deleted successfully") {
      router.push("/deleting");
    }
  };

  return (
    <>
      <div className="grid xl:grid-cols-3 gap-10 lg:grid-cols-2">
        {datas.map(({ title, paragraph, _id }) => (
          <div
            key={_id}
            className="w-96 rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg hover:cursor-pointer hover:scale-105 duration-300"
            title="Your note"
          >
            <div className="bg-white p-7 rounded-md">
              <BiTrash
                className="text-red-700 font-extrabold text-xl flex w-[650px] justify-end"
                onClick={(e) => HandleDelete(_id)}
              />
              <Link href={`/update/${_id}`}>
                <h1 className="font-bold text-xl mb-2">{title}</h1>
                <p className="overflow-hidden">{paragraph}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
