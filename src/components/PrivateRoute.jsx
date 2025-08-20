import React, { useEffect, useState } from 'react'
import { backendUrl } from '../util'
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute =  ({children}) => {

    const [isAuthorize, setIsAuthorize] = useState("loading");



    useEffect(  ()=>{
  async function  VerifyToken(){
    let verifyToken ="";
    try {      
        
        toast.loading("Verifying token...", { id: "verifyToken" });

            verifyToken = await axios.get(`${backendUrl}/api/verify`, {withCredentials:true}); 
            if(verifyToken.data.message ==="Authorized"){
                console.log("Token verified successfully");
                setIsAuthorize(true)
                toast.success("Token verified successfully", { id: "verifyToken" });
                
            }
    } catch (error) {
        toast.error("You are not authorized to view this page. Please login.", { id: "verifyToken" });
                setIsAuthorize(false);

    }
 
   }
        VerifyToken()
    },[])

 

   
if(isAuthorize === "loading"){
    return <div>Loading...</div>}
    else{
return  isAuthorize===true? <>{children}</>: <h1>Unauthorized</h1>;
{/* <Navigate to="/auth" replace={true} /> */}

    }



}

export default PrivateRoute