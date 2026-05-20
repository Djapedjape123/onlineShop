import React from 'react'
import { useSelector } from 'react-redux'
import CardComponent from "../components/CardComponent"
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHeartBroken } from "react-icons/fa"; // Importovane ikonice

function FavoritePage() {
    const {allFavorite} = useSelector((state) => state.favoriteStore);

    return (
        <div className='min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-[1400px] mx-auto'>
                
                {/* Header deo: Dugme za nazad, Naslov i Brojač */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                    <div>
                        <Link to="/" className="inline-flex items-center gap-2 text-mainBlue hover:text-mainYellow font-bold mb-4 transition-colors duration-300">
                            <FaArrowLeft size={18} />
                            <span>Back to Shop</span>
                        </Link>
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">My Favorites</h1>
                    </div>
                    
                    {/* Brojač sačuvanih predmeta */}
                    {allFavorite.length > 0 && (
                        <div className="bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-2 w-max">
                            <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold text-sm">
                                {allFavorite.length}
                            </span> 
                            <span className="text-gray-600 font-medium text-sm">Items saved</span>
                        </div>
                    )}
                </div>

                {/* Uslovno renderovanje: Ako je lista prazna prikazujemo Empty State, u suprotnom prikazujemo Grid sa proizvodima */}
                {allFavorite.length === 0 ? (
                    
                    <div className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-sm border border-gray-100 py-24 px-4 text-center">
                        <div className="bg-red-50 p-6 rounded-full mb-6">
                            <FaHeartBroken size={64} className="text-red-300" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
                            You haven't saved any items yet. Start browsing our collection and click the heart icon to save your favorites!
                        </p>
                        <Link 
                            to="/" 
                            className="bg-mainBlue text-white font-bold px-8 py-4 rounded-full hover:bg-mainYellow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Explore Products
                        </Link>
                    </div>

                ) : (

                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {allFavorite.map((item) => {
                            return (
                                // Obavezno prosledjujemo isGrid="gridView"
                                <CardComponent key={item.id} product={item} isGrid="gridView"/>
                            )
                        })}
                    </div>

                )}
            </div>
        </div>
    )
}

export default FavoritePage