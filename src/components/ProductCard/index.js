import {Link} from 'react-router-dom'
import './index.css'

const ProductCard = (props)=>{
    const {productData} = props
    const {id,title,brand,price,rating,imageUrl} = productData

    return(
        <Link  to={`/productDetails/${id}`} className="productCardContainer link">
        <img src={imageUrl} alt="productImage" className="productImage"/>
        <h3 className="title">{title}</h3>
        <p className="brand">{`Brand : ${brand}`}</p>
        <div className="priceRating">
        <p className="price">{`Price : ${price}`}</p>
        <p className="rating">{`Rating : ${rating}`}</p>
        </div>
        </Link>
    )
}

export default ProductCard