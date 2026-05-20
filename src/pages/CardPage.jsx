import React, { useEffect, useRef, useState } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { delateFromCartAction, savePriceHengleAction } from '../store/cartSlice';
import { CiCircleRemove } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa"; // Dodata ikonica za nazad
import { Link } from 'react-router-dom'; // Importovan Link

function CardPage() {
    const [cartData, setCart] = useState([]);
    const [acticCode, setActiveCode] = useState('')
    const { cart, totalPrice } = useSelector(state => state.cartStore);

    let dispach = useDispatch();
    const couponRef = useRef()

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart_item')) || [])
    }, [cart])

    function hangleDelate(product) {
        dispach(delateFromCartAction(product))
    }
    
    function hangleCode(){
        setActiveCode(couponRef.current.value)
        couponRef.current.value = ''
    }

    return (
        // Kontejner preko celog ekrana sa suptilnom gradijent pozadinom
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-4 sm:px-6 lg:px-8'>
            
            <div className='max-w-[1400px] mx-auto'>
                
                {/* Dugme za povratak na pocetnu */}
                <Link to="/" className="inline-flex items-center gap-2 text-mainBlue hover:text-mainYellow font-bold mb-8 transition-colors duration-300">
                    <FaArrowLeft size={18} />
                    <span>Back to Shop</span>
                </Link>

                <div className='flex flex-col lg:flex-row gap-8'>
                    
                    {/* Levi deo - Tabela */}
                    <div className='w-full lg:w-[70%]'>
                        {/* Dodata senka i zaobljene ivice na Paper, overflow-x-auto sprecava lomljenje na mobilnom */}
                        <TableContainer component={Paper} className="shadow-xl rounded-2xl overflow-hidden overflow-x-auto border border-gray-100">
                            <Table sx={{ minWidth: 650 }} aria-label="cart table">
                                <TableHead className='bg-mainBlue'>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product</TableCell>
                                        <TableCell align="left" sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
                                        <TableCell align="left" sx={{ color: 'white', fontWeight: 'bold' }}>Quantity</TableCell>
                                        <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Subtotal</TableCell>
                                        <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Remove</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartData.map((product, index) => (
                                        <TableRow
                                            key={product.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f8fafc' } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <div className="bg-gray-50 rounded-xl p-2 w-[90px] h-[90px] flex items-center justify-center">
                                                    <img src={product.thumbnail} alt={product.title} className='w-full h-full object-contain mix-blend-multiply' />
                                                </div>
                                            </TableCell>
                                            <TableCell align="left">
                                                <span className='text-lg font-bold text-gray-800'>${product.price}</span>
                                            </TableCell>
                                            <TableCell align="left">
                                                {/* Moderni brojač u obliku pilule */}
                                                <div className='flex items-center bg-gray-100 rounded-full w-max border border-gray-200 p-1'>
                                                    <button 
                                                        className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-gray-600 font-bold transition-all'
                                                        onClick={()=> dispach(savePriceHengleAction({index , increment:-1}))}   
                                                    >-</button>
                                                    
                                                    <span className='w-10 text-center font-bold text-gray-800 select-none'>{product.count}</span>
                                                    
                                                    <button 
                                                        className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-gray-600 font-bold transition-all'
                                                        onClick={()=>{
                                                            if(product.count < product.stock){
                                                               dispach(savePriceHengleAction({index,increment: 1}))
                                                            }
                                                        }}   
                                                    >+</button>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                                <span className='text-lg font-extrabold text-mainBlue'>${Math.floor(product.cartTotal)}</span>
                                            </TableCell>
                                            <TableCell align="right">
                                                <button 
                                                    className='p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors group'
                                                    onClick={() => hangleDelate(product)}
                                                    title="Remove item"
                                                >
                                                    <CiCircleRemove size={28} className='group-hover:scale-110 transition-transform'/>
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    {/* Desni deo - Total i Kupon */}
                    <div className='w-full lg:w-[30%]'>
                        <div className='bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100 sticky top-24'>
                            
                            <h4 className='text-xl font-bold text-gray-800 border-b border-gray-200 pb-4 mb-6'>Cart Summary</h4>
                            
                            {/* Prikaz cene sa logikom za popust */}
                            <div className='flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6 mb-6 border border-gray-100'>
                                <span className='text-gray-500 font-medium mb-1'>Total Price:</span>
                                {acticCode === 'vladanavolimte' ? (
                                    <div className="flex flex-col items-center">
                                        <span className='text-gray-400 line-through text-lg font-semibold'>${totalPrice}</span>
                                        <span className='font-extrabold text-4xl text-green-500 mt-1'>${totalPrice / 2}</span>
                                    </div>
                                ) : (
                                    <span className='font-extrabold text-4xl text-mainBlue'>${totalPrice}</span>
                                )}
                            </div>

                            <div className='flex flex-col gap-4 mt-2'>
                                <div className='relative'>
                                    <input 
                                        type="text" 
                                        placeholder='Insert Coupon Code' 
                                        className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent transition-all placeholder:text-gray-400 font-medium text-gray-700'
                                        ref={couponRef}
                                        disabled={acticCode === 'vladanavolimte'}
                                    />
                                </div>
                                
                                {acticCode !== 'vladanavolimte' && (
                                    <span className='text-center text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2 font-medium'>
                                        💡 Hint: Insert coupon for 50% off
                                    </span>
                                )}

                                {acticCode === 'vladanavolimte' && (
                                    <span className='text-center text-sm text-white bg-green-500 shadow-md shadow-green-200 rounded-lg px-3 py-2 font-bold'>
                                        🎉 Coupon Applied!
                                    </span>
                                )}

                                <button 
                                    className={`w-full font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md ${
                                        acticCode === 'vladanavolimte' 
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                                        : 'bg-mainBlue hover:bg-mainYellow hover:shadow-lg text-white transform hover:-translate-y-1'
                                    }`}
                                    onClick={hangleCode}
                                    disabled={acticCode === 'vladanavolimte'}
                                >
                                    {acticCode === 'vladanavolimte' ? 'Applied' : 'Apply Coupon'}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CardPage