import {useState} from 'react'
import { GiHamburgerMenu } from "react-icons/gi"
import { IoClose } from "react-icons/io5";
import {Link} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

const Header = ()=>{

    const [openMenu,setopenMenu] = useState(false);
    const logout = ()=>{
          Cookies.remove("JWTToken");
    }

    return(
        <div className="headerContainer">
        <h1 className="logo">ShopZone</h1>
        <ul className={openMenu ? "sections Active" : "sections"}>
        <li className="section"> <Link to="/" className="sectionItem" >Home</Link></li>
        <li className="section"> <Link to="/products" className="sectionItem" >Products</Link></li>
        <li className="section"> <Link to="/cartView" className="sectionItem" >Cart</Link></li>
        <li className="section" onClick={logout}> <Link to="/login" className="sectionItem" >Logout</Link></li>
        </ul>
        {openMenu ? <IoClose className="menu" onClick={()=>(setopenMenu(false))} /> : <GiHamburgerMenu className="menu" onClick={()=>(setopenMenu(true))}/>}
        
        
        </div>
    )
}

export default Header