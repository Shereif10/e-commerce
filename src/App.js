import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import NotFound from './components/NotFound/NotFound'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import { userToken } from './Context/userToken'
import ProtectedRoute from './ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'


export default function App() {

  let {setIsLogin} = useContext(userToken)

  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      setIsLogin(localStorage.getItem('userToken'))
    }
  },[])

  const routes = createBrowserRouter([
    {path:'/' , element:<Layout></Layout> , children:[
      {index:true , element: <Home></Home>},
      {path:'products' , element: <Products></Products>},
      {path:'cart' , element: <ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path:'categories' , element: <Categories></Categories>},
      {path:'productDetails/:id' , element: <ProductDetails></ProductDetails>},
      {path:'brands' , element: <Brands></Brands>},
      {path:'register' , element: <Register></Register>},
      {path:'login' , element: <Login></Login>},
      {path:'*' , element: <NotFound></NotFound>},
    ]}
  ])
  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}
