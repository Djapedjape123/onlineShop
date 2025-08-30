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

function CardPage() {
    const [cartData, setCart] = useState([]);
    const [acticCode, setActiveCode] = useState('')
    const { cart, totalPrice } = useSelector(state => state.cartStore);

    let dispach = useDispatch();
    const couponRef = useRef()

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart_item')))

    }, [cart])

    function hangleDelate(product) {
        dispach(delateFromCartAction(product))
    }
    function hangleCode(){
        setActiveCode(couponRef.current.value)
       couponRef.current.value = ''
    }
    return (
        <div className='mt-[50px] flex flex-col md:flex-row justify-center px-4 gap-4'>
            <div className='  w-full md:w-[70%]'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className='bg-slate-600'>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Quantity</TableCell>
                                <TableCell align="right">Subtotal</TableCell>
                                <TableCell align="right">Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartData.map((product,index) => (
                                <TableRow
                                    key={product.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <img src={product.thumbnail} alt="" className='w-[90px] h-[90px]' />
                                    </TableCell>
                                    <TableCell align="left"><span className='font-bold'>${product.price}</span></TableCell>
                                    <TableCell align="left">
                                        <div className='flex gap-[4px]'>
                                            <button className='bg-gray-400 text-gray-900 px-[12px] py-[6px] rounded-md hover:bg-gray-600 hover:text-white'
                                            onClick={()=> dispach(savePriceHengleAction({index , increment:-1}))}   >-</button>
                                            <button className='bg-gray-400 text-gray-900 px-[12px] py-[6px] rounded-md cursor-auto'>{product.count}</button>
                                            <button className='bg-gray-400 text-gray-900 px-[12px] py-[6px] rounded-md hover:bg-gray-600 hover:text-white'
                                            onClick={()=>{
                                                if(product.count < product.stock){
                                                   dispach(savePriceHengleAction({index,increment: 1}))
                                                }
                                            }}  >+</button>
                                        </div>
                                    </TableCell>
                                    <TableCell align="right"><span className='font-bold'>${Math.floor(product.cartTotal)}</span></TableCell>
                                    <TableCell align="right">
                                        <button className='text-red-600'
                                            onClick={() => hangleDelate(product)}
                                        ><CiCircleRemove color='red' size={32} className='cursor-pointer'/></button>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            <div className='w-full md:w-[30%]'>
                <div className='bg-white  rounded shadow flex flex-col gap-[10px]'>
                    <h4 className=' bg-mainBlue text-white font-bold w-full py-[17px] px-[10px] rounded-md flex justify-center items-center'>CARD TOTAL</h4>
                    <span className='flex justify-center items-center font-extrabold text-red-800 '>Total Price: ${acticCode === 'vladanavolimte' ? totalPrice / 2 : totalPrice}</span>
                    <div className='flex flex-col gap-6 mt-1'>
                        <input type="text" placeholder='insert Coupon' className='p-2 border border-gray-500 rounded-lg placeholder:text-mainBlue'
                          
                          ref={couponRef}
                        />
                        <span className='bg-green-300 text-center rounded-3xl px-2 py-1'>Insert coupon for 50%</span>
                        <button className={acticCode === 'vladanavolimte' ? 'bg-gray-700 text-black px-4 py-2 rounded-md line-through cursor-none' :'bg-mainBlue hover:bg-mainYellow text-white px-4 py-2 rounded-md transition-all duration-300'}
                         onClick={hangleCode}
                         disabled={acticCode ==='vladanavolimte' ? true : false}
                        >Apply Coupon</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardPage