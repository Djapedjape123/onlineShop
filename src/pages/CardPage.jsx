import React from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

function CardPage() {

    // const {cart} = useSelector(state => state.cartStore);
    
    let cart = JSON.parse(localStorage.getItem('cart_item'));

    return (
        <div className='mt-[50px]'>
            <div className='container mx-auto'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Quantity</TableCell>
                                <TableCell align="right">Subtotal</TableCell>
                                <TableCell align="right">Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((product) => (
                                <TableRow
                                    key={product.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <img src={product.thumbnail} alt="" className='w-[90px] h-[90px]' />
                                    </TableCell>
                                    <TableCell align="left">{product.price}</TableCell>
                                    <TableCell align="left">
                                        <div>
                                            <button>-</button>
                                            <button>{product.count}</button>
                                            <button>+</button>
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">{product.cartTotal}</TableCell>
                                    <TableCell align="right">
                                        <button>x</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </div>
    )
}

export default CardPage