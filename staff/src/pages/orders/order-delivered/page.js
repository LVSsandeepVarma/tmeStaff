"use client"
import withAuth from "../../../components/authRoutes";
import Order_delivered from "../../../components/orders/delivered/delivered";


const ProtectedSignedEnquiry = withAuth(Order_delivered)


export default function OrderDelivered(){

    return(
        <>
       {/* {loaderState && <Loading/>} */}
       <ProtectedSignedEnquiry/>
       </>
        
    )
}