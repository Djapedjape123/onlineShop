
import { Outlet } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent'
import { useState } from 'react'
import NavBArComponent from './components/NavBArComponent';
import CategoryComponent from './components/CategoryComponent';
import axios from 'axios';

axios.defaults.baseURL = 'https://dummyjson.com'
function App() {
  const [toggle , setTogle] = useState(true);
  return (
    <>
      {toggle && <HeaderComponent setTogle={setTogle}/>}
      <NavBArComponent />
      <CategoryComponent />
     <Outlet/>
    </>
  )
}

export default App
