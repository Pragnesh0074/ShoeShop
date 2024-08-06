import Button from "../../../Components/Button";
import { UserContext } from "../../../App";
import React, { useContext } from "react";
import axios from "axios";

function ProductTile(props) {
  const userData = useContext(UserContext);

  const addToCart = async () => {
    const userId = userData._id;
    const productId = props.id;
    const quantity = 1;
    try {
      const { data } = await axios.post(
        "http://localhost:4000/cart",
        {
          userId,
          productId,
          quantity,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        alert(message);
      } else {
        alert(message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex justify-center mx-5 my-2 sm:mx-10 sm:my-4 lg:mx-20 lg:my-6 shadow-xl rounded-3xl shadow-gray-500">
      <div className="flex flex-col p-5 sm:p-7 lg:p-10 items-center align-middle justify-center">
        <img
          className="max-h-[150px] max-w-[150px] sm:max-h-[200px] sm:max-w-[200px] lg:max-h-[250px] lg:max-w-[250px] rounded-lg"
          src={props.thumbnail || "path/to/default/image.jpg"}
          alt={props.name}
        />
        <div className="mt-3 sm:mt-5 lg:mt-7" />
        <p className="text-black text-xl sm:text-2xl lg:text-3xl flex justify-center">
          {props.name}
        </p>
        <p className="text-black text-xl sm:text-2xl lg:text-3xl flex justify-center">
          {props.desc}
        </p>
        <p className="text-black text-xl sm:text-2xl lg:text-3xl flex justify-center">
          ${props.price}
        </p>
        <Button text="Add To Cart" clickFun={addToCart} />
      </div>
    </div>
  );
}

export default ProductTile;
