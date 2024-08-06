import React from "react";
import HeroComp from "./HeroComp";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import ProductList from "../ProductPage/ProductList";
import "flowbite";

function UserHomePage() {
  let navigate = useNavigate();

  function clickFun() {
    navigate("/products");
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <HeroComp />

        <section className="my-10 sm:my-16">
          <h2 className="text-black text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            Top Products
          </h2>
          <div className="mt-5 sm:mt-8">
            <ProductList />
          </div>
        </section>

        <section className="my-10 sm:my-16 md:my-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
            Ready To Elevate Your Style?
          </h2>
          <p className="text-xl sm:text-2xl mb-5 sm:mb-6">
            Choose From Thousands of Available Products
          </p>
          <div className="flex justify-center">
            <Button text="Browse More Products" clickFun={clickFun} />
          </div>
        </section>
      </div>
    </>
  );
}

export default UserHomePage;
