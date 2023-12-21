import React, { useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { expireTokenFalse } from '../../slice/tokenExpireSlice';
import { useNavigate } from 'react-router-dom';
export default function NotificationAlert() {
    const navigate= useNavigate()
    const dispatch = useDispatch();
    let tokenExpireStatus = useSelector((event)=>event?.tokenExpireReducer?.value)
    console.log(tokenExpireStatus,"tokenExpireStatus")

    useEffect(()=>{
        const intervalId = setInterval(()=>{
            console.log("in alert component")
            dispatch(expireTokenFalse())
            navigate("/login")
        },5000)

        return ()=>{
            clearInterval(intervalId)
        }
        
    },[])

  return (
    <div className='fixed top-[20px] right-[20px]  ' style={{zIndex:"9999999"}}>
        {tokenExpireStatus && 
            <Alert variant="info" className="top-right-alert">
              Token expired, please login again.
            </Alert>
            }
    </div>
  )
}
