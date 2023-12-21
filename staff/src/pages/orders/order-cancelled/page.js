"use client"
import withAuth from "../../../components/authRoutes";
import Order_cancelled from "../../../components/orders/cancelled/cancelled";


const ProtectedSignedEnquiry = withAuth(Order_cancelled)


export default function OrderCancelled(){

    return(
        <>
       {/* {loaderState && <Loading/>} */}
       <ProtectedSignedEnquiry/>
       </>
        
    )
}