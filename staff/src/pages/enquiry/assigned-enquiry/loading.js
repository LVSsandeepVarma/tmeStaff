"use client"
import { RotatingLines } from "react-loader-spinner"

export default function Loading(){
    return (
        <div className="spinner-modal-container">
        <div className="spinner-modal h-[100vh] overflow-hidden d-flex align-items-center justify-content-center">
        <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
        />
        </div>
        </div>
    )
}