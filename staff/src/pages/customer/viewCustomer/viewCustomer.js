"use client"
import withAuth from "../../../components/authRoutes";
import View_customer from "../../../components/customers/viewCustomer/viewCustomer";


const ProtectedSignedEnquiry = withAuth(View_customer)


export default function ViewCustomer(){

    return(
        <>
       {/* {loaderState && <Loading/>} */}
       <ProtectedSignedEnquiry/>
       </>
        
    )
}