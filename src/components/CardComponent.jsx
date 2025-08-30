import { Rating } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function CardComponent({ product, setIsGrid, isGrid }) {
  return (
    <div className={isGrid === 'gridView' ? 'w-[300px] border border-gray-500 rounded-lg flex flex-col items-center justify-center p-5 hover:shadow-mainBlue shadow-lg transition duration-300 hover:scale-105' :
      'w-full flex items-center justify-between px-[10px] border border-mainBlue'
    }>
      <div>
        <img src={product.thumbnail} alt="" className='w-[100px] h-[100px] lg:w-full lg:h-[200px] object-cover' />
      </div>
      <h3>{product.title}</h3>

      <h4>{product.price}$</h4>
      {isGrid === 'listView' ? (
        <div className="hidden lg:block">
          <Rating
            name="half-rating"
            defaultValue={product.rating}
            precision={0.5}
          />
        </div>
      ) : (
        <Rating
          name="half-rating"
          defaultValue={product.rating}
          precision={0.5}
        />
      )}
      <Link to={`/singleProduct/${product.id}`} className='bg-mainBlue text-white p-2 my-[20px] mx-[7px] rounded-lg hover:bg-mainYellow transition durection-all'>View more</Link>
    </div>
  )
}

export default CardComponent