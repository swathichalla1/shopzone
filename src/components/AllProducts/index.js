import Cookies from 'js-cookie';
import './index.css';
import { useEffect,useState} from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import ProductCard from '../ProductCard'


const AllProducts = () => {

    const [isLoading,setLoading] = useState(true);
    const [AllproductsData,setAllproductsData] = useState([]);

    useEffect(() => {
        setLoading(true)
        const getAllProductDetails = async () => {
            const token = Cookies.get("JWTToken");
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: 'GET',
            };
            const response = await fetch("https://apis.ccbp.in/products", options);
            const data = await response.json();
            if (response.ok===true){
                const updatedData = data.products.map((product)=>(
                    {title: product.title,
                        brand: product.brand,
                        price: product.price,
                        id: product.id,
                        imageUrl: product.image_url,
                        rating: product.rating,}
                ))

                setAllproductsData(updatedData)
                setLoading(false)
            }
        };
        
        return ()=>getAllProductDetails();
    }, []);


    const showLoadingView = ()=>{
        const override= {
            display: "block",
            margin: "0 auto",
            borderColor: "red",
          };
       return(<ClipLoader
        color="black"
        loading={isLoading}
        cssOverride={override}
        size={50}
        aria-label="FadeLoader"
        data-testid="loader"
      />)   
        

    }

    const showAllProducts=()=>(
            <ul className="AllproductsContainer">{AllproductsData.map((eachProduct)=>(
                <ProductCard productData={eachProduct} key={eachProduct.id}/>
        ))}</ul>
        )


    return (
        <div>{isLoading ? showLoadingView() : showAllProducts()}</div>
    );
};

export default AllProducts;
