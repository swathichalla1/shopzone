import React from 'react'

const ContextView = React.createContext(
    {
        CartItems : [],
        AddItemToCart : ()=>{},
        DeleteItemCart : ()=>{},
        UpdateData : ()=>{},
        ClearCart:()=>{},
        DecreaseQuantity:()=>{}
    }
)

export default ContextView