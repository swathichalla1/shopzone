import React,{useState} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'
import SimilarProducts from './components/SimilarProducts'
import ContextView from './Context/ContextView'
import CartView from './components/CartView'
//import ProtectedRoute from './components/ProtectedRoute'
import './App.css';

function App() {
  let [CartItems,setCartItems] = useState([])
  const AddItemToCart = (Item)=>{
         const update = [...CartItems,Item];
         setCartItems(update)
  }

  const DeleteItemCart = (ID)=>{
         const filteredList = CartItems.filter((eachItem)=>(
          eachItem.id !== ID
         ))
         setCartItems(filteredList);
  }

  const UpdateData = (ID,qty)=>{
    const filtered = CartItems.map((e)=>{
      if (e.id === ID){
        const value = e.quantity;
        return ({...e,quantity:value+qty})
      }
      else{
        return e
      }
    })
    setCartItems(filtered)

  }

  const DecreaseQuantity = (ID,qty)=>{
    const filtered = CartItems.map((e)=>{
      if (e.id === ID){
        const value = e.quantity;
        return ({...e,quantity:value-qty})
      }
      else{
        return e
      }
    })
    setCartItems(filtered)

  }

  const ClearCart = ()=>(
    setCartItems([])
  )

  return (
    <BrowserRouter>
    <ContextView.Provider value={{CartItems,AddItemToCart:AddItemToCart,DeleteItemCart:DeleteItemCart,UpdateData:UpdateData,ClearCart:ClearCart,DecreaseQuantity:DecreaseQuantity}}>
    <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route  path="/" element={<Home/>}/>
    <Route path="/products" element={<Products/>}/>
    <Route path="/productDetails/:id" element={<ProductDetails/>}/>
    <Route path="/similarProducts" element={<SimilarProducts/>}/>
    <Route path="/cartView" element={<CartView/>}/>
    </Routes>
    </ContextView.Provider>
    </BrowserRouter>
  );
}

export default App;
