"use client"
import { setLoaderFalse, setLoaderTrue } from '../slice/loaderSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const withAuth = (WrappedComponent) => {


    const WithProtection = (props)=>{

        const navigate = useNavigate();
        const checkAuthentication = async()=>{
            const token = sessionStorage.getItem("tmToken")?.length ? sessionStorage.getItem("tmToken") : localStorage.getItem("tmToken")
            if(token == null){
                const lsToken = localStorage.getItem("tmToken")
                if(lsToken == null){
                    navigate("/login")
                }
                else{
                    navigate("/#")
                }
                
            }
        }
        useEffect(()=>{
            checkAuthentication()
           
        },[])
        return <>
        <WrappedComponent  />
        </> 
    }
    return WithProtection
    
  };


export default withAuth;