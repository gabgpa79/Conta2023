import React,{ useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from '@reducers/gral/authSlice'

const AuthProvider = ({ children }) =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();    
    const { auth } = useSelector(state =>state.auth)
    const user  = JSON.parse(localStorage.getItem('@usuarioConta23'))
    const token = JSON.parse(localStorage.getItem('@tokenConta23'))

    
    const handleLogin = (event) =>{                   
        event.preventDefault()         
        const io ={
            username : event.target[0].value,
            password : event.target[1].value
        }
        dispatch(login(io));                       
    }

    const handleLogout= () =>{
        dispatch(logout());
        navigate('/');
    }
    const value = {
        user,
        onLogin: handleLogin,
        onLogout: handleLogout
    };
    const reload = () =>{               
        if(token){
            navigate('/admin/inicio/');            
        }else{
            navigate('/');
        }       
    }
    
    useEffect(() => {
        reload()
    }, [auth]);

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}
export default AuthProvider;