import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/login/page"
import Dashboard from './pages/dashboard/page';
import AssignedFetchEnquiry from './pages/enquiry/assigned-enquiry/page';
import FetchEnquiry from './pages/enquiry/fetch/page';
import LockedScreen from './pages/locked/page';
import ResetPassword from './pages/reset-password/page';
import NewPassword from './pages/reset-password/new-password/page';
import OTP from './pages/reset-password/hash/page';
import StaffAttendance from './pages/staff/attendance/page';
import StaffHistory from './pages/staff/history/page';
import Products from './components/EnquiryCompleted/products';
import SignedEnquiry from './pages/enquiry/signed-enquiry/page';
import OrderDetailsEnquiry from './pages/enquiry/invoice-enquiry/page';
import Invoice_Enquiry from './components/invoiceEnquiry/invoiceEnquiry';
import OrderDashboard from './pages/orders/order-dashboard/page';
import OrderConfirmed from './pages/orders/order-confirmed/page';
import MainOrderDashboard from './pages/customer/mainDashboard/dashboard';
import ViewCustomer from './pages/customer/viewCustomer/viewCustomer';
import TlDashboard from './components/teamleader/Dashboard';
import TlStaffList from './components/teamleader/StaffList';
import TlStaffView from './components/teamleader/ViewStaff';
import TeamLeadDashboard from './pages/teamlead/dashboard';
import TeamLeadStaffList from './pages/teamlead/staffList';
import TeamLeadStaffView from './pages/teamlead/staffView';


function App() {
  
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === 'hidden') {
  //       alert('Do not change the tab until you complete the test.');
  //     }
  //   };
  //   document.addEventListener('visibilitychange', handleVisibilityChange);
  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //   };
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/new/password" element={<NewPassword />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/reset-password/:hash" element={<OTP />}></Route>
        <Route path="/enquiry/fetch" element={<FetchEnquiry />}></Route>
        <Route
          path="/enquiry/assigned-enquiry"
          element={<AssignedFetchEnquiry />}
        ></Route>
        <Route
          path="/enquiry/postponed-enquiry"
          element={<AssignedFetchEnquiry />}
        ></Route>
        <Route
          path="/enquiry/ringing-enquiry"
          element={<AssignedFetchEnquiry />}
        ></Route>
        <Route
          path="/enquiry/not-intersted-enquiry"
          element={<AssignedFetchEnquiry />}
        ></Route>
        <Route
          path="/enquiry/not-todays-postponed-enquiry"
          element={<AssignedFetchEnquiry />}
        ></Route>
        <Route
          path="/enquiry/not-todays-ringing-enquiry"
          element={<AssignedFetchEnquiry />}
        ></Route>
        <Route path="/locked" element={<LockedScreen />}></Route>
        <Route path="/staff/attendance" element={<StaffAttendance />}></Route>
        <Route path="/staff/history" element={<StaffHistory />}></Route>
        <Route path="/enquiry/signed" element={<SignedEnquiry />}></Route>
        <Route
          path="/enquiry/signed/client-details/:client_id"
          element={<OrderDetailsEnquiry />}
        ></Route>
        <Route path="/enquiry/invoice" element={<Invoice_Enquiry />}></Route>
        <Route
          path="/enquiry/orders/placed"
          element={<OrderConfirmed />}
        ></Route>
        <Route
          path="/enquiry/orders/dispatched"
          element={<OrderConfirmed />}
        ></Route>
        <Route
          path="/enquiry/orders/delivered"
          element={<OrderConfirmed />}
        ></Route>
        <Route
          path="/enquiry/orders/returned"
          element={<OrderConfirmed />}
        ></Route>
        <Route
          path="/enquiry/orders/cancelled"
          element={<OrderConfirmed />}
        ></Route>
        <Route
          path="/enquiry/orders/confirmed"
          element={<OrderConfirmed />}
        ></Route>
        <Route
          path="/enquiry/orders/view/:order_id"
          element={<OrderDashboard />}
        ></Route>
        <Route
          path="/enquiry/customers/dashboard"
          element={<MainOrderDashboard />}
        ></Route>
        <Route
          path="/enquiry/customers/view-customer/:client_id"
          element={<ViewCustomer />}
        ></Route>
        <Route
          path="/staff/enquiry-completed/:client_id"
          element={<Products />}
        ></Route>
        <Route
          path="/team-lead/dashboard"
          element={<TeamLeadDashboard />}
        ></Route>
        <Route
          path="/team-lead/staff-list"
          element={<TeamLeadStaffList />}
        ></Route>
        <Route
          path="/team-lead/view-staff/:id"
          element={<TeamLeadStaffView />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
