"use client";
import Dashboard from "../../components/teamleader/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import withAuth from "../../components/authRoutes";

const ProtectedTeamLeadDashboard = withAuth(Dashboard);

export default function TeamLeadDashboard() {
  return <ProtectedTeamLeadDashboard />;
}
