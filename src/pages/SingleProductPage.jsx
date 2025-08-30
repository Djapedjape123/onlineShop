import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AllProducts from '../services/AllProducts'
import { Rating } from '@mui/material'
import { FaCheck, FaHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { saveInCartAction } from '../store/cartSlice';
import { saveAllFavorite } from '../store/favoriteSlice';
import { useSelector } from 'react-redux';

function SingleProductPage() {
  const [singleProduct, setProduct] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [currentImg, setImg] = useState(0);
  const [isFavorite, setFavorite] = useState(null);

  const { allFavorite } = useSelector((state) => state.favoriteStore);

  let { id } = useParams();

  const dispach = useDispatch();

  useEffect(() => {
    AllProducts.getSingleProduct(id)
      .then((res) => {
        setProduct(res.data)
        setLoading(true)
      })
      .catch(err => console.log(err))
  }, [])
  function handleImg(index) {
    setImg(index)
  };

  function hangleCart() {
    dispach(saveInCartAction(singleProduct));
  };
  useEffect(() => {
    if (allFavorite.length > 0) {
      allFavorite.find((item) => {
        if (item.id === singleProduct.id) {
          setFavorite(item.id)
        }
      })
    } else {
      setFavorite(null)
    }

  }, [allFavorite])
  return (
    <div>

      {isLoading ? <div className='container mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center'>
        {/* Left */}
        <div className='w-full lg:w-[50%] flex flex-col items-center mb-8 lg:mb-0'>
          <img src={singleProduct.images[currentImg]} alt="" className='max-w-full h-auto' />
          <div className='flex flex-wrap items-center justify-center gap-[10px] mt-4'>
            {singleProduct.images.map((el, index) => {
              return <img src={el} alt="" key={index} className={currentImg === index ? 'w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] border-2 border-mainBlue rounded-lg p-1 cursor-pointer' : 'w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] border border-gray-300 rounded-lg p-1 cursor-pointer'}
                onClick={() => handleImg(index)}
              />
            })}
          </div>
        </div>

        {/* Right */}
        <div className='w-full lg:w-[50%] flex flex-col gap-[10px] mt-0 lg:mt-[20px] px-4 lg:px-0 text-center lg:text-left'>
          <h2 className='text-mainBlue text-2xl lg:text-[40px]'>{singleProduct.title}</h2>
          <h5 className='font-bold text-xl lg:text-[20px]'>${singleProduct.price}</h5>
          <div className='flex justify-center lg:justify-start'>
            <Rating name="read-only" defaultValue={singleProduct.rating} precision={0.5} size='large' sx={{
              color: "gold", fontWeight: "bold"
            }} />
          </div>
          <div className='flex items-center justify-center lg:justify-start gap-[4px]'>
            <span className='text-gray-700 font-semibold'>Availability:</span>
            {singleProduct.stock > 0 ? <FaCheck color='green' size={24} /> : <IoClose color='red' size={24} />}
          </div>

          <p className='text-gray-700'>Hurry up <span className='text-red-900 font-bold'>{singleProduct.stock}</span> product left in stock</p>

          <div className='flex flex-col items-center lg:items-start'>
            <p className='text-gray-800 font-bold'>Tags:</p>
            <ul className='flex flex-wrap justify-center lg:justify-start gap-[5px] mt-2'>
              {singleProduct.tags.map((tag, index) => {
                return <li key={index} className='p-2 bg-slate-600 text-white rounded-lg hover:bg-slate-800 hover:cursor-pointer text-sm'>#{tag}</li>
              })}
            </ul>
          </div>

          <div className='flex justify-center lg:justify-start gap-[20px] mt-4'>
            <Link to={'/cart'} className='bg-mainYellow text-white font-semibold rounded-lg px-6 py-3 hover:bg-yellow-600 hover:text-black'

              onClick={hangleCart}

            >Add to cart</Link>
            <Link to={'/favorite'} className='bg-mainYellow font-semibold rounded-full w-12 h-12 flex items-center justify-center hover:bg-yellow-600'

            >
              {isFavorite === parseInt(id) ? <FaHeart size={24} color='red' onClick={() => dispach(saveAllFavorite(singleProduct))} /> : <FaHeart size={24} onClick={() => dispach(saveAllFavorite(singleProduct))} />}
            </Link>
          </div>

          <div className='flex items-center justify-center lg:justify-start gap-2 mt-4'>
            <FaShippingFast />
            <span>{singleProduct.shippingInformation}</span>
          </div>
        </div>
      </div> : <div className="flex justify-center items-center h-64">Loading...</div>
      }
    </div>
  )
}

export default SingleProductPage