"use client";
import StaffView from "../../components/teamleader/ViewStaff";
import "bootstrap/dist/css/bootstrap.min.css";
import withAuth from "../../components/authRoutes";

const ProtectedTeamLeadStaffView = withAuth(StaffView);

export default function TeamLeadStaffView() {
  return <ProtectedTeamLeadStaffView />;
}
