"use client"
import DashboardContent from "../../components/dashboard/dashboardComponent"
import 'bootstrap/dist/css/bootstrap.min.css';
import withAuth from "../../components/authRoutes";

const ProtectedDashboard = withAuth(DashboardContent)

export default function Dashboard(){
    return <ProtectedDashboard/>
}


