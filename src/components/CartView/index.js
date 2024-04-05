import ContextView from '../../Context/ContextView'
import Header from '../Header'
import CartItem from '../CartItem'
import './index.css'
import {useNavigate} from 'react-router-dom'


const CartView = ()=>{
    const nav = useNavigate();
    const shopMore = ()=>{
        return nav("/products");
 }

 return(
        <ContextView.Consumer>{value => {
            const {CartItems,ClearCart} = value 
          
 
            const total = CartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
             
             const cartLength = CartItems.length;

             
             
            
            
            return(
             <div>
             <Header/>
             <div className="cart">
             <h1 >My Cart</h1>
             <button className="clearbutton" onClick={()=>(ClearCart())}>Clear Cart</button>
             </div>

             {cartLength >0 ? <>
                <ul>
                {CartItems.map((each)=>(
                    <CartItem details={each} key={each.id}/>
                ))}
                </ul>
                <h3 style={{textAlign:"center",margin:"10px"}}>{total !==0 && `Order Total : ${total}`}</h3>
                </> : <div className="emptycart"><h1>Empty Cart</h1>
                <button onClick={shopMore} className="shopNow">Shop Now</button></div>
            }
             
             </div>
             
             
            )
 
         }}</ContextView.Consumer>)
        }
        
    
        
        
    


export default CartView