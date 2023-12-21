// todays_postponed

import TopNavbar from "../navbar/topNavbar"
import NavbarMarquee from "../navbar/marquee"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "react-bootstrap"
// import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { setLoaderFalse, setLoaderTrue } from "../../slice/loaderSlice"
import { useNavigate } from "react-router-dom"
import InvoiceTable from "./invoiceTable"
export default function Invoice_Enquiry() {
    const navigate = useNavigate() 
    const userData = useSelector((state) => state?.userInfoReducer)
    console.log(userData, "data")
    const loaderState = useSelector((state)=>state.loaderReducer.value)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(loaderState){
            dispatch(setLoaderFalse())
        }
        else{
            dispatch(setLoaderTrue())
        }
    },[navigate])
    return (
        <>
            <div className="container-scroller sm:relative top-[0px] sm:top-[60px] md:top-[100px] lg:top-[0px] marqueePosition">
                <TopNavbar />
                <div className="top-[63px] sm:top-[0px]">
                    <NavbarMarquee />
                </div>
                <div className="page-header container ">
                    <ol className="breadcrumb">
                        {/* <!-- breadcrumb --> */}
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item active" aria-current="page">Signed</li>
                    </ol>
                    {/* <!-- End breadcrumb --> */}
                    <div className="ml-auto">
                        <div className="input-group">
                            <a href="#" className="btn !bg-[#25378b] text-white mr-2 btn-sm" data-toggle="tooltip" title="" data-placement="bottom" data-original-title="lock">
                                <span>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                {/* <div className=" page-header container " style={{display:"block"}}>
                    <button type="button" onClick={()=>navigate("/enquiry/assigned-enquiry")} className="btn btn-outline-secondary  !text-[#467fcf]  position-relative mr-2 py-2 fs-14"> Assigned | {userData?.value?.data?.enq_counts?.new} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/ringing-enquiry")} className="btn btn-outline-secondary text-white  !bg-[#28afd0] position-relative mr-2 py-2 fs-14"> Ringing | {userData?.value?.data?.enq_counts?.ringing} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/postponed-enquiry")} className="btn btn-outline-secondary !text-[#5eba00] position-relative mr-2 py-2 fs-14"> Postponed | {userData?.value?.data?.enq_counts?.postponed} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/not-intersted-enquiry")} className="btn btn-outline-secondary  !text-[#f66] position-relative mr-2 py-2 fs-14"> Not Intrested | {userData?.value?.data?.enq_counts?.notin}  </button>
                    <button type="button" onClick={()=>navigate("/enquiry/not-todays-ringing-enquiry")} className="btn btn-outline-secondary !text-[#467fcf] position-relative mr-2 py-2 fs-14"> Today Ringing | {userData?.value?.data?.enq_counts?.t_ring}  </button>
                    <button type="button" onClick={()=>navigate("/enquiry/not-todays-postponed-enquiry")} className="btn btn-outline-secondary  !text-[#ffc107] position-relative mr-2 py-2 fs-14"> Today Postponed | {userData?.value?.data?.enq_counts?.t_post} </button>

                </div> */}
                <div className="container">
                    <Card>
                        <Card.Title className="card-header border-bottom py-3 !bg-[#25378b] text-white">Ringing Enquiries</Card.Title>
                        <Card.Body>
                            <InvoiceTable/>
                        </Card.Body>
                    </Card>
                </div>
                </div>
                </>
    )
}