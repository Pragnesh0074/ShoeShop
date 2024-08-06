import React from 'react';
import Button from '../../Components/Button';
import axios from 'axios';

function ProductTile(props) {

  const handleDelete = async () => {
    const productId = props.id;
    try {
      const { data } = await axios.delete(`http://localhost:4000/product/${productId}`);
      const { success, message } = data;
      alert(message);
      props.fetch();
    } catch (error) {
      alert(error);
    }
  }

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
      <Button text="Delete Product" clickFun={handleDelete} />
    </div>
  </div>
  );
}

export default ProductTile;