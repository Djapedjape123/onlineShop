import React from 'react'
import Logo from '../assets/logo.png'
// icons
import { MdOutlineAssignmentInd } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
//link
import { Link } from 'react-router-dom'
//clerk
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react' 
function NavBArComponent() {
  return (
    <div className='flex justify-between items-center bg-mainBlue h-full p-5 flex-col lg:flex-row lg:h-[100px]'> 
      <div className='flex justify-between items-center'>
        
        <Link to={'/'}>
          <img src={Logo} alt="logo" className='p-[20px]' />
        </Link>
           
      

        <div className='flex items-center rounded-full overflow-hidden shadow-md bg-white flex-col  lg:flex-row'>
          <input type="text" name="" id="" className='px-4 py-2 w-64 text-sm focus:outline-none' placeholder='     pretrazite sta vas zanima' />
          <button className='bg-mainYellow hover:bg-orange-600 text-white px-3 py-1 text-sm font-semibold rounded-full w-50% lg:px-6 lg:py-2'>Search</button>
        </div>
      </div>
      <div className='flex justify-between items-center gap-[15px]'>
        <MdOutlineAssignmentInd color='white' size={24} />
        <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

        <FaRegHeart color='white' size={24} />
        <span className="inline-flex items-center justify-center rounded-full w-5 h-5 bg-mainYellow text-white text-xs">
          0
        </span>
        <span className='text-white font-bold'>Favorite</span>

        <CiShoppingCart color='white' size={24} />
        <span className="inline-flex items-center justify-center rounded-full w-5 h-5 bg-mainYellow text-white text-xs">
          0
        </span>

        <span className='text-white font-bold'>Card</span>
      </div>
    </div>
  )
}

export default NavBArComponent