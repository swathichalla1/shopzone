import {useState} from 'react'
import ContextView from '../../Context/ContextView'
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import './index.css'

const CartItem = (props)=>{

    const {details} = props 
    const {id,title,brand,quantity,price,imageUrl} = details
    const [productQuantity,setProductQuantity] = useState(quantity)

    return(

    <ContextView.Consumer>
    {value => {
        const {DeleteItemCart,UpdateData,DecreaseQuantity} = value

        const deleteItem = ()=>{
            DeleteItemCart(id)
        }

        return(
            <div>
            <div className="cart">
              <img src={imageUrl} alt="productImage" className="image"/>
              <h3>{title}</h3>
              <p>{brand}</p>
              <div className="quantityContainer">
                         <CiSquarePlus className="symbol" onClick={()=>{setProductQuantity(productQuantity+1);UpdateData(id,1)}} />
                         <p className="quantity">{productQuantity}</p>
                         <CiSquareMinus className="symbol" onClick={()=>{if (productQuantity<=1){
                            DeleteItemCart(id)
                         }
                        else{
                            setProductQuantity(productQuantity-1);DecreaseQuantity(id,1)
                        }}}/>
                         </div>
              <h3>{productQuantity*price}</h3>
              <MdDelete onClick={deleteItem}/>
            </div>
            </div>
        )
    }}
    </ContextView.Consumer>)
    

    

}

export default CartItem