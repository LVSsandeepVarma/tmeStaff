"use client"
import withAuth from "../../../components/authRoutes";
import OrdersLayout from "../../../components/orders/OrdersLayout";



const ProtectedSignedEnquiry = withAuth(OrdersLayout)


export default function OrderConfirmed(){

    return(
        <>
       {/* {loaderState && <Loading/>} */}
       <ProtectedSignedEnquiry/>
       </>
        
    )
}