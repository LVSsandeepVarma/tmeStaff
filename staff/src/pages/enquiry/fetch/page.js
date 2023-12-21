"use client"
import Fetch_Enquiry from "../../../components/fetchEnquiry/fetch";
import withAuth from "../../../components/authRoutes";

const ProtectedFetchEnquiry = withAuth(Fetch_Enquiry)


export default function FetchEnquiry(){
    return(
        <ProtectedFetchEnquiry/>
    )
}