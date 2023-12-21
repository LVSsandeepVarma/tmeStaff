"use client"
import withAuth from "../../../components/authRoutes";
import Enquiry from "../../../components/enquiry/Enquiry";



const ProtectedFetchEnquiry = withAuth(Enquiry)


export default function FetchEnquiry(){

    return(
        <>
       {/* {loaderState && <Loading/>} */}
       <ProtectedFetchEnquiry/>
       </>
        
    )
}