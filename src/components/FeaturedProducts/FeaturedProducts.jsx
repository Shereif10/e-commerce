import { render } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {

  function getFeaturedProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }


  const {isLoading,isFetching,data,isError} = useQuery('products',getFeaturedProducts);


  return (
    <>
      <div className="container">
        <div className="row">
          {isLoading ? (
             <div className="d-flex justify-content-center align-content-center">
              <RotatingLines
              visible={true}
              height="96"
              width="50%"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />
             </div>
          ) : (
            data?.data.data.map((product) => (
              <div key={product._id} className="col-md-2">
                <div className="product p-3 cursor-pointer">
                  <Link to={`productDetails/${product._id}`}>
                  <img className="w-100" src={product.imageCover} alt="product image" />
                  <p className="text-main mb-1">{product.category.name}</p>
                  <p>{product.title.split(" ").slice(0,2).join(" ")}</p>
                  <div className="product-box d-flex justify-content-between align-items-center">
                    <span>{product.price} EGP</span>
                    <span><i className="fa-solid fa-star rating-color"></i> {product.ratingsAverage}</span>
                  </div>
                  </Link>
                  <button className="btn bg-main mt-2 text-white">Add To Cart</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
