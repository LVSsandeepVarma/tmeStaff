"use client"
// import { RotatingLines } from "react-loader-spinner"
import { Spinner } from 'react-bootstrap';


export default function Loading(){
    return (
        // <div className="spinner-modal-container ">
        // <div className="spinner-modal" style={{zIndex:9999}}>
        // <RotatingLines
        //     strokeColor="grey"
        //     strokeWidth="5"
        //     animationDuration="0.75"
        //     width="50"
        //     visible={true}
        // />
        // </div>
        // </div>
        <div
      className="fixed inset-0 flex items-center justify-center bg-transparent z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
    )
}