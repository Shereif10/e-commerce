import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  const { isLoading, isFetching, data, isError } = useQuery(
    "categories",
    getCategories
  );

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 7,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    autoplay: true,
  };

  return (
    <>
      <div className="container">
        <h4 className="pt-5">Shop popular categories</h4>
        <div className="pb-5">
          <Slider {...settings}>
            {data?.data.data.map((cat) => (
              <div key={cat._id}>
                <img className="w-100" height={200} src={cat.image} alt="category img" />
                <p className=" mb-0">{cat.name}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
