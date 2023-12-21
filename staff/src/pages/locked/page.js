"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import withAuth from "../../components/authRoutes";
import Locked from "../../components/lockedScreen/locked";

const ProtectedLockScreen = withAuth(Locked)

export default function LockedScreen(){
    return <ProtectedLockScreen/>
}


