import React from 'react'
//icons
import { IoClose } from "react-icons/io5";
import { CiLocationOn , CiDeliveryTruck } from "react-icons/ci"

function HeaderComponent({ setTogle }) {
  return (
    <div className='bg-gray-50 border-b border-gray-200 w-full'>
      <div className='max-w-[1400px] mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 text-xs sm:text-sm text-gray-600'>
        
        {/* Levi deo - Kontakt */}
        <p className="text-center sm:text-left">
          Need help? Call us: <a className='text-blue-600 font-semibold hover:text-blue-800 transition-colors' href="tel:+(+381) 612123525">(+381) 612123525</a> 
        </p>

        {/* Desni deo - Linkovi i Zatvaranje */}
        <div className='flex items-center gap-4 sm:gap-6'>
          
          <div className='flex items-center gap-1.5 hover:text-blue-600 cursor-pointer transition-colors group'>
            <CiLocationOn size={18} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Our Store</span>
          </div>
          
          <div className='flex items-center gap-1.5 hover:text-blue-600 cursor-pointer transition-colors group'>
             <CiDeliveryTruck size={18} className="group-hover:scale-110 transition-transform" />
             <span>Track your order</span> 
          </div>
          
          {/* Dugme za zatvaranje sa lepim hover efektom */}
          <button 
            onClick={() => setTogle(false)}
            className='ml-2 sm:ml-4 p-1 hover:bg-red-100 rounded-full transition-colors group'
            aria-label="Zatvori obaveštenje"
          >
            <IoClose size={18} className='text-gray-400 group-hover:text-red-500 transition-colors' />
          </button>

        </div>
      </div>
    </div>
  )
}

export default HeaderComponent