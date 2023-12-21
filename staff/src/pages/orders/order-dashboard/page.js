"use client"
import withAuth from "../../../components/authRoutes";
import order_Dashboard from "../../../components/orders/dashboard/orderDashboard";


const ProtectedSignedEnquiry = withAuth(order_Dashboard)


export default function OrderDashboard(){

    return(
        <>
       {/* {loaderState && <Loading/>} */}
       <ProtectedSignedEnquiry/>
       </>
        
    )
}