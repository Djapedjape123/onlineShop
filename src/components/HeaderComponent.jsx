import React from 'react'
//icons
import { IoClose } from "react-icons/io5";
import { CiLocationOn , CiDeliveryTruck } from "react-icons/ci"
function HeaderComponent({setTogle}) {
  return (
    <div className='flex flex-col items-center justify-between lg:flex-row  container mx-auto h-[80px]'>

        <p>Need help? Call us: <a className='text-blue-500' href="tel:+(+381) 612123525">(+381) 612123525</a> </p>

        <div className='flex items-center gap-[10px]'>
          <div className='flex items-center gap-[5px]'>
            <CiLocationOn />
            <span>Our Store</span>
          </div>
          <div className='flex items-center gap-[5px]'>
             <CiDeliveryTruck />
             <span>Truck your order</span> 
             
          </div>
          <IoClose color='red' className='cursor-pointer' onClick={()=> {
            setTogle(false)
          }}/>

        </div>
    </div>
  )
}

export default HeaderComponent