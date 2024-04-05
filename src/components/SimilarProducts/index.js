import {useState,useEffect} from 'react'

const SimilarProducts = ()=>{

    

    const [value] = useState("abc")
    console.log(value)

    useEffect(()=>(
        console.log("effect called")
    ),[])

    console.log("render called")
    return(
        
        <h1>This is render</h1>
    )
}

export default SimilarProducts