import React, { useEffect, useState } from 'react'
import Logo from '../assets/logo.png'
// icons
import { MdOutlineAssignmentInd } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
//link
import { Link } from 'react-router-dom'
//clerk
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react' 
//redux
import { useDispatch, useSelector } from 'react-redux';
import { saveSearchAction } from '../store/productsSlice';

function NavBArComponent() {
  const [totalProductLS, setTotalProduct] = useState(0) // state za cenu
  const [searchProducts, setSearcProducts] = useState('') // state za cuvanje onoga sta smo pretrazili
  
  const { totalProduct } = useSelector((state) => state.cartStore) 
  const { totalFavorite } = useSelector((state) => state.favoriteStore);

  const dispatch = useDispatch()

  useEffect(() => {
    let lsTotal = JSON.parse(localStorage.getItem('cart_total'))
      
    if (lsTotal) {
       setTotalProduct(lsTotal)
    } else {
      setTotalProduct(0)
    }
  }, [totalProduct])

  function hangleSearch() {
    dispatch(saveSearchAction(searchProducts));
    setSearcProducts('')
  }
   
  return (
    <nav className='bg-mainBlue w-full sticky top-0 z-50 shadow-md'>
      <div className='max-w-[1400px] mx-auto px-4 py-3 lg:py-0 lg:h-[90px] flex flex-col lg:flex-row justify-center lg:justify-between'>
        
        {/* Gornji red na mobilnom: Logo i Ikonice / Levi i Desni deo na Desktopu */}
        <div className='flex justify-between items-center w-full'>
          
          {/* Logo */}
          <Link to={'/'} className='flex-shrink-0'>
            <img src={Logo} alt="logo" className='h-[40px] lg:h-[50px] object-contain' />
          </Link>

          {/* Search bar za DESKTOP (Skriven na mobilnom) */}
          <div className='hidden lg:flex items-center w-[400px] bg-white rounded-full overflow-hidden shadow-sm border-2 border-transparent focus-within:border-mainYellow transition-all duration-300 mx-6'>
            <input 
              type="text" 
              className='flex-1 px-5 py-2 text-sm text-gray-700 focus:outline-none bg-transparent' 
              placeholder='Pretražite šta vas zanima...'
              value={searchProducts}
              onChange={(e) => setSearcProducts(e.target.value)}
            />
            <button 
              className='bg-mainYellow hover:bg-yellow-500 text-white px-6 py-2 text-sm font-bold transition-colors duration-300'
              onClick={hangleSearch}
            >
              Search
            </button>
          </div>

          {/* Ikonice i akcije (Desni deo) */}
          <div className='flex items-center gap-4 lg:gap-6 text-white'>
            
            {/* Auth / Profil */}
            <div className='flex items-center gap-2 hover:text-gray-200 transition-colors cursor-pointer'>
              <MdOutlineAssignmentInd size={22} className="hidden sm:block" />
              <SignedOut>
                <span className="font-semibold text-sm lg:text-base"><SignInButton /></span>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>

            {/* Favorite */}
            <Link to={'/favorite'} className='flex items-center gap-2 group'>
              <div className="relative flex items-center justify-center">
                <FaRegHeart size={22} className="group-hover:text-mainYellow transition-colors" />
                <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-mainYellow text-white font-bold text-[10px] rounded-full border-2 border-mainBlue">
                  {totalFavorite}
                </span>
              </div>
              <span className='hidden lg:block font-bold group-hover:text-mainYellow transition-colors'>Favorite</span>
            </Link>

            {/* Cart */}
            <Link to='/cart' className='flex items-center gap-2 group'>
              <div className="relative flex items-center justify-center">
                <CiShoppingCart size={26} className="group-hover:text-mainYellow transition-colors" />
                <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-mainYellow text-white font-bold text-[10px] rounded-full border-2 border-mainBlue">
                  {totalProductLS}
                </span>
              </div>
              <span className='hidden lg:block font-bold group-hover:text-mainYellow transition-colors'>Cart</span>
            </Link>

          </div>
        </div>

        {/* Search bar za MOBILNI (Prikazuje se samo ispod ekrana na mobilnom) */}
        <div className='flex lg:hidden items-center w-full bg-white rounded-full overflow-hidden shadow-sm mt-4 border border-gray-200 focus-within:border-mainYellow'>
          <input 
            type="text" 
            className='flex-1 px-4 py-2.5 text-sm text-gray-700 focus:outline-none bg-transparent' 
            placeholder='Pretražite...'
            value={searchProducts}
            onChange={(e) => setSearcProducts(e.target.value)}
          />
          <button 
            className='bg-mainYellow hover:bg-yellow-500 text-white px-5 py-2.5 text-sm font-bold transition-colors'
            onClick={hangleSearch}
          >
            Search
          </button>
        </div>

      </div>
    </nav>
  )
}

export default NavBArComponent