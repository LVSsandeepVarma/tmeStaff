"use client"
import withAuth from "../../../components/authRoutes";
import Orderdetails from "../../../components/signedEnquiry/ClientProductDetails";

const ProtectedInvoiceEnquiry = withAuth(Orderdetails)


export default function OrderDetailsEnquiry(){

    return(
        <>
       {/* {loaderState && <Loading/>} */}
       <ProtectedInvoiceEnquiry/>
       </>
        
    )
}