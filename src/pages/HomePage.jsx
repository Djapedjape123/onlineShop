import React, { useEffect, useState } from 'react'
import AllProducts from '../services/AllProducts'
import { useDispatch, useSelector } from 'react-redux'
import { saveAllProductsActions } from '../store/productsSlice';
import CardComponent from '../components/CardComponent';
//icons
import { FaList } from "react-icons/fa";
import { MdGridOn } from "react-icons/md";

function HomePage() {
  const dispatch = useDispatch();
  const { allProducts, isLoading, selectCategory, searchProducts } = useSelector((state) => state.productsStore) 
  const [isGrid, setIsGrid] = useState('gridView')
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (searchProducts) {
        AllProducts.getSearchProduct(searchProducts)
        .then((res) => {
          dispatch(saveAllProductsActions(res.data.products))
        })
        .catch((err) => console.log(err))
    }
  }, [searchProducts]) 

  useEffect(() => {
    if (selectCategory) {
      AllProducts.getAllProductsByCategort(selectCategory)
        .then((res) => {
          dispatch(saveAllProductsActions(res.data.products))
        })
        .catch((err) => console.log(err))
    } else {
      AllProducts.getAllProducts(limit)
        .then((res) => {
          dispatch(saveAllProductsActions(res.data.products))
        })
        .catch((err) => console.log(err))
    }
  }, [selectCategory, limit])
  
  return (
    <div className='max-w-[1400px] className="bg-gradient-to-t from-slate-600 to-white" mx-auto px-4 py-6 sm:py-8'>
      
      {/* Dugmici za promenu prikaza (Grid / List) */}
      <div className='flex items-center justify-end mb-6'>
        <div className="flex items-center bg-gray-200 p-1 rounded-lg border border-gray-200">
          <button 
            onClick={() => setIsGrid('listView')} 
            className={`p-2 rounded-md transition-all duration-300 flex items-center justify-center ${isGrid === 'listView' ? 'bg-white shadow text-mainBlue' : 'text-gray-400 hover:text-gray-600'}`}
            title="List view"
          >
            <FaList size={20} />
          </button>
          <button 
            onClick={() => setIsGrid('gridView')} 
            className={`p-2 rounded-md transition-all duration-300 flex items-center justify-center ${isGrid === 'gridView' ? 'bg-white shadow text-mainBlue' : 'text-gray-400 hover:text-gray-600'}`}
            title="Grid view"
          >
            <MdGridOn size={22} />
          </button>
        </div>
      </div>

      {/* Prikaz proizvoda ili Loading */}
      {isLoading ? (
        <div className={
          isGrid === 'gridView' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' // Moderni Grid
            : 'flex flex-col gap-6' // Moderni List
        }>
          {allProducts.map((product) => {
            return (
              <CardComponent key={product.id} product={product} setIsGrid={setIsGrid} isGrid={isGrid}/>
            )
          })}
        </div>
      ) : (
        // Moderan Loading Spinner umesto obicnog teksta
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-mainBlue"></div>
          <p className="mt-4 text-gray-500 font-medium">Učitavanje proizvoda...</p>
        </div>
      )}

      {/* Dugme za jos proizvoda */}
      {!selectCategory && (
        <div className='mt-10 flex items-center justify-center'>
          <button 
            className='w-full sm:w-auto bg-mainBlue text-white font-semibold px-8 py-3 rounded-full hover:bg-mainYellow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'
            onClick={() => setLimit(limit + 5)}
          >
            Load more products
          </button>
        </div>
      )}

    </div>
  )
}

export default HomePage