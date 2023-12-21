import { useEffect, useState } from "react"
import TopNavbar from "../navbar/topNavbar"
import NavbarMarquee from "../navbar/marquee"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "react-bootstrap"
// import { useRouter } from "next/navigation"
import Loading from "../loader/loading"
import { MDBContainer } from "mdbreact";
import { Container, Row, Col } from 'react-bootstrap';
import { BsClock, BsCalendar, BsCheck } from 'react-icons/bs';
import {TbCircleDot} from "react-icons/tb"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import CopyRight from "../copyright/Copyright"


export default function Staff_History() {
    
    const router = useNavigate();
    // const dispatch = useDispatch()
    const userData = useSelector((state) => state?.userInfoReducer)
    const loader = useSelector((state) => state?.loaderReducer)
    const [activityData, setActivityData] = useState([])
    const [enquiryData, setEnquiryData] = useState([])
    const [attendenceData, setAttendanceData] = useState([])
    // console.log(userData, "data")
    useEffect(()=>{
      const fetchActivyData = async()=>{
        try{
          const token = sessionStorage.getItem("tmToken")?.length ? sessionStorage.getItem("tmToken") : localStorage.getItem("tmToken");
        const response =await axios.get(" https://admin.tradingmaterials.com/api/staff/activity", {
          headers :{
            Authorization: `Bearer ${token}`
          }
        })
        console.log(response?.data?.data?.staff_logs)
        setActivityData(response?.data?.data?.staff_logs?.activity);
        setEnquiryData(response?.data?.data?.staff_logs?.enquiry);
        setAttendanceData(response?.data?.data?.staff_logs?.attendance)
        }catch(err){
          console.log("err", err)
        }
      }
      fetchActivyData()
    },[])

    return (
      <>
        {loader?.value == true ? <Loading /> : ""}
        <div className="container-scroller sm:relative top-[0px] sm:top-[60px] md:top-[100px] lg:top-[0px] marqueePosition min-h-[90vh]">
          <TopNavbar />
          <div className="top-[63px] sm:top-[0px]">
            <NavbarMarquee />
          </div>
          <div className="page-header container ">
            <ol className="breadcrumb">
              {/* <!-- breadcrumb --> */}
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item active" aria-current="page">
                history
              </li>
            </ol>
            {/* <!-- End breadcrumb --> */}
            <div className="ml-auto">
              <div className="input-group">
                <a
                  href="#"
                  className="btn !bg-[#25378b] text-white mr-2 btn-sm"
                  data-toggle="tooltip"
                  title=""
                  data-placement="bottom"
                  data-original-title="lock"
                >
                  <span>
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                </a>
              </div>
            </div>
          </div>
          {/* <div className=" page-header container 	"style={{display:"block"}}>
                    <button type="button" onClick={()=>router.push("/enquiry/assigned-enquiry")} className="btn btn-outline-secondary text-white !bg-[#467fcf]  position-relative mr-2 py-2 fs-14"> Assigned | {userData?.value?.data?.enq_counts?.remaining_count} </button>
                    <button type="button" onClick={()=>router.push("/enquiry/ringing-enquiry")} className="btn btn-outline-secondary !text-[#28afd0] position-relative mr-2 py-2 fs-14"> Ringing | {userData?.value?.data?.enq_counts?.ringing} </button>
                    <button type="button" onClick={()=>router.push("/enquiry/postponed-enquiry")} className="btn btn-outline-secondary !text-[#5eba00] position-relative mr-2 py-2 fs-14"> Postponed | {userData?.value?.data?.enq_counts?.postponed} </button>
                    <button type="button" onClick={()=>router.push("/enquiry/not-intersted-enquiry")} className="btn btn-outline-secondary !text-[#f66] position-relative mr-2 py-2 fs-14"> Not Intrested | {userData?.value?.data?.enq_counts?.notin}  </button>
                    <button type="button" onClick={()=>router.push("/enquiry/not-todays-ringing-enquiry")} className="btn btn-outline-secondary !text-[#467fcf] position-relative mr-2 py-2 fs-14"> Total Ringing | {userData?.value?.data?.enq_counts?.t_ring}  </button>
                    <button type="button" onClick={()=>router.push("/enquiry/not-todays-postponed-enquiry")} className="btn btn-outline-secondary  !text-[#ffc107] position-relative mr-2 py-2 fs-14"> Today Postponed | {userData?.value?.data?.enq_counts?.t_post} </button>
                </div> */}
          <div className="container">
            <div className="col-md-12 col-lg-12">
              <Card>
                <Card.Title className="card-header border-bottom py-3 !bg-[#25378b] text-white">
                  History
                </Card.Title>
                <Card.Body>
                  <div className=" row  overglow-scroll w-[full] ">
                    <div className="col-12 col-md-4 overflow-x-hidden min-h-[55vh] max-h-[55vh] mb-5  !overflow-y-visible	">
                      <Card className="mt-[15px]">
                        <Card.Title className="p-[1rem] pb-0">
                          Enquiry
                        </Card.Title>
                        <Card.Body>
                          <div className="timeline">
                            {enquiryData.length > 0 &&
                              enquiryData.map((enq, ind) => (
                                <div
                                  key={`enquiry-${ind}`}
                                  className="timeline-item w-[16rem] sm: w-[16rem] w-[16rem] sm: w-[16rem]"
                                >
                                  <div className="timeline-icon">
                                    <TbCircleDot />
                                  </div>
                                  <div className="timeline-content">
                                    <div className="">
                                      <div>
                                        <h4>{enq.action}</h4>
                                        <p className="pt-3 pb-3">
                                          {enq.result}
                                        </p>
                                      </div>
                                      <div className="flex items-center">
                                        <BsClock className="clock-icon mr-1" />
                                        <p className="time">
                                          {enq?.updated_at?.split("T")[0]}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                    {/* <div className="col-12 col-md-4 overflow-x-hidden min-h-[55vh] max-h-[55vh]  !overflow-y-visible	">
                              <Card className="mt-[15px]">
                                <Card.Title className="p-[1rem] pb-0">Enquiry Transfer Log</Card.Title>
                                <Card.Body>
                                <div className="timeline">
      <div className="timeline-item w-[16rem] sm: w-[16rem]">
        <div className="timeline-icon">
          <TbCircleDot />
        </div>
        <div className="timeline-content">
          <div className="">
            <div className="">
              <h4>Event 1</h4>
              <p>Some description of Event 1</p>
            </div>
              <div className="flex items-center">
                <BsClock className="clock-icon" />
                <p className="time">11/02/1123</p>
            </div>
          </div>
        </div>
      </div>
      <div className="timeline-item w-[16rem] sm: w-[16rem]">
        <div className="timeline-icon">
          <TbCircleDot />
        </div>
        <div className="timeline-content">
          <div className="">
            <div className="">
              <h4>Event 1</h4>
              <p>Some description of Event 1</p>
            </div>
              <div className="flex ">
                <BsClock className="clock-icon" />
                <p className="time">11/02/1123</p>
            </div>
          </div>
        </div>
      </div>
      <div className="timeline-item w-[16rem] sm: w-[16rem]">
        <div className="timeline-icon">
          <TbCircleDot />
        </div>
        <div className="timeline-content">
          <div className="">
            <div className="">
              <h4>Event 1</h4>
              <p>Some description of Event 1</p>
            </div>
              <div className="flex ">
                <BsClock className="clock-icon" />
                <p className="time">11/02/1123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
                                </Card.Body>
                              </Card>
                              </div> */}
                    <div className="col-12 col-md-4 overflow-x-hidden min-h-[55vh] max-h-[55vh]  !overflow-y-visible	">
                      <Card className="mt-[15px]">
                        <Card.Title className="p-[1rem] pb-0">
                          Attendance
                        </Card.Title>
                        <Card.Body>
                          <div className="timeline">
                            {attendenceData?.length > 0 &&
                              attendenceData.map((logs, ind) => (
                                <div
                                  key={`attendance-${ind}`}
                                  className="timeline-item w-[16rem] sm: w-[16rem]"
                                >
                                  <div className="timeline-icon">
                                    <TbCircleDot />
                                  </div>
                                  <div className="timeline-content">
                                    <div className="">
                                      <div className="">
                                        <p>Login time : {logs?.login}</p>
                                        <p>logout time: {logs?.logout}</p>
                                      </div>
                                      {/* <div className="flex ">
                                            <BsClock className="clock-icon" />
                                            <p className="time">11/02/1123</p>
                                        </div> */}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            {/* <div className="timeline-item w-[16rem] sm: w-[16rem]">
                                    <div className="timeline-icon">
                                      <TbCircleDot />
                                    </div>
                                    <div className="timeline-content">
                                      <div className="">
                                        <div className="">
                                          <h4>Event 1</h4>
                                          <p>Some description of Event 1</p>
                                        </div>
                                          <div className="flex ">
                                            <BsClock className="clock-icon" />
                                            <p className="time">11/02/1123</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="timeline-item w-[16rem] sm: w-[16rem]">
                                    <div className="timeline-icon">
                                      <TbCircleDot />
                                    </div>
                                    <div className="timeline-content">
                                      <div className="">
                                        <div className="">
                                          <h4>Event 1</h4>
                                          <p>Some description of Event 1</p>
                                        </div>
                                          <div className="flex ">
                                            <BsClock className="clock-icon" />
                                            <p className="time">11/02/1123</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="timeline-item w-[16rem] sm: w-[16rem]">
                                    <div className="timeline-icon">
                                      <TbCircleDot />
                                    </div>
                                    <div className="timeline-content">
                                      <div className="">
                                        <div className="">
                                          <h4>Event 1</h4>
                                          <p>Some description of Event 1</p>
                                        </div>
                                          <div className="flex ">
                                            <BsClock className="clock-icon" />
                                            <p className="time">11/02/1123</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div> */}
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                    {/* <div className="col-12 col-md-4 overflow-x-hidden min-h-[55vh] max-h-[55vh]  !overflow-y-visible	">
                              <Card className="mt-[15px]">
                                <Card.Title className="p-[1rem] pb-0">Staff Transfer Log</Card.Title>
                                <Card.Body>
                                <div className="timeline">
      <div className="timeline-item w-[16rem] sm: w-[16rem]">
        <div className="timeline-icon">
          <TbCircleDot />
        </div>
        <div className="timeline-content">
          <div className="">
            <div className="">
              <h4>Event 1</h4>
              <p>Some description of Event 1</p>
            </div>
              <div className="flex ">
                <BsClock className="clock-icon" />
                <p className="time">11/02/1123</p>
            </div>
          </div>
        </div>
      </div>
      <div className="timeline-item w-[16rem] sm: w-[16rem]">
        <div className="timeline-icon">
          <TbCircleDot />
        </div>
                <div className="timeline-content">
          <div className="">
            <div className="">
              <h4>Event 1</h4>
              <p>Some description of Event 1</p>
            </div>
              <div className="flex ">
                <BsClock className="clock-icon" />
                <p className="time">11/02/1123</p>
            </div>
          </div>
        </div>
      </div>
      <div className="timeline-item w-[16rem] sm: w-[16rem]">
        <div className="timeline-icon">
          <TbCircleDot />
        </div>
        <div className="timeline-content">
          <div className="">
            <div className="">
              <h4>Event 1</h4>
              <p>Some description of Event 1</p>
            </div>
              <div className="flex ">
                <BsClock className="clock-icon" />
                <p className="time">11/02/1123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
                                </Card.Body>
                              </Card>
                              </div> */}
                    <div className="col-12 col-md-4 overflow-x-hidden min-h-[55vh] max-h-[55vh]  !overflow-y-visible	">
                      <Card className="mt-[15px]">
                        <Card.Title className="p-[1rem] pb-0">
                          Activity
                        </Card.Title>
                        <Card.Body>
                          <div className="timeline">
                            {activityData?.length > 0 &&
                              activityData.map((activity, ind) => (
                                <div
                                  key={`activity-${ind}`}
                                  className="timeline-item w-[16rem] sm: w-[16rem]"
                                >
                                  <div className="timeline-icon">
                                    <TbCircleDot />
                                  </div>
                                  <div className="timeline-content">
                                    <div className="">
                                      <div className="">
                                        <h4>{activity?.action}</h4>
                                        <p>{activity?.result}</p>
                                      </div>
                                      <div className="flex mt-3 items-center">
                                        <BsClock className="clock-icon mr-1" />
                                        <p className="time">
                                          {new Date(
                                            activity?.created_at
                                          ).toLocaleDateString()}{" "}
                                          {new Date(
                                            activity?.created_at
                                          ).toLocaleTimeString()}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            {/* <div className="timeline-item w-[16rem] sm: w-[16rem]">
        <div className="timeline-icon">
          <TbCircleDot />
        </div>
        <div className="timeline-content">
          <div className="">
            <div className="">
              <h4>Event 1</h4>
              <p>Some description of Event 1</p>
            </div>
              <div className="flex ">
                <BsClock className="clock-icon" />
                <p className="time">11/02/1123</p>
            </div>
          </div>
        </div>
      </div>
      <div className="timeline-item w-[16rem] sm: w-[16rem]">
        <div className="timeline-icon">
          <TbCircleDot />
        </div>
        <div className="timeline-content">
          <div className="">
            <div className="">
              <h4>Event 1</h4>
              <p>Some description of Event 1</p>
            </div>
              <div className="flex ">
                <BsClock className="clock-icon" />
                <p className="time">11/02/1123</p>
            </div>
          </div>
        </div>
      </div>
      <div className="timeline-item w-[16rem] sm: w-[16rem]">
        <div className="timeline-icon">
          <TbCircleDot />
        </div>
        <div className="timeline-content">
          <div className="">
            <div className="">
              <h4>Event 1</h4>
              <p>Some description of Event 1</p>
            </div>
              <div className="flex ">
                <BsClock className="clock-icon" />
                <p className="time">11/02/1123</p>
            </div>
          </div>
        </div>
      </div> */}
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <CopyRight />
        </div>
      </>
    );
}