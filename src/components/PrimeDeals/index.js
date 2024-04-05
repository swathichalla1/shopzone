import './index.css'
import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import ClipLoader from "react-spinners/ClipLoader";

const PrimeDeals = ()=>{

    const [Prime,setPrime] = useState("initial")
    const [Primedata,setPrimedata] = useState([])

    useEffect(()=>{setPrime("Loading")
    const jwttoken = Cookies.get("JWTToken");
    
    const options = {
        method:"GET",
        headers : {
            Authorization : `Bearer ${jwttoken}`
        }
    }
    console.log("jwttoken in prime : ",jwttoken);
    console.log(options.headers.Authorization);

     async function getPrimeDealsData(){

        try{
            const response = await fetch('https://apis.ccbp.in/prime-deals',options)
            const data = await response.json()
            console.log(response);
            console.log(data);
            if (response.ok===true){
            
                const updatedData = data.prime_deals.map((eachDeal)=>({
                    ...eachDeal,
                    imageUrl:eachDeal.image_url,
                    totalReviews:eachDeal.total_reviews
             }))
            
             setPrimedata(updatedData)
             setPrime("Success")
             
               }
               else{
                setPrime("Failure")
               }
    
        }
        catch(e){
            setPrime("Failure")
        }

           
           //console.log(data);

           
           
}
return ()=>(getPrimeDealsData());
},[]);

const PrimeSuccessView = ()=>(
    <div>
    <h1>Exclusive Prime Deals</h1>
    <ul className="AllprimeContainer">{Primedata.map((each)=>(
        <ProductCard productData={each} key={each.id}/>
    ))}</ul>
    </div>
)

const PrimeFailureView = ()=>(
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="Register Prime"
      className="register-prime-image"
    />
)

const PrimeLoadingView = ()=>{
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
    
    switch (Prime){
        case "Success":
            return PrimeSuccessView()
        case "Failure":
            return PrimeFailureView()
        case "Loading":
            return PrimeLoadingView()
        default:
            return null
    }
}

export default PrimeDeals