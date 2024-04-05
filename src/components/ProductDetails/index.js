import { useParams } from 'react-router-dom';
import {useEffect,useState} from 'react'
import Cookies from 'js-cookie'
import ClipLoader from "react-spinners/ClipLoader";
import ProductCard from '../ProductCard';
import Header from '../Header'
import './index.css'
import ContextView from '../../Context/ContextView'
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";

const ProductDetails = ()=>{
  
  
  const [status,setStatus] = useState("Loading")
  const [detailedData,setdetailedData] = useState([])
  const [similarData,setSimilarData] = useState([])
  const value = 1
  const [quantity,setQuantity] = useState(value)
  
  const {id} = useParams()
  
  
  
    const getFormattedData = (data) => ({
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        title: data.title,
        totalReviews: data.total_reviews,
      });

      
      
    useEffect(()=>{
      
      setStatus("Loading")
      setQuantity(1)
        const getProductDetails = async () => {
            const token = Cookies.get("JWTToken");
            const url = `https://apis.ccbp.in/products/${id}`
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: 'GET',
            };
            
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok===true){
              const updatedData = getFormattedData(data);
              setdetailedData(updatedData)
              const updatedSimilarProductsData = data.similar_products.map(
                (eachSimilarProduct) => getFormattedData(eachSimilarProduct)
              )
              setSimilarData(updatedSimilarProductsData)
              setStatus("Success")
            }
            else{
              setStatus("Failure")
            }
            }
     getProductDetails()
    },[id]);

    

    const SuccessView = ()=>(
      <ContextView.Consumer>
      {value =>{
        const {AddItemToCart,CartItems,UpdateData} = value 
        //console.log(CartItems)
        const AddItem = ()=>{
          
          const filter = CartItems.filter((each)=>(
            each.id === detailedData.id
          ))
          //console.log("filtered is :",filter)
          if (filter[0] !== undefined){
            return (UpdateData(filter[0].id,quantity))
          }
          else{
            return(
              AddItemToCart({...detailedData,quantity})
            )
          }
          }

        return(
          <div className="detailSection">
            <div className="showDetails">
              <img src={detailedData.imageUrl} alt="productDetailedView" className="productDetailedView"/>
              <div className="details">
                     <h3 style={{color:"red",fontSize:"30px"}}>{detailedData.title}</h3>
                     <h4><span className="span">Brand :</span> {detailedData.brand}</h4>
                     <p><span className="span">Price :</span> {detailedData.price}</p>
                     <p><span className="span">Rating :</span> {detailedData.rating}</p>
                     <p><span className="span">Reviews :</span> {detailedData.totalReviews}</p>
                     <p className="description"><span className="span">about :</span> {detailedData.description}</p>
                     <p><span className="span">Availability :</span> {detailedData.availability}</p>
                     <div className="quantityContainer">
                     <CiSquarePlus className="symbol" onClick={()=>(setQuantity(quantity+1))} />
                     <p className="quantity">{quantity}</p>
                     <CiSquareMinus className="symbol" onClick={()=>{if (quantity<=1){
                      setQuantity(1)
                     }
                    else{
                      setQuantity(quantity-1)
                    }}}/>
                     </div>
                     <button onClick={AddItem}>Add To Cart</button>
              </div>
            </div>
            
            <hr/>
            <h1 className="similar-products-heading">Similar Products</h1>
            <ul className="AllprimeContainer">{similarData.map((productData)=>(
              <ProductCard productData={productData} key={productData.id}/>
            ))}</ul>
            
          </div>
          
        )
      }}
      </ContextView.Consumer>
    )
      
      
    

    const FailureView = ()=>(<h1>This is better luck next time</h1>)
    

    const LoadingView = ()=>{
      
      const override= {
          display: "block",
          margin: "0 auto",
          borderColor: "red",
        };
     return(<ClipLoader
      color="black"
      //loading={isLoading}
      cssOverride={override}
      size={50}
      aria-label="FadeLoader"
      data-testid="loader"
    />)   
     }

    
    const GetView = ()=>{
      switch (status){
        case "Success":
          return SuccessView()
        case "Failure":
          return FailureView()
        case "Loading":
          return LoadingView()
        default:
          return null
      }
    }


    return(
      <div>
      <Header/>
      {GetView()}
      </div>
    )
}

export default ProductDetails