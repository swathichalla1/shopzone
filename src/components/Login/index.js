import {useState} from 'react'
import {useNavigate,Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
//  import Home from '../Home'
import './index.css'

const Login = ()=>{
    const navig = useNavigate();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(false);
    const [errMsg,seterrMsg] = useState("");

    const changeUserName = (event)=>(
         setUsername(event.target.value)
    )

    const changePassword = (event)=>(
        setPassword(event.target.value)
   )

   const onSubmitSuccess = (jwttoken)=>{

    Cookies.set("JWTToken",jwttoken,{expires:30});
    navig("/",{ replace: true });
}

   const onSubmitFailure = (err)=>{
    setError(true);
    seterrMsg(err);
   }

   const formSubmission = async (event)=>{
    event.preventDefault();
    const userDetails = {username,password};

    const url = 'https://apis.ccbp.in/login';
    const options = {
        method : "POST",
        body : JSON.stringify(userDetails)

    }
    const response = await fetch(url,options);
    const data = await response.json();
    
    if (response.ok===true){
        onSubmitSuccess(data.jwt_token)
    }
    else{
        onSubmitFailure(data.error_msg)
    }
    }
    
    
   

    
        const jwttoken = Cookies.get("JWTToken");
        if (jwttoken !== undefined){
            return <Navigate to="/" />
        }
        else{
            return(<div className="LoginContainer">
            <form className="FormContainer" onSubmit={formSubmission}>
                 <div className="eachContainer">
                 <label htmlFor="username">USER NAME</label>
                 <input type="text" id="username" placeholder="Enter Username" value={username} onChange={changeUserName}/>
                 </div>
                 <div className="eachContainer">
                 <label htmlFor="password">PASSWORD</label>
                 <input type="password" id="password" placeholder="Enter Password" value={password} onChange={changePassword}/>
                 </div>
                 <button type="submit" className="loginButton">Login</button>
                 {error && <p className="error">{`* ${errMsg}`}</p>}
            </form>
         </div>)
        }
        
    
}

export default Login