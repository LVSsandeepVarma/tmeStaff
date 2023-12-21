"use client"
import withAuth from "@/components/authRoutes";
import Staff_History from "@/components/history/history";

const ProtectedStaffHistory = withAuth(Staff_History)


export default function StaffHistory(){

    return(
        <>
       {/* {loaderState && <Loading/>} */}
       <ProtectedStaffHistory/>
       </>
        
    )
}