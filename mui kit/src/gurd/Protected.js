import React, { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "src/context/context";

const Protected = (props)=>{
    const {token,setToken,user,setUser} = useContext(Context)
    const{Component} = props;
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(token ===null){
            navigate('/login')
        }
    },[]);

    return(
        <Fragment>
            <Component />
        </Fragment>
    )

}

export default Protected;