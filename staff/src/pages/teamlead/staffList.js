"use client";
import StaffList from "../../components/teamleader/StaffList"
import "bootstrap/dist/css/bootstrap.min.css";
import withAuth from "../../components/authRoutes";

const ProtectedTeamLeadStaffList = withAuth(StaffList);

export default function TeamLeadStaffList() {
  return <ProtectedTeamLeadStaffList />;
}
