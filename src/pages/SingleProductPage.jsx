import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AllProducts from '../services/AllProducts'
import { Rating } from '@mui/material'
import { FaCheck, FaHeart, FaShippingFast } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { saveInCartAction } from '../store/cartSlice';
import { saveAllFavorite } from '../store/favoriteSlice';

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
    <div className='min-h-screen bg-gray-50 py-8 lg:py-12'>
      
      {isLoading ? (
        <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8'>
          
          {/* Glavni kontejner kartice */}
          <div className='bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-10 flex flex-col lg:flex-row gap-10 lg:gap-16'>
            
            {/* LEVI DEO - Galerija slika */}
            <div className='w-full lg:w-1/2 flex flex-col'>
              
              {/* Glavna slika */}
              <div className='w-full h-[350px] sm:h-[450px] bg-gray-50 rounded-2xl flex items-center justify-center p-6 border border-gray-100 overflow-hidden relative'>
                <img 
                  src={singleProduct.images[currentImg]} 
                  alt={singleProduct.title} 
                  className='w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-110' 
                />
              </div>

              {/* Thumbnails (Male slike) - Skrolabilno na mobilnom */}
              <div className='flex items-center gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide'>
                {singleProduct.images.map((el, index) => {
                  return (
                    <div 
                      key={index}
                      onClick={() => handleImg(index)}
                      className={`flex-shrink-0 w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] rounded-xl flex items-center justify-center p-2 cursor-pointer transition-all duration-300 border-2 overflow-hidden bg-gray-50
                        ${currentImg === index ? 'border-mainBlue shadow-md' : 'border-transparent hover:border-gray-300'}`}
                    >
                      <img src={el} alt="thumbnail" className='w-full h-full object-contain mix-blend-multiply' />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* DESNI DEO - Informacije o proizvodu */}
            <div className='w-full lg:w-1/2 flex flex-col justify-center'>
              
              {/* Naslov i Rejting */}
              <h2 className='text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-3'>
                {singleProduct.title}
              </h2>
              
              <div className='flex items-center gap-4 mb-6'>
                <Rating 
                  name="read-only" 
                  value={singleProduct.rating} 
                  precision={0.5} 
                  readOnly 
                  size='medium'
                  sx={{ color: "#ffc107" }} 
                />
                <span className="text-gray-500 text-sm font-medium">({singleProduct.rating} Rating)</span>
              </div>

              {/* Cena */}
              <h5 className='text-4xl lg:text-5xl font-black text-mainBlue mb-8'>
                ${singleProduct.price}
              </h5>

              {/* Dostupnost i Stock (Zalihe) */}
              <div className='flex flex-wrap items-center gap-4 mb-6'>
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200'>
                  <span className='text-gray-600 font-semibold text-sm'>Availability:</span>
                  {singleProduct.stock > 0 ? (
                    <span className="flex items-center gap-1 text-green-600 font-bold text-sm"><FaCheck size={14} /> In Stock</span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600 font-bold text-sm"><IoClose size={16} /> Out of Stock</span>
                  )}
                </div>

                <div className="bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-bold border border-red-100">
                  🔥 Hurry up, only {singleProduct.stock} left!
                </div>
              </div>

              {/* Tagovi */}
              <div className='flex flex-col mb-8'>
                <p className='text-gray-500 font-semibold mb-2 text-sm uppercase tracking-wider'>Tags:</p>
                <ul className='flex flex-wrap gap-2'>
                  {singleProduct.tags.map((tag, index) => (
                    <li 
                      key={index} 
                      className='px-4 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 hover:text-gray-800 transition-colors cursor-pointer text-sm font-medium capitalize'
                    >
                      #{tag}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Akcije (Add to Cart / Favorite) */}
              <div className='flex items-center gap-4 mt-auto'>
                <Link 
                  to={'/cart'} 
                  className='flex-1 bg-mainBlue text-white font-bold text-lg rounded-xl px-6 py-4 flex items-center justify-center hover:bg-mainYellow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'
                  onClick={hangleCart}
                >
                  Add to Cart
                </Link>
                
                <Link 
                  to={'/favorite'} 
                  className='w-16 h-16 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-all duration-300 group'
                >
                  <FaHeart 
                    size={26} 
                    className={`transition-colors duration-300 ${isFavorite === parseInt(id) ? 'text-red-500' : 'text-gray-400 group-hover:text-red-400'}`}
                    onClick={() => dispach(saveAllFavorite(singleProduct))} 
                  />
                </Link>
              </div>

              {/* Informacije o dostavi */}
              <div className='flex items-center gap-3 bg-blue-50/50 border border-blue-100 p-4 rounded-xl mt-6'>
                <FaShippingFast size={24} className="text-mainBlue" />
                <span className="text-gray-700 font-medium">{singleProduct.shippingInformation}</span>
              </div>

            </div>
          </div>
        </div>
      ) : (
        // Moderni Loading Spinner
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-mainBlue"></div>
          <p className="mt-4 text-gray-500 font-medium text-lg">Loading product details...</p>
        </div>
      )}
    </div>
  )
}

export default SingleProductPage