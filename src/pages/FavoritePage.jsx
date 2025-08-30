import React from 'react'
import { useSelector } from 'react-redux'
import CardComponent from "../components/CardComponent"

function FavoritePage() {
    const {allFavorite} = useSelector((state) => state.favoriteStore);

  return (
    <div>
        {allFavorite.map((item)=>{
            return (
                <CardComponent key={item.id} product={item}/>
            )
        })}
    </div>
  )
}

export default FavoritePage