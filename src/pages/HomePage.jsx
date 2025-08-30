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
  const {allProducts,isLoading ,selectCategory,searchProducts} = useSelector((state) => state.productsStore) 
  const [isGrid ,setIsGrid] = useState('gridView')
  const [limit , setLimit] = useState(10);


  useEffect(()=>{
    if(searchProducts){
        AllProducts.getSearchProduct(searchProducts)
        .then((res) =>{
          dispatch(saveAllProductsActions(res.data.products))
        })
        .catch((err) => console.log(err))
    }
     
  },[searchProducts]) 

  useEffect(()=>{
    if(selectCategory){
      AllProducts.getAllProductsByCategort(selectCategory)
        .then((res) =>{
          dispatch(saveAllProductsActions(res.data.products))
        })
        .catch((err) => console.log(err))
    }else{
      AllProducts.getAllProducts(limit)
        .then((res) =>{
          dispatch(saveAllProductsActions(res.data.products))
        })
        .catch((err) => console.log(err))
    }
     
  },[selectCategory,limit])
  

  return (
    <div className='container mx-auto'>
      <div className='flex items-center justify-end p-4 gap-2'>
        <FaList size={32} color={isGrid ==='listView'?'red':''} onClick={()=> setIsGrid('listView')} className={isGrid ==='listView' ? 'bg-mainYellow p-2 cursor-pointer rounded-md' :'cursor-pointer'}/>
        <MdGridOn size={32} color={isGrid ==='gridView'?'red':''} onClick={()=> setIsGrid('gridView')} className={isGrid === 'gridView' ? 'bg-mainYellow p-2 cursor-pointer rounded-md' :'cursor-pointer'}/>
      </div>
     {isLoading ?(
      <div className={isGrid ==='gridView' ? 'flex flex-wrap items-center justify-center gap-[10px]':'flex flex-col justify-center items-center gap-[15px]'}>
        {allProducts.map((product) =>{
          return (
            <CardComponent key={product.id} product={product} setIsGrid={setIsGrid} isGrid={isGrid}/>
          )
        })}
      </div>
     ): <div>Loading</div>}
       {!selectCategory && (<div className='mt-3 flex items-center justify-center'>
          <button className='bg-mainBlue text-white px-[22px] py-[6px] my-[20px] mx-[7px] rounded-lg hover:bg-mainYellow transition durection-all'
           onClick={() => setLimit(limit + 5)}
          >More products...</button>
       </div>)}
    </div>
  )
}

export default HomePage