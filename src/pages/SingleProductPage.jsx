import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AllProducts from '../services/AllProducts'
import { Rating } from '@mui/material'
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { saveInCartAction } from '../store/cartSlice';

function SingleProductPage() {
  const [singleProduct, setProduct] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [currentImg, setImg] = useState(0)

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

  function hangleCart(){
   dispach(saveInCartAction(singleProduct));
  }
  return (
    <div>

      {isLoading ? <div className='container mx-auto flex'>
        <div className='w-[50%]'>
          <img src={singleProduct.images[currentImg]} alt="" />
          <div className='flex items-center justify-center gap-[10px]'>
            {singleProduct.images.map((el, index) => {
              return <img src={el} alt="" key={index} className={currentImg === index ? 'w-[100px] h-[100px] border border-mainBlue rounded-lg p-2 cursor-pointer' : 'w-[100px] h-[100px] border border-gray-300 rounded-lg p-2 cursor-pointer'}
                onClick={() => handleImg(index)}
              />
            })}
          </div>
        </div>

        {/* right */}
        <div className='w-full lg:w-[50%] flex flex-col gap-[10px] mt-[20px]'>
          <h2 className='text-mainBlue text-[40px]'>{singleProduct.title}</h2>
          <h5 className='font-bold text-[20px]'>${singleProduct.price}</h5>
          <Rating name="read-only" defaultValue={singleProduct.rating} precision={0.5} size='large' sx={{
            color: "gold", fontWeight: "bold"

          }} />
          <div className='flex items-center gap-[4px]'>
            <span className='text-gray-700 font-semibold'>Avilability:</span>
            {singleProduct.stock > 0 ? <FaCheck color='green' size={32} /> : <IoClose color='red' size={32} />}
          </div>
          <p className='text-gray-700'>Hurry up <span className='text-red-900 font-bold'>{singleProduct.stock}</span> product left in stock</p>

          <ul className='flex flex-col gap-[5px]'>
            <p className='text-gray-800 font-bold'>Tags:</p>
            {singleProduct.tags.map((tag, index) => {
              return <li key={index} className=' w-[100px] p-2 bg-slate-600 text-white rounded-lg hover:bg-slate-800 hover:cursor-pointer'>#{tag}</li>
            })}
          </ul>

          <p className='text-gray-700 font-semibold'>Quantity:</p>
          <div className='flex items-center gap-[5px]'>
            <button className='bg-gray-400 text-gray-900 px-[12px] py-[6px] rounded-md hover:bg-gray-600 hover:text-white'>-</button>
            <button className='bg-gray-400 text-gray-900 px-[12px] py-[6px] rounded-md'>0</button>
            <button className='bg-gray-400 text-gray-900 px-[12px] py-[6px] rounded-md hover:bg-gray-600 hover:text-white'>+</button>
          </div>
          <div className='flex gap-[20px]'>
            <Link to={'/cart'} className='bg-mainYellow text-white font-semibold rounded-lg px-[24px] py-[12px] hover:bg-yellow-600 hover:text-black  '
             
              onClick={hangleCart}

            >Add to card</Link>
            <button className='bg-mainYellow text-white font-semibold rounded-full px-[15px] py-[12px] hover:bg-yellow-600 hover:text-red-600  '><FaRegHeart /></button>
          </div>

          <div>
            <FaShippingFast />
            <span>{singleProduct.shippingInformation}</span>
          </div>
        </div>
      </div> : <div>Loading</div>
      }
    </div>
  )
}

export default SingleProductPage