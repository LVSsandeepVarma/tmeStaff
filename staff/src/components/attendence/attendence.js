import React, { useState } from 'react';
import { Tab, Nav, Button, Table, Form } from 'react-bootstrap';
import TopNavbar from "../navbar/topNavbar"
import NavbarMarquee from "../navbar/marquee"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "react-bootstrap"
// import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { setLoaderFalse, setLoaderTrue } from "../../slice/loaderSlice"
import { BsCalendar, BsCalendar2Check } from 'react-icons/bs';
import { DateRangePicker } from 'rsuite';
import axios from 'axios';
import "rsuite/dist/rsuite.css";
import { useNavigate } from 'react-router-dom';
import TruncateModal from '../modals/truncateModal';
import Loading from '../loader/loading';
import CopyRight from '../copyright/Copyright';



const AttendancePage = () => {
    const navigate = useNavigate() 
    const {combine, allowedMaxDays, before} = DateRangePicker
    const userData = useSelector((state) => state?.userInfoReducer);
    //console.log(userData, "data")
    const loaderState = useSelector((state)=>state.loaderReducer.value)
    const [tab2Content, setTab2Content] = useState("Apply Leave");
    const [selectedDateRange, setSelectedDateRange] = useState(["", ""]);
    const [leaveType, setLeaveType] = useState("");
    const [leaveDesc, setLeaveDesc] = useState("");
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState("");
    const [attendanceData , setAttendanceData] = useState([]);
    const [leaveReqData, setLeaveReqData] = useState([]);
    const [breakTimeData, setBreakTimeData] = useState([]);
    const [deleteStatus, setDeleteStatus] = useState("");
    const [successStatus, setSuccessStatus] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState("");
    const [leaveDateErr, setLeaveDateErr] = useState("");
    const [leaveReqDescErr, setLeaveReqErrDesc] = useState("");
    const [leaveReqTypeErr, setLeaveTypeErr] = useState("");

    const handleShowModal = (info) => {
      setShowModal(true);
      setText(info)
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };


    const dispatch = useDispatch();
    useEffect(()=>{
      const fetchAttendanceData = async()=>{
        try{
          const token = sessionStorage.getItem("tmToken")?.length ? sessionStorage.getItem("tmToken") : localStorage.getItem("tmToken")
          const response = await axios.get(" https://admin.tradingmaterials.com/api/staff/attendance", {
            headers: { 
              Authorization: `Bearer ${token}`
            }
          })
          //console.log(response, response?.data?.data["break-logs"])
          const attendanceinfo = response?.data?.data?.attendance
          const updatedInfo = attendanceinfo.map((val,ind)=>{
            const dateTime = new Date(val.date);
            const month =  dateTime.toLocaleString('default', { month: 'long' });
            const day = dateTime.getDate();
            const weekday = dateTime.toLocaleDateString('default', { weekday: 'long' });
            return {...attendanceinfo[ind], "monthDay":  `${month} ${day}`,"weekday": `${weekday}`}
          })
          //console.log("attendanceinfo",updatedInfo)
          setAttendanceData(updatedInfo)
          setLeaveReqData(response?.data?.data["leave-reqs"])
          const breaklogs = response?.data?.data["break-logs"]
          breaklogs.map((val,ind)=>{
            const totalSeconds = val.break_time; // Example: 3665 seconds

            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            //console.log(formattedTime);
            breaklogs[ind].break_time = formattedTime
          })
          setBreakTimeData(response?.data?.data["break-logs"])

        }catch(err)
        {
          console.log(err)

        }
      }
      fetchAttendanceData();
    },[])
    var today = new Date();
var dd = today.getDate()+2;

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd+2;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
today = yyyy+'/'+mm+'/'+dd;

//console.log(today);
const handleDateRangeChange = (value) => {
  //console.log(value)
  value.map((val,ind)=>{
    console.log(val)
    const date = new Date(val);

    // Get the year, month, and day from the Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0, so we add 1
    const day = String(date.getDate()).padStart(2, "0");
    
    // Format the date as "yyyy/mm/dd"
    const formattedDate = `${year}/${month}/${day}`;
    
    //console.log(formattedDate); // Output: "2023/06/01"
    const timeRange = selectedDateRange
    timeRange[ind] = formattedDate
    setSelectedDateRange([...timeRange])
    setLeaveDateErr("")
  }) 
};

const handleLeaveDesc = (event)=>{
  setLeaveDesc(event.target.value)
  setLeaveReqErrDesc("")
}

const handleLeaveTypeChange = (event)=>{
  setLeaveType(event.target.value);
  setLeaveTypeErr("");
}

const handleSubmit = async(event) => {
  event.preventDefault();
  dispatch(setLoaderTrue())
  //console.log(userData?.value?.data?.staff?.id, "id")
  try{
    console.log(selectedDateRange,leaveType, leaveDesc)
    if(selectedDateRange[0]?.length ==0 || selectedDateRange[1]?.length ==0 ){
      setLeaveDateErr("Date range required");
    }if(leaveType?.length ==0){
      setLeaveTypeErr("Leave type required")
    }if(leaveDesc?.length ==0 ){
      setLeaveReqErrDesc("Description for leave req required")
    }
    if((selectedDateRange[0]?.length !=0 || selectedDateRange[1]?.length !=0) && (leaveType?.length !=0) && (leaveDesc?.length !=0)){
    const formData = new FormData
    formData.append("daterange" , `${selectedDateRange[0]}-${selectedDateRange[1]}`);
    formData.append("reason" , leaveType)
    formData.append("description", leaveDesc)
    formData.append("staff_id", userData?.value?.data?.staff?.id)
  //   [{
  //     daterange : `${selectedDateRange[0]}-${selectedDateRange[1]}`,
  //     reason : leaveType,
  //     description: leaveDesc,
  //     staff_id: userData?.data?.staff?.id
  //  } ]
  const token = sessionStorage.getItem("tmToken")?.length ? sessionStorage.getItem("tmToken") : localStorage.getItem("tmToken")
   const response =await axios.post("https://admin.tradingmaterials.com/api/staff/leave-request", formData,{
    headers:{
      Authorization: `Bearer ${token}`
    }
   })
      if (response?.data?.status) {
        setSuccess(response?.data?.message);
        setTimeout(() => {
          setSuccess("");
          window?.location?.reload();
        }, 2000);
      } else {
        setError([response?.data?.message]);
        setTimeout(() => {
          setError([])
        },2000)
      }
   
   
   //console.log(response)
  //  
  }
  }catch(err){
    //console.log("err", err?.response?.data?.errors)
    const errorsArray = []
    errorsArray[0] = err?.response?.data?.errors?.reason
    errorsArray[1] = err?.response?.data?.errors?.description
    errorsArray[2] = err?.response?.data?.errors?.daterange

    setError(...errorsArray)
    setSuccess("")
    dispatch(setLoaderFalse())

  }
  dispatch(setLoaderFalse())
  // Perform submit logic with selectedDateRange value
  //console.log(selectedDateRange);
};
    useEffect(()=>{
        if(loaderState){
            dispatch(setLoaderFalse())
        }
        else{
            dispatch(setLoaderTrue())
        }
    },[navigate])
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTabTwoContent =()=>{
    if(tab2Content === "Leaves") setTab2Content("Apply Leave")
    else setTab2Content("Leaves")
  }
  //console.log(selectedDateRange, "selected date range")

  const handleDeleteLeaveRequest = (e)=>{
    //console.log(e.target.id)
    const staffIDs = e.target.id?.split("-")
    const id = staffIDs[0]
    const staff_id= staffIDs[1]
    const deleteLeaveRequest = async()=>{
      dispatch(setLoaderTrue())
        try{
          const token = sessionStorage.getItem("tmToken")?.length ? sessionStorage.getItem("tmToken") : localStorage.getItem("tmToken")
          const response = await axios.post("https://admin.tradingmaterials.com/api/staff/leave-request/delete",{
            "id" : id,
            "staff_id":staff_id
          }, {
            headers:{
              Authorization : `Bearer ${token}`
            }
          })
          //console.log(response)
          setSuccessStatus(response?.data?.message);
          // navigate("/staff/attendance")
          window?.location?.reload()
          
        }catch(err){
          setSuccessStatus("")
          setDeleteStatus(err?.response?.data?.message)
          //console.log(err?.response?.data?.message)
          dispatch(setLoaderFalse())
        }
        dispatch(setLoaderFalse())
    }
    deleteLeaveRequest()
  }


  return (
    <>
      {loaderState.value == true ? <Loading /> : ""}
      <div className="container-scroller  min-h-[90vh]">
        <TopNavbar />
        <div className="top-[63px] sm:top-[0px]">
          <NavbarMarquee />
        </div>
        <div className="page-header container ">
          <ol className="breadcrumb">
            {/* <!-- breadcrumb --> */}
            <li className="breadcrumb-item">Dashboard</li>
            <li className="breadcrumb-item active" aria-current="page">
              Attendance
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
        <div className="container">
          <Card>
            <Card.Title className="card-header border-bottom py-3 !bg-[#25378b] text-white">
              Attendance
            </Card.Title>
            <Card.Body>
              <div className="container mx-auto">
                <div className="block sm:flex">
                  <div className="w-[100%] sm:!w-1/4">
                    <Tab.Container
                      activeKey={activeTab}
                      onSelect={handleTabChange}
                    >
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="tab1">
                            <div className=" flex">
                              <BsCalendar className="flex mr-2" />
                              Attendance
                            </div>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="tab2">
                            <div className="flex">
                              <BsCalendar2Check className="flex mr-2" /> Leave
                              Request{" "}
                            </div>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="tab3">
                            <div className="flex">
                              <BsCalendar2Check className="flex mr-2" />
                              Break Time
                            </div>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Tab.Container>
                  </div>
                  <div className="w-[100%] sm:!w-3/4">
                    <div className="flex justify-between items-center mb-4">
                      {activeTab == "tab1" && (
                        <Button variant="primary" disabled>
                          Previous
                        </Button>
                      )}
                      {activeTab == "tab1" && (
                        <h3>
                          {new Date().toLocaleDateString(undefined, {
                            month: "short",
                            year: "numeric",
                          })}
                        </h3>
                      )}
                    </div>
                    {/* {console.log(leaveReqData)} */}
                    {activeTab === "tab1" && (
                      <div className="h-[45vh] overflow-auto">
                        <Table striped bordered>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Day</th>
                              <th>Note</th>
                              <th>Login</th>
                              <th>Logout</th>
                            </tr>
                          </thead>
                          <tbody>
                            {attendanceData?.length > 0 &&
                              attendanceData.map((val, ind) => (
                                <tr key={ind}>
                                  <td
                                    className={`${
                                      val.day == "Sunday" ? "!text-red-600" : ""
                                    } ${
                                      val.note == "absent" ? "!bg-red-200" : ""
                                    }`}
                                  >
                                    {val.monthDay}
                                  </td>
                                  <td
                                    className={`${
                                      val.day == "Sunday" ? "!text-red-600" : ""
                                    } ${
                                      val.note == "absent" ? "!bg-red-200" : ""
                                    }`}
                                  >
                                    {val.day}
                                  </td>
                                  <td
                                    className={`${
                                      val.day == "Sunday" ? "!text-red-600" : ""
                                    } ${
                                      val.note == "absent" ? "!bg-red-200" : ""
                                    }`}
                                  >
                                    {val.note}
                                  </td>
                                  <td
                                    className={`${
                                      val.day == "Sunday" ? "!text-red-600" : ""
                                    } ${
                                      val.note == "absent" ? "!bg-red-200" : ""
                                    }`}
                                  >
                                    {val.login?.split(" ")[1]}
                                  </td>
                                  <td
                                    className={`${
                                      val.day == "Sunday" ? "!text-red-600" : ""
                                    } ${
                                      val.note == "absent" ? "!bg-red-200" : ""
                                    }`}
                                  >
                                    {val.logout?.split(" ")[1]}
                                  </td>
                                </tr>
                              ))}

                            {/* Add more rows as needed */}
                          </tbody>
                        </Table>
                      </div>
                    )}
                    {activeTab === "tab2" && (
                      <div>
                        <div className="flex justify-end items-center mb-4">
                          <Button
                            variant="primary"
                            onClick={() => handleTabTwoContent()}
                          >
                            {tab2Content}
                          </Button>
                          {/* <h3>June 2023</h3> */}
                        </div>
                        {tab2Content === "Apply Leave" && (
                          <>
                            <TruncateModal
                              show={showModal}
                              handleCloseTruncateModal={setShowModal}
                              data={text}
                            />
                            <div className="h-[45vh] overflow-auto">
                              <Table
                                striped
                                bordered
                                className="!table-auto	sm:!table-fixed"
                              >
                                <thead>
                                  <tr>
                                    <th>From date</th>
                                    <th>To Date</th>
                                    <th>Reason</th>
                                    <th>Description</th>
                                    <th>Created at</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* {leaveReqData.map((val,ind)=>{console.log(val,val.from_date, val[ind]?.from_date)})} */}
                                  {leaveReqData?.length > 0 ? (
                                    leaveReqData.map((val, ind) => (
                                      <tr key={ind}>
                                        <td>{val.from_date}</td>
                                        <td>{val.to_date}</td>
                                        <td>{val.reason}</td>
                                        <td
                                          className=" text-truncate !curosr-pointer"
                                          onClick={() =>
                                            handleShowModal(val?.description)
                                          }
                                          style={{ maxWidth: "200px" }}
                                        >
                                          {val.description}
                                        </td>
                                        <td>
                                          {new Date(
                                            val?.created_at
                                          ).toLocaleDateString()}
                                        </td>
                                        <td
                                          className={`${
                                            val.status == 0
                                              ? "!text-orange-700	"
                                              : val.status == 1
                                              ? "!text-teal-900	"
                                              : "!text-red-600"
                                          }}`}
                                        >
                                          {val.status == 0
                                            ? "pending"
                                            : val.status == 1
                                            ? "approved"
                                            : "rejected"}
                                        </td>
                                        <td onClick={handleDeleteLeaveRequest}>
                                          {val.status == 0 ? (
                                            <button
                                              id={`${val.id}-${val.staff_id}`}
                                              className="btn btn-primary-outline"
                                            >
                                              Delete
                                            </button>
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="7" className="text-center">
                                        <p className="text-muted">
                                          No data available in table
                                        </p>
                                      </td>
                                    </tr>
                                  )}
                                  {/* Add more rows as needed */}
                                </tbody>
                              </Table>
                            </div>
                            <p
                              className={`${
                                deleteStatus?.length > 0 ? "!text-red-800" : ""
                              }`}
                            >
                              {deleteStatus}
                            </p>
                            <p
                              className={`${
                                successStatus?.length > 0
                                  ? "!text-green-800"
                                  : ""
                              }`}
                            >
                              {successStatus}
                            </p>
                          </>
                        )}
                        {tab2Content === "Leaves" && (
                          <div>
                            <Card>
                              <Card.Header>Leave Request</Card.Header>
                              <Card.Body>
                                <Form>
                                  <Form.Group>
                                    <Form.Label className="!block">
                                      Date Range
                                    </Form.Label>
                                    <DateRangePicker
                                      placeholder="yyyy-mm-dd ~ yyyy-mm-dd"
                                      // format='yyyy/mm/dd'
                                      disabledDate={combine(
                                        allowedMaxDays(4),
                                        before(today)
                                      )}
                                      // value={[selectedDateRange[0], selectedDateRange[1]]}
                                      onOk={handleDateRangeChange}
                                    />
                                    {/* <Form.Control type="text" placeholder="Select dates" /> */}
                                    <p className="text-red-600 normal-case">
                                      {leaveDateErr}
                                    </p>
                                  </Form.Group>

                                  <Form.Group>
                                    <Form.Label className="!block">
                                      Reason
                                    </Form.Label>
                                    <Form.Select
                                      onChange={handleLeaveTypeChange}
                                    >
                                      <option value="">
                                        Select leave type
                                      </option>
                                      <option value="casual">
                                        Casual Leave
                                      </option>
                                      <option value="sick">Sick Leave</option>
                                      <option value="emergency">
                                        Emergency Leave
                                      </option>
                                      <option value="emergency">Other</option>
                                    </Form.Select>
                                    {/* <Form.Control type="text" placeholder="Select dates" /> */}
                                  </Form.Group>
                                  <p className="text-red-600">
                                    {leaveReqTypeErr}
                                  </p>
                                  <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                      as="textarea"
                                      rows={3}
                                      onChange={handleLeaveDesc}
                                    />
                                  </Form.Group>
                                  <p className="text-red-600">
                                    {leaveReqDescErr}
                                  </p>
                                </Form>
                              </Card.Body>
                              <Card.Footer>
                                {success?.length > 0 && (
                                  <p className="text-green-600">{success}</p>
                                )}
                                {error?.map((er, ind) => {
                                  console.log(er);
                                })}
                                {error?.length > 0 &&
                                  error.map((er, ind) => (
                                    <p key={ind} className="text-red-600">
                                      {er}
                                    </p>
                                  ))}
                                <Button
                                  variant="primary"
                                  onClick={handleSubmit}
                                  block
                                >
                                  Submit
                                </Button>
                              </Card.Footer>
                            </Card>
                          </div>
                        )}
                      </div>
                    )}
                    {activeTab === "tab3" && (
                      <div className="h-[45vh] overflow-auto">
                        <Table responsive striped bordered>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>lockout</th>
                              <th>Login</th>
                              <th>Break time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {breakTimeData.length > 0 &&
                              breakTimeData.map((val, ind) => (
                                <tr key={ind}>
                                  <td>{val.date}</td>
                                  <td>{val.lock_out}</td>
                                  <td>{val.log_in}</td>
                                  <td>{val.break_time}</td>
                                </tr>
                              ))}
                            {/* Add more rows as needed */}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="mt-5 flex justify-center">
        <CopyRight />
      </div>
    </>
  );
};

export default AttendancePage;
