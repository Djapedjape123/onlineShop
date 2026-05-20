import { Rating } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function CardComponent({ product, setIsGrid, isGrid }) {

  // ==========================
  // LIST VIEW (Kada se klikne na listu)
  // ==========================
  if (isGrid === 'listView') {
    return (
      <div className="flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 p-4 gap-4 sm:gap-6 w-full">

        {/* Slika */}
        <div className="w-full sm:w-48 h-48 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden p-2">
          {/* Dodajemo 'group' i pravimo Link da bude flex kontejner za savrseno centriranje */}
          <Link
            to={`/singleProduct/${product.id}`}
            className="group w-full h-full flex items-center justify-center"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Sadržaj */}
        <div className="flex flex-col flex-1 w-full text-center sm:text-left">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{product.title}</h3>

          <div className="hidden sm:block mb-2">
            <Rating name="read-only" value={product.rating} precision={0.5} readOnly size="small" />
          </div>

          <h4 className="text-2xl font-extrabold text-mainBlue my-2">{product.price}$</h4>
        </div>

        {/* Akcija (Dugme) */}
        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <Link to={`/singleProduct/${product.id}`} className="block text-center bg-mainBlue text-white px-8 py-3 rounded-full font-semibold hover:bg-mainYellow hover:shadow-lg transition-all duration-300 whitespace-nowrap">
            View more
          </Link>
        </div>
      </div>
    )
  }

  // ==========================
  // GRID VIEW (Podrazumevani mrežasti prikaz)
  // ==========================
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden group h-full">

      {/* Slika kontejner */}
      <div className="w-full h-48 bg-gray-50 flex items-center justify-center p-4 overflow-hidden relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Sadržaj kontejner */}
      <div className="flex flex-col flex-1 p-5">

        {/* Naslov ograničen na 2 reda */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1 min-h-[56px]" title={product.title}>
          {product.title}
        </h3>

        <div className="mb-2 flex items-center">
          <Rating name="read-only" value={product.rating} precision={0.5} readOnly size="small" />
        </div>

        {/* mt-auto gura cenu i dugme na samo dno */}
        <h4 className="text-xl font-extrabold text-mainBlue mt-auto mb-4">{product.price}$</h4>

        <Link to={`/singleProduct/${product.id}`} className="block w-full text-center bg-mainBlue text-white py-2.5 rounded-full font-semibold hover:bg-mainYellow hover:shadow-lg transition-all duration-300">
          View more
        </Link>
      </div>

    </div>
  )
}

export default CardComponent