"use client"
import withAuth from "../../../components/authRoutes";
import Order_placed from "../../../components/orders/placed/placed";


const ProtectedSignedEnquiry = withAuth(Order_placed)


export default function OrderPlaced(){

    return(
        <>
       {/* {loaderState && <Loading/>} */}
       <ProtectedSignedEnquiry/>
       </>
        
    )
}