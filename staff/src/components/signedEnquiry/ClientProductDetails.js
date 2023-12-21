import React, { useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import TopNavbar from "../navbar/topNavbar";
import NavbarMarquee from "../navbar/marquee";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
// import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { setLoaderFalse, setLoaderTrue } from "../../slice/loaderSlice";
import { BsFillCartXFill } from "react-icons/bs";
import {
  FaRegAddressBook,
  FaCartArrowDown,
  FaFileInvoice,
} from "react-icons/fa";
import { DateRangePicker } from "rsuite";
import axios from "axios";
import "rsuite/dist/rsuite.css";
import { useNavigate } from "react-router-dom";
import Loading from "../loader/loading";
import OrderTable from "./ordersTable";
import UnpaidOrderTable from "./unpaidOrdersTable";
import CanceledOrderTable from "./canceledOrdersTable";
import LastOrder from "./personalDetailsForm";

const Orderdetails = () => {
  const navigate = useNavigate();
  const { combine, allowedMaxDays, before } = DateRangePicker;
  const userData = useSelector((state) => state?.userInfoReducer);
  //console.log(userData, "data")
  const loaderState = useSelector((state) => state.loaderReducer.value);
  const [tab2Content, setTab2Content] = useState("leaves");
  const [selectedDateRange, setSelectedDateRange] = useState(["", ""]);
  const [leaveType, setLeaveType] = useState("");
  const [leaveDesc, setLeaveDesc] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveReqData, setLeaveReqData] = useState([]);
  const [breakTimeData, setBreakTimeData] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState("");
  const [successStatus, setSuccessStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");

  const handleShowModal = (info) => {
    setShowModal(true);
    setText(info);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const token = sessionStorage.getItem("tmToken")?.length
          ? sessionStorage.getItem("tmToken")
          : localStorage.getItem("tmToken");
        const response = await axios.get(
          " https://admin.tradingmaterials.com/api/staff/attendance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //console.log(response, response?.data?.data["break-logs"])
        const attendanceinfo = response?.data?.data?.attendance;
        const updatedInfo = attendanceinfo.map((val, ind) => {
          const dateTime = new Date(val.date);
          const month = dateTime.toLocaleString("default", { month: "long" });
          const day = dateTime.getDate();
          const weekday = dateTime.toLocaleDateString("default", {
            weekday: "long",
          });
          return {
            ...attendanceinfo[ind],
            monthDay: `${month} ${day}`,
            weekday: `${weekday}`,
          };
        });
        //console.log("attendanceinfo",updatedInfo)
        setAttendanceData(updatedInfo);
        setLeaveReqData(response?.data?.data["leave-reqs"]);
        const breaklogs = response?.data?.data["break-logs"];
        breaklogs.map((val, ind) => {
          const totalSeconds = val.break_time; // Example: 3665 seconds

          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;

          const formattedTime = `${String(hours).padStart(2, "0")}:${String(
            minutes
          ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

          //console.log(formattedTime);
          breaklogs[ind].break_time = formattedTime;
        });
        setBreakTimeData(response?.data?.data["break-logs"]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAttendanceData();
  }, []);
  var today = new Date();
  var dd = today.getDate() + 2;

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd + 2;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "/" + mm + "/" + dd;

  //console.log(today);
  const handleDateRangeChange = (value) => {
    //console.log(value)
    value.map((val, ind) => {
      //console.log(val)
      const date = new Date(val);

      // Get the year, month, and day from the Date object
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0, so we add 1
      const day = String(date.getDate()).padStart(2, "0");

      // Format the date as "yyyy/mm/dd"
      const formattedDate = `${year}/${month}/${day}`;

      //console.log(formattedDate); // Output: "2023/06/01"
      const timeRange = selectedDateRange;
      timeRange[ind] = formattedDate;
      setSelectedDateRange([...timeRange]);
    });
  };

  const handleLeaveDesc = (event) => {
    setLeaveDesc(event.target.value);
  };

  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoaderTrue());
    //console.log(userData?.value?.data?.staff?.id, "id")
    try {
      const formData = new FormData();
      formData.append(
        "daterange",
        `${selectedDateRange[0]}-${selectedDateRange[1]}`
      );
      formData.append("reason", leaveType);
      formData.append("description", leaveDesc);
      formData.append("staff_id", userData?.value?.data?.staff?.id);
      //   [{
      //     daterange : `${selectedDateRange[0]}-${selectedDateRange[1]}`,
      //     reason : leaveType,
      //     description: leaveDesc,
      //     staff_id: userData?.data?.staff?.id
      //  } ]
      const token = sessionStorage.getItem("tmToken")?.length
        ? sessionStorage.getItem("tmToken")
        : localStorage.getItem("tmToken");
      const response = await axios.post(
        "https://admin.tradingmaterials.com/api/staff/leave-request",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setError([]);
      setSuccess(response?.data?.message);
      //console.log(response)
      window?.location?.reload();
    } catch (err) {
      //console.log("err", err?.response?.data?.errors)
      const errorsArray = [];
      errorsArray[0] = err?.response?.data?.errors?.reason;
      errorsArray[1] = err?.response?.data?.errors?.description;
      errorsArray[2] = err?.response?.data?.errors?.daterange;

      setError(...errorsArray);
      setSuccess("");
      dispatch(setLoaderFalse());
    }
    dispatch(setLoaderFalse());
    // Perform submit logic with selectedDateRange value
    //console.log(selectedDateRange);
  };
  useEffect(() => {
    if (loaderState) {
      dispatch(setLoaderFalse());
    } else {
      dispatch(setLoaderTrue());
    }
  }, [navigate]);
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTabTwoContent = () => {
    if (tab2Content === "leaves") setTab2Content("apply leave");
    else setTab2Content("leaves");
  };
  //console.log(selectedDateRange, "selected date range")

  const handleDeleteLeaveRequest = (e) => {
    //console.log(e.target.id)
    const staffIDs = e.target.id?.split("-");
    const id = staffIDs[0];
    const staff_id = staffIDs[1];
    const deleteLeaveRequest = async () => {
      dispatch(setLoaderTrue());
      try {
        const token = sessionStorage.getItem("tmToken")?.length
          ? sessionStorage.getItem("tmToken")
          : localStorage.getItem("tmToken");
        const response = await axios.post(
          "https://admin.tradingmaterials.com/api/staff/leave-request/delete",
          {
            id: id,
            staff_id: staff_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //console.log(response)
        setSuccessStatus(response?.data?.message);
        // navigate("/staff/attendance")
        window?.location?.reload();
      } catch (err) {
        setSuccessStatus("");
        setDeleteStatus(err?.response?.data?.message);
        //console.log(err?.response?.data?.message)
        dispatch(setLoaderFalse());
      }
      dispatch(setLoaderFalse());
    };
    deleteLeaveRequest();
  };

  return (
    <>
      {loaderState.value == true ? <Loading /> : ""}
      <div className="container-scroller sm:relative top-[0px] sm:top-[60px] md:top-[100px] lg:top-[0px] marqueePosition">
                <TopNavbar />
                <div className="top-[63px] sm:top-[0px]">
                    <NavbarMarquee />
                </div>
        <div className="page-header container ">
          <ol className="breadcrumb">
            {/* <!-- breadcrumb --> */}
            <li className="breadcrumb-item">Dashboard</li>
            <li className="breadcrumb-item active" aria-current="page">
              Signed
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
        {/* <div className=" page-header container " style={{display:"block"}}>
                    <button type="button" onClick={()=>navigate("/enquiry/assigned-enquiry")} className="btn btn-outline-secondary  !text-[#467fcf]  position-relative mr-2 py-2 fs-14"> Assigned | {userData?.value?.data?.enq_counts?.remaining_count} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/ringing-enquiry")} className="btn btn-outline-secondary textwhite  !bg-[#28afd0] position-relative mr-2 py-2 fs-14"> Ringing | {userData?.value?.data?.enq_counts?.ringing} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/postponed-enquiry")} className="btn btn-outline-secondary !text-[#5eba00] position-relative mr-2 py-2 fs-14"> Postponed | {userData?.value?.data?.enq_counts?.postponed} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/not-intersted-enquiry")} className="btn btn-outline-secondary  !text-[#f66] position-relative mr-2 py-2 fs-14"> Not Intrested | {userData?.value?.data?.enq_counts?.notin}  </button>
                    <button type="button" onClick={()=>navigate("/enquiry/not-todays-ringing-enquiry")} className="btn btn-outline-secondary !text-[#467fcf] position-relative mr-2 py-2 fs-14"> Total Ringing | {userData?.value?.data?.enq_counts?.t_ring}  </button>
                    <button type="button" onClick={()=>navigate("/enquiry/not-todays-postponed-enquiry")} className="btn btn-outline-secondary  !text-[#ffc107] position-relative mr-2 py-2 fs-14"> Today Postponed | {userData?.value?.data?.enq_counts?.t_post} </button>
                </div> */}
        <div className="container">
          <Card>
            <Card.Title className="card-header border-bottom py-3 !bg-[#25378b] text-white">
              Order Details
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
                              <FaRegAddressBook className="flex mr-2" />
                              Last Order
                            </div>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="tab2">
                            <div className="flex">
                              <FaCartArrowDown className="flex mr-2" /> Orders{" "}
                            </div>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="tab3">
                            <div className="flex">
                              <FaFileInvoice className="flex mr-2" />
                              Unpaid Orders
                            </div>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="tab4">
                            <div className="flex">
                              <BsFillCartXFill className="flex mr-2" />
                              Cancelled Orders
                            </div>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Tab.Container>
                  </div>
                  <div className="w-[100%] sm:!w-3/4">
                    {/* {activeTab !== 'tab1' && <div className="flex justify-between items-center mb-4">
            <Button variant="primary">Previous</Button>
            <h3>June 2023</h3>
          </div>} */}
                    {/* {console.log(leaveReqData)} */}
                    {activeTab === "tab1" && (
                      <div>
                        {/* <div className='overflow-x-hidden'>
                <fieldset className='border border-indigo-600' style={{background:"aliceblue"}}>
                    <legend className='!ml-2'>Personal Details:</legend>
                    <div className='row !ml-2 mt-2 mb-2'>
                        <div className='col-md-4'>
                            <span><b>Name</b></span>
                            <p>Sandeep</p>
                        </div>
                        <div className='col-md-4'>
                            <span><b>email</b></span>
                            <p>Sandeep@gmail.com</p>
                        </div>
                        <div className='col-md-4'>
                            <span><b>Phone</b></span>
                            <p>7901003266</p>
                        </div>
                    </div>
                </fieldset>
                <fieldset className='border border-indigo-600 mt-4' style={{background:"aliceblue"}}>
                    <legend className='!ml-2'>Billing Details:</legend>
                    <div className='row !ml-2 mt-2 mb-2'>
                        <div className='col-md-3'>
                            <span><b>City</b></span>
                            <p>Banglore</p>
                        </div>
                        <div className='col-md-3'>
                            <span><b>State</b></span>
                            <p>Karnataka</p>
                        </div>
                        <div className='col-md-3'>
                            <span><b>Zipcode</b></span>
                            <p>506602</p>
                        </div>
                        <div className='col-md-3'>
                            <span><b>Country</b></span>
                            <p>India</p>
                        </div>
                    </div>
                    <div className='row !ml-2'>
                        <div className='col-10  mt-2 mb-2'>
                            <span><b>Address</b></span>
                            <p>address ..................</p>
                        </div>
                    </div>
                </fieldset>
                <fieldset className='border border-indigo-600 mt-4' style={{background:"aliceblue"}}>
                    <legend className='!ml-2'>Shipping Details:</legend>
                    <div className='row !ml-2 mt-2 mb-2'>
                    <div className='col-md-3'>
                            <span><b>Name</b></span>
                            <p>Sandeep</p>
                        </div>
                        <div className='col-md-3'>
                            <span><b>City</b></span>
                            <p>Banglore</p>
                        </div>
                        <div className='col-md-3'>
                            <span><b>State</b></span>
                            <p>Karnataka</p>
                        </div>
                        <div className='col-md-3'>
                            <span><b>Country</b></span>
                            <p>India</p>
                        </div>
                    </div>
                    <div className='row !ml-2'>
                        <div className='col-10 mt-2 mb-2'>
                            <span><b>Address</b></span>
                            <p>address ..................</p>
                        </div>
                    </div>
                </fieldset>
            </div> */}
                        <LastOrder/>
                      </div>
                    )}
                    {activeTab === "tab2" && (
                      <div className="h-[45vh] overflow-y-auto !overflow-x-visible sm:!overflow-x-hidden">
                        <OrderTable />
                      </div>
                    )}
                    {activeTab === "tab3" && (
                      <div className="h-[45vh] overflow-y-auto !overflow-x-visible sm:!overflow-x-hidden">
                        <UnpaidOrderTable />
                      </div>
                    )}
                    {activeTab === "tab4" && (
                      <div className="h-[45vh] overflow-y-auto !overflow-x-visible sm:!overflow-x-hidden">
                        <CanceledOrderTable/>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Orderdetails;
