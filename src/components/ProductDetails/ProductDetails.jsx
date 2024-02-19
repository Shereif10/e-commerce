import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {


    const {id} = useParams()

    function getProductDetails(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      }
    
    
      const {isLoading,isFetching,data,isError} = useQuery('productDetails',getProductDetails);

  return (
    <>
    <div className="container">
        <div className="row my-5 justify-content-between align-items-center">
            <div className="col-md-3">
                <img src={data?.data.data.imageCover} alt="item image" className='w-100' />
            </div>
            <div className="col-md-9 px-4">
                <h4>{data?.data.data.title}</h4>
                <p className='my-3 px-2 text-muted'>{data?.data.data.description}</p>
                <p>{data?.data.data.category.name}</p>
                <div className="box d-flex justify-content-between align-items-center">
                    <span>{data?.data.data.price} EGP</span>
                    <span><i className='fa-solid fa-star rating-color'></i>{data?.data.data.ratingsAverage}</span>
                </div>
                <button className='btn form-control text-white bg-main mt-3'>+ Add To Cart</button>

            </div>
        </div>
    </div>
    </>
  )
}
