import React, { useEffect } from 'react'
import AllProducts from '../services/AllProducts'
import { useDispatch, useSelector } from 'react-redux'
import { saveAllProductsActions } from '../store/productsSlice';
import CardComponent from '../components/CardComponent';

function HomePage() {
  const dispatch = useDispatch();
  const {allProducts,isLoading} = useSelector((state) => state.productsStore) 
  useEffect(()=>{
     AllProducts.getAllProducts()
        .then((res) =>dispatch(saveAllProductsActions(res.data.products)))
        .catch((err) => console.log(err))
  },[])

  return (
    <div className='container mx-auto'>
      <div>
        <span>List/Grid</span>
      </div>
     {isLoading ?(
      <div className='flex flex-wrap items-center justify-center gap-4'>
        {allProducts.map((product) =>{
          return (
            <CardComponent key={product.id} product={product}/>
          )
        })}
      </div>
     ): <div>Loading</div>}
       
    </div>
  )
}

export default HomePage