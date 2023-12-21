"use client"
import withAuth from "../../../components/authRoutes";
import Order_returned from "../../../components/orders/returned/returned";


const ProtectedSignedEnquiry = withAuth(Order_returned)


export default function OrderReturned(){

    return(
        <>
       {/* {loaderState && <Loading/>} */}
       <ProtectedSignedEnquiry/>
       </>
        
    )
}