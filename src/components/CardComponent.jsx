import { Rating } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function CardComponent({product}) {
  return (
    <div className='w-[300px] border border-gray-500 rounded-lg flex flex-col items-center justify-center p-5'> 
        <div>
            <img src={product.thumbnail} alt="" className='w-full h-[200px] object-cover'/>
        </div>
        <h3>{product.title}</h3>
        
        <h4>{product.price}$</h4>
        <Rating name="half-rating" defaultValue={product.rating} precision={0.5} />
        <Link to={`/singleProduct/${product.id}`} className='bg-mainBlue text-white p-2 my-[20px] rounded-lg hover:bg-mainYellow transition durection-all'>View more</Link>
    </div>
  )
}

export default CardComponent