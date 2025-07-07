import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AllProducts from '../services/AllProducts'

function SingleProductPage() {
   const [singleProduct , setProduct] = useState({});
   const [isLoading , setLoading] = useState(false);
   const [currentImg , setImg] = useState(0)
    let {id} = useParams();

    useEffect(()=>{
        AllProducts.getSingleProduct(id)
            .then((res) => {
                setProduct(res.data)
                setLoading(true)
            })
            .catch(err => console.log(err))
    },[])
    function handleImg(index){
       setImg(index)
    }
  return (
    <div>

        {isLoading ? <div className='container mx-auto flex'>
                  <div className='w-[50%]'>
                    <img src={singleProduct.images[currentImg]} alt="" />
                    <div className='flex items-center justify-center gap-[10px]'>
                        {singleProduct.images.map((el , index) =>{
                            return <img src={el} alt="" key={index} className={currentImg === index ? 'w-[100px] h-[100px] border border-mainBlue rounded-lg p-2 cursor-pointer' :'w-[100px] h-[100px] border border-gray-300 rounded-lg p-2 cursor-pointer'}
                                      onClick={()=> handleImg(index)}
                                    />
                        })}
                    </div>
                  </div>
                  <div className='w-[50%]'>
                    content
                  </div>
        </div> : <div>Loading</div>
        }
    </div>
  )
}

export default SingleProductPage