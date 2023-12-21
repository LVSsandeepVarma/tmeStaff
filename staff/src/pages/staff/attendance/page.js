"use client"
import AttendancePage from "../../../components/attendence/attendence";
import withAuth from "../../../components/authRoutes";

const ProtectedStaffHistory = withAuth(AttendancePage)


export default function StaffHistory(){

    return(
        <>
       {/* {loaderState && <Loading/>} */}
       <ProtectedStaffHistory/>
       </>
        
    )
}