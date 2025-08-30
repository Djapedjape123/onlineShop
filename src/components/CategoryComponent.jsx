import React, { useEffect, useState } from 'react'
import CategoryProducts from '../services/CategoryProducts'
import { useDispatch, useSelector } from 'react-redux';
import { saveAllCategoryActions } from '../store/categorySlice';
import {saveCategoryAction} from '../store/productsSlice'


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
        <div className='bg-gray-200 p-3'>
            <div className='container mx-auto flex p-3'>
                {!showAll ? (
                    <button
                        className='py-2 px-4 w-fit bg-blue-800 hover:bg-blue-700 rounded-lg text-white'
                        onClick={showCategory}
                    >
                        Show category
                    </button>
                ) : (
                    <button
                        className='py-2 px-4 m-3 bg-red-600 hover:bg-red-500 rounded-full text-white h-[50px]'
                        onClick={showCategory}
                    >
                        X
                    </button>
                )}


                {showAll && (
                    <ul className="flex flex-wrap gap-2">
                        <li className="bg-white text-gray-800 px-4 py-1 rounded-full shadow text-sm cursor-pointer hover:bg-gray-100 list-none"
                        onClick={()=> dispatch(saveCategoryAction(''))}
                        >All category</li>
                       {allCategory.map((cate, index) => (
                          
                          <li
                              key={index}
                              className="bg-white text-gray-800 px-4 py-1 rounded-full shadow text-sm cursor-pointer hover:bg-gray-100 list-none hover:shadow-lg hover:shadow-mainBlue"
                              onClick={() => dispatch(saveCategoryAction(cate))}
                           >
                             {cate}
                         </li>
                 ))}
    </ul>
)}

            </div>

        </div>
    )
}

export default CategoryComponent