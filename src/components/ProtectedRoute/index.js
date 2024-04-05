import Cookies from 'js-cookie'
import {Route} from 'react-router-dom'
import Login from '../Login'

const ProtectedRoute = (props)=>{


    const token = Cookies.get("JWTToken")
    if (token === undefined){
         return <Route to="/login" element={<Login/>}/>
    }
    else{
        return <Route {...props}/>
    }
}

export default ProtectedRoute