import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({children}) =>{         
    const token = JSON.parse(localStorage.getItem('@tokenConta23'))    
    if(!token){        
        return <Navigate to ="/" replace />; }
    return children    
    };

export default Protected 
