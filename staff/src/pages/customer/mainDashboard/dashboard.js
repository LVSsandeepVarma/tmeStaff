"use client"
import withAuth from "../../../components/authRoutes";
import Order_dashboard from "../../../components/customers/dashboard/dashboard";


const ProtectedSignedEnquiry = withAuth(Order_dashboard)


export default function MainOrderDashboard(){

    return(
        <>
       {/* {loaderState && <Loading/>} */}
       <ProtectedSignedEnquiry/>
       </>
        
    )
}