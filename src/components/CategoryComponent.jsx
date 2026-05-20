import React, { useEffect, useState } from 'react'
import CategoryProducts from '../services/CategoryProducts'
import { useDispatch, useSelector } from 'react-redux';
import { saveAllCategoryActions } from '../store/categorySlice';
import { saveCategoryAction } from '../store/productsSlice'

function CategoryComponent() {
    // const [allCategory, setAllCategory] = useState([]);
    const { allCategory } = useSelector((state) => state.categoryStore)

    const dispatch = useDispatch()

    const [showAll, setShowAll] = useState(false);
    
    useEffect(() => {
        CategoryProducts.getAllCategory()
            .then((res) => dispatch(saveAllCategoryActions(res.data)))
            .catch(err => console.log(err))
    }, [])

    function showCategory() {
        setShowAll(!showAll);
    }
    
    return (
        <div className='bg-gray-50 border-b border-gray-200 shadow-sm'>
            <div className='max-w-[1400px] mx-auto px-4 py-3 sm:py-4'>
                <div className='flex flex-col sm:flex-row sm:items-start gap-4'>
                    
                    {/* Dugmad za prikaz/skrivanje */}
                    {!showAll ? (
                        <button
                            className='w-full sm:w-auto flex-shrink-0 py-2.5 px-6 bg-mainBlue hover:bg-blue-800 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300'
                            onClick={showCategory}
                        >
                            Show categories
                        </button>
                    ) : (
                        <button
                            className='w-full sm:w-auto sm:h-12 flex-shrink-0 flex items-center justify-center py-2.5 px-4 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white font-bold rounded-full transition-all duration-300 border border-red-200 hover:border-transparent shadow-sm'
                            onClick={showCategory}
                            title="Zatvori kategorije"
                        >
                            X
                        </button>
                    )}

                    {/* Lista kategorija */}
                    {showAll && (
                        <div className="w-full animate-fade-in">
                            <ul className="flex flex-wrap gap-2.5">
                                {/* Opcija za sve kategorije */}
                                <li 
                                    className="px-5 py-2 bg-white text-gray-700 font-medium text-sm rounded-full shadow-sm border border-gray-200 cursor-pointer hover:border-mainBlue hover:text-mainBlue hover:bg-blue-50 transition-all duration-300 select-none"
                                    onClick={() => dispatch(saveCategoryAction(''))}
                                >
                                    All categories
                                </li>
                                
                                {/* Dinamičke kategorije */}
                                {allCategory.map((cate, index) => (
                                    <li
                                        key={index}
                                        className="px-5 py-2 bg-white text-gray-700 font-medium text-sm rounded-full shadow-sm border border-gray-200 cursor-pointer hover:border-mainBlue hover:text-mainBlue hover:bg-blue-50 transition-all duration-300 select-none capitalize"
                                        onClick={() => dispatch(saveCategoryAction(cate))}
                                    >
                                        {cate}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default CategoryComponent