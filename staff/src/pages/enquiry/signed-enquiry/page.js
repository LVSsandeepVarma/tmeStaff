"use client"
import withAuth from "../../../components/authRoutes";
import Signed_enquiry from "../../../components/signedEnquiry/signedEnquiry";


const ProtectedSignedEnquiry = withAuth(Signed_enquiry)


export default function SignedEnquiry(){

    return(
        <>
       {/* {loaderState && <Loading/>} */}
       <ProtectedSignedEnquiry/>
       </>
        
    )
}