import { useEffect,useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from 'axios'

export default function Show(){
    const {id}=useParams()
    const [show,setShow]=useState({})

    useEffect(()=>{
        (async()=>{
            try{
                const response=await axios.get(`http://localhost:3000/${id}`)
                setShow(response.data)
            }catch(err){
                console.log(err)
            }
        })()
    },[])
    return(
        <div>
            <Link to='/'>Home Page</Link>
            <h1>Entry: {show.entry}</h1>
            <p>Status: {show.status}</p>
        </div>
    )
}