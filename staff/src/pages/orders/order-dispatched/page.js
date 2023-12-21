"use client"
import withAuth from "../../../components/authRoutes";
import Order_dispatched from "../../../components/orders/dispatched/dispatched";


const ProtectedSignedEnquiry = withAuth(Order_dispatched)


export default function OrderDispatched(){

    return(
        <>
       {/* {loaderState && <Loading/>} */}
       <ProtectedSignedEnquiry/>
       </>
        
    )
}