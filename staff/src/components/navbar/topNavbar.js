// import Image from "next/image";
import { useNavigate, useLocation } from "react-router-dom";
import "@mdi/font/css/materialdesignicons.min.css";
import { Accordion, Alert, Card } from "react-bootstrap";
// import { MDBBadge } from 'mdb-react-ui-kit';
import { MDBBadge } from "mdbreact";
import { AiOutlineBell } from "react-icons/ai";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useState, useEffect, useRef } from "react";
import { BsClock, BsDisplay, BsPerson, BsThreeDots } from "react-icons/bs";
import { BiLockAlt } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { IoIosPeople } from "react-icons/io";
import { FaUser, FaCog, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../slice/userInfoSlice";
import { setLoaderFalse, setLoaderTrue } from "../../slice/loaderSlice";
// import { usePathname } from "next/navigation";
import Loading from "../loader/loading";
import DayOfWeekDropdown from "./mySalesDropDown";
import CountdownTimer from "../screenLockCountdown/screenlockCountdown";
import NavSearchResults from "./navSearchResults";
import ErrorTimedModal from "../modals/errorModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { TbCircleDot } from "react-icons/tb";
import NotificationAlert from "../alerts/alert";
export default function TopNavbar() {
  const navigate = useNavigate();
  const pathname = useLocation();
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLeftBarExpanded, setIsLeftBarExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");
  const [toggleBottomNavbar, setToggleBottomNavbar] = useState("Dashboard");
  const sidebarRef = useRef(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [showSearchRes, setShowSearchRes] = useState(false);
  const [mainSearchText, setMainSearchText] = useState("")
  const [showTimedErrorModal, setShowTimedErrorModal] = useState(false);
  const [searchData, setSearchData] = useState();
  const leftSideBarRef = useRef(null);
  const [activityData, setActivityData] = useState([]);
  const tokenExpiryStatus = useSelector(
    (state) => state?.tokenExpireReducer?.value
  );
  console.log(tokenExpiryStatus, "tokenExpiryStatus");

  useEffect(() => {
    const fetchActivyData = async () => {
      try {
        const token = sessionStorage.getItem("tmToken")?.length
          ? sessionStorage.getItem("tmToken")
          : localStorage.getItem("tmToken");
        const response = await axios.get(
          " https://admin.tradingmaterials.com/api/staff/activity",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response?.data?.data?.staff_logs);
        setActivityData(response?.data?.data?.staff_logs?.activity);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchActivyData();
  }, []);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    setActiveTab("Profile");
  };

  const handleClose = () => {
    setShowTimedErrorModal(false);
  };
  const loaderState = useSelector((state) => state?.loaderReducer);

  const userData = useSelector((state) => state?.userInfoReducer);

  // logout functionality
  const handleSignOut = async () => {
    try {
      dispatch(setLoaderTrue());
      const token = sessionStorage.getItem("tmToken")?.length
        ? sessionStorage.getItem("tmToken")
        : localStorage.getItem("tmToken");
      console.log(token, "token");
      const response = await axios.post(
        "https://admin.tradingmaterials.com/api/staff/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response?.status) {
        sessionStorage.removeItem("tmToken");
        localStorage.removeItem("tmToken");

        navigate("/login");
      }
    } catch (err) {
      setShowTimedErrorModal(true);
      console.log("log out failed", err);
      dispatch(setLoaderFalse());
    }
    dispatch(setLoaderFalse());
  };
  useEffect(() => {
    dispatch(setLoaderTrue());
    if (pathname.pathname.includes("staff")) {
      setActivePage("staff");
    } else if (pathname.pathname.includes("enquiry/signed")) {
      setActivePage("signed");
    } else if (pathname.pathname.includes("invoice")) {
      setActivePage("invoice");
    } else if (pathname.pathname.includes("enquiry")) {
      if (pathname.pathname.includes("orders")) {
        setActivePage("orders");
      } else if (pathname.pathname.includes("customer")) {
        setActivePage("customer");
      } else {
        setActivePage("enquiry");
      }
    } else if (pathname.pathname.includes("staff")) {
      setActivePage("staff");
    } else {
      setActivePage("dashboard");
    }
    const handleOutsideClick = (event) => {
      if (
        (sidebarRef.current && !sidebarRef.current.contains(event.target)) ||
        (leftSideBarRef.current &&
          !leftSideBarRef.current.contains(event.target))
      ) {
        setIsExpanded(false);
      }
    };

    // document.addEventListener('mousedown', handleOutsideClick);

    // for updateing userinfo
    const fetchUserInfo = async () => {
      try {
        const token = sessionStorage.getItem("tmToken")?.length
          ? sessionStorage.getItem("tmToken")
          : localStorage.getItem("tmToken");
        const response = await axios.get(
          "https://admin.tradingmaterials.com/api/staff/get-user-info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response?.data);
        dispatch(setUserInfo(response?.data));
      } catch (error) {
        navigate("/login");
        console.error(error);
      }
    };

    fetchUserInfo().then(() => {
      dispatch(setLoaderFalse());
    });

    return () => {
      // document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  const handleLockingScreen = async () => {
    try {
      const token = sessionStorage.getItem("tmToken")?.length
        ? sessionStorage.getItem("tmToken")
        : localStorage.getItem("tmToken");
      const response = await axios.post(
        "https://admin.tradingmaterials.com/api/staff/lockout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response?.data?.status);
      if (response?.data?.status) {
        navigate("/locked");
      } else {
        prompt("failed to lock");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleSearchResult = async (event) => {
    
    const searchText = event?.target?.value;
    setMainSearchText(event?.target?.value);
    console.log(searchText,"sText");
    if (searchText == "") {
      setShowSearchRes(false);
      setSearchData()
    } else {
      try {
        dispatch(setLoaderTrue());
        const token = sessionStorage.getItem("tmToken")?.length
          ? sessionStorage.getItem("tmToken")
          : localStorage.getItem("tmToken");
        const response = await axios.get(
          `https://admin.tradingmaterials.com/api/staff/common-search?searchkey=${searchText}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.data?.status) {
          // console.log(response?.data?.data, "searchResults", searchText);
          setSearchData(response?.data?.data);
          setShowSearchRes(true);
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(setLoaderFalse());
      }
    }
  };
  return (
    <>
      {loaderState.value == true ? <Loading /> : ""}
      {tokenExpiryStatus == true && <NotificationAlert />}
      {/* <ErrorTimedModal show={showTimedErrorModal} handleClose={handleClose}/> */}
      <div className="horizontal-menu">
        <nav className="navbar top-navbar col-lg-12 col-12 p-0 bg-[#25378b] h-[auto] ">
          <div className="container md:row">
            <div className="text-start navbar-brand-wrapper d-flex align-items-center content-start col-lg-4">
              <a className="navbar-brand brand-logo  h-auto !" href="/">
                <img src="/logo-light.png" alt="logo" />
              </a>
              <a
                className="navbar-brand navbar-brand-logo brand-logo-mini"
                href="/"
              >
                <img
                  src="/logo-light.png"
                  alt="brand logo"
                  className=""

                  // style={{ width: "auto" }}
                />
              </a>
              <DayOfWeekDropdown />
            </div>
            <div
              className=" d-flex align-items-center justify-end !grow-0	"
              style={{ width: "auto" }}
            >
              <BiLockAlt
                className="text-white text-xl mr-2	cursor-pointer"
                onClick={() => {
                  handleLockingScreen();
                }}
              />
              <AiOutlineBell className="text-white text-xl mr-2	" />
              {/* <p className="align-center text-white  m-0">{userData?.value?.data?.staff?.name}</p>
                  <img src="/images/emptyProfile.png" width={50} height={50} alt="" className="profile-pic w-8 h-8 rounded-full bg-zinc-400	ml-2" /> */}

              <div className=" flex  ">
                <div className="hidden xl:flex ">
                  <div className="relative ml-2">
                    {/* <div className="absolute flex h-full justify-end	 items-center	">
                          < HiOutlineMagnifyingGlass className="mr-[20px]" />
                        </div> */}
                    <input
                      className="form-control"
                      placeholder="Search"
                      aria-label="search"
                      aria-describedby="search"
                      onChange={handleSearchResult}
                      style={{ backgroundImage: "/images/searchIcon.png" }}
                    />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <div>
                      {showSearchRes == true && mainSearchText != "" ? (
                        <NavSearchResults data={searchData} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <p className="flex items-center truncate !max-w-[100px] text-white  ml-2">
                    {userData?.value?.data?.staff?.name}
                  </p>
                  {/* <img
                    src="/images/emptyProfile.png"
                    width={50}
                    height={50}
                    alt=""
                    className="profile-pic w-8 h-8 rounded-full bg-zinc-400	ml-2  flex justify-center items-center"
                  ></img> */}
                  <div className="profile-pic w-8 h-8 rounded-full bg-zinc-400	ml-2  flex justify-center items-center ">
                    <BsPerson className="" size={20} />
                  </div>
                </div>
                <div className="flex items-center !ml-[1rem]">
                  <button className="!text-white	">
                    <BsThreeDots onClick={toggleSidebar} />
                  </button>
                </div>
              </div>
              <button
                className="navbar-toggler bg-white ml-2 navbar-toggler-right d-lg-none md:hidden align-self-center"
                type="button"
                data-bs-toggle="horizontal-menu-toggle"
                onClick={() => setToggleBottomNavbar(!toggleBottomNavbar)}
              >
                <span className="mdi mdi-menu"></span>
              </button>
            </div>
          </div>
        </nav>

        <nav
          className={` ${
            toggleBottomNavbar == true
              ? "bottom-navbar header-toggled"
              : "!hidden md:!block"
          } bottom-navbar header-toggled`}
        >
          <div className="container !flex">
            <ul className="!block sm:!flex !col-md-8 nav  page-navigation !justify-start	">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activePage == "dashboard" ? "nav_active" : ""
                  }`}
                  href="/dashboard"
                >
                  <i
                    className={`mdi mdi-shield-check menu-icon ${
                      activePage == "dashboard" ? "nav_active" : ""
                    }`}
                  ></i>
                  <span
                    className={`"menu-title ${
                      activePage == "dashboard" ? "nav_active" : ""
                    }"`}
                  >
                    Dashboard
                  </span>
                </a>
              </li>
              <li className="lg:hidden md:hidden">
                <div className="">
                  <Accordion className="bg-white border-0">
                    <Accordion.Item className="border-0" eventKey="0">
                      <Accordion.Header className="menu-title !text-xs/[1rem] pl-[5px]	">
                        <i className="mdi mdi-view-headline menu-icon"></i>
                        <span
                          className={`menu-title !pl-[5px] ${
                            activePage == "enquiry" ? "nav_active" : ""
                          } `}
                        >
                          Enquiry
                        </span>{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="submenu">
                          <ul className="!p-[0]">
                            <li
                              className="nav-item !text-[#686868] cursor-pointer"
                              onClick={() => navigate("/enquiry/fetch")}
                            >
                              Fetch
                            </li>
                            <li
                              className="nav-item !text-[#686868] cursor-pointer"
                              onClick={() =>
                                navigate("/enquiry/assigned-enquiry")
                              }
                            >
                              Assigned{" "}
                              <span
                                className=" badge rounded-pill bg-[#25378b] fs-10 ml-2"
                                id="count"
                              >
                                {userData?.value?.data?.enq_counts?.new}{" "}
                              </span>
                            </li>
                            <li
                              className="nav-item !text-[#686868] cursor-pointer"
                              onClick={() =>
                                navigate("/enquiry/ringing-enquiry")
                              }
                            >
                              Ringing{" "}
                              <span
                                className=" badge rounded-pill bg-[#25378b] fs-10 ml-2"
                                id="count"
                              >
                                {userData?.value?.data?.enq_counts?.ringing}
                              </span>
                            </li>
                            <li
                              className="nav-item !text-[#686868] cursor-pointer"
                              onClick={() =>
                                navigate("/enquiry/postponed-enquiry")
                              }
                            >
                              Postponed{" "}
                              <span
                                className=" badge rounded-pill bg-[#25378b] fs-10 ml-2"
                                id="count"
                              >
                                {userData?.value?.data?.enq_counts?.postponed}
                              </span>
                            </li>
                            <li
                              className="nav-item !text-[#686868] cursor-pointer"
                              onClick={() =>
                                navigate("/enquiry/not-intersted-enquiry")
                              }
                            >
                              Not Intrested{" "}
                              <span
                                className=" badge rounded-pill bg-[#25378b] fs-10 ml-2"
                                id="count"
                              >
                                {userData?.value?.data?.enq_counts?.notin}
                              </span>
                            </li>
                            <li
                              className="nav-item !text-[#686868] cursor-pointer"
                              onClick={() =>
                                navigate(
                                  "/enquiry/not-todays-postponed-enquiry"
                                )
                              }
                            >
                              Todays postponed{" "}
                              <span
                                className=" badge rounded-pill bg-[#25378b] fs-10 ml-2"
                                id="count"
                              >
                                {userData?.value?.data?.enq_counts?.t_post}
                              </span>
                            </li>
                            <li
                              className="nav-item !text-[#686868] cursor-pointer"
                              onClick={() =>
                                navigate("/enquiry/not-todays-ringing-enquiry")
                              }
                            >
                              Todays ringing{" "}
                              <span
                                className=" badge rounded-pill bg-[#25378b] fs-10 ml-2"
                                id="count"
                              >
                                {userData?.value?.data?.enq_counts?.t_ring}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </li>
              <li className="!hidden lg:!block md:!block nav-item mega-menu">
                <a href="#" className="nav-link ">
                  <i
                    className={`mdi mdi-view-headline menu-icon ${
                      activePage == "enquiry" ? "nav_active" : ""
                    }`}
                  ></i>
                  <span
                    className={`menu-title ${
                      activePage == "enquiry" ? "nav_active" : ""
                    }`}
                  >
                    Enquiry
                  </span>
                  <span
                    className=" badge rounded-pill bg-[#25378b] fs-10 ml-1"
                    id="count"
                  >
                    {userData?.value?.data?.enq_counts?.ringing +
                      userData?.value?.data?.enq_counts?.new +
                      userData?.value?.data?.enq_counts?.postponed}
                  </span>
                  {/* <i className={"mdi mdi-chevron-down "}></i> */}
                </a>

                <div className={`submenu !left-[60px]`}>
                  <ul className="submenu-item">
                    <li
                      className={`nav-item ${
                        activePage == "fetch" ? "nav_active" : ""
                      }`}
                    >
                      <a className="nav-link" href="/enquiry/fetch">
                        Fetch{" "}
                      </a>
                    </li>
                    <li
                      className={`nav-item ${
                        activePage == "assigned-enquiry" ? "nav_active" : ""
                      }`}
                    >
                      <a className="nav-link" href="/enquiry/assigned-enquiry">
                        Assigned
                        <span
                          className=" badge rounded-pill bg-[#25378b] fs-10 ml-2"
                          id="count"
                        >
                          {userData?.value?.data?.enq_counts?.new}{" "}
                        </span>
                      </a>
                    </li>
                    <li
                      className={`nav-item ${
                        activePage == "ringing-enquiry" ? "nav_active" : ""
                      }`}
                    >
                      <a className="nav-link" href="/enquiry/ringing-enquiry">
                        Ringing
                        <span
                          className=" badge rounded-pill bg-[#25378b] fs-10 ml-2"
                          id="count"
                        >
                          {userData?.value?.data?.enq_counts?.ringing}
                        </span>
                      </a>
                    </li>
                    <li
                      className={`nav-item ${
                        activePage == "postponedenquiry" ? "nav_active" : ""
                      }`}
                    >
                      <a className="nav-link" href="/enquiry/postponed-enquiry">
                        Postponed
                        <span
                          className=" badge rounded-pill bg-[#25378b] fs-10 ml-2"
                          id="count"
                        >
                          {userData?.value?.data?.enq_counts?.postponed}
                        </span>
                      </a>
                    </li>
                    <li
                      className={`nav-item ${
                        activePage == "not-intrested-enquiry"
                          ? "nav_active"
                          : ""
                      }`}
                    >
                      <a
                        className="nav-link"
                        href="/enquiry/not-intersted-enquiry"
                      >
                        Not Intrested
                        <span
                          className=" badge rounded-pill bg-[#25378b] fs-10 ml-2"
                          id="count"
                        >
                          {userData?.value?.data?.enq_counts?.notin}
                        </span>
                      </a>
                    </li>
                    <li
                      className={`nav-item ${
                        activePage == "not-todays-postponed-enquiry"
                          ? "nav_active"
                          : ""
                      }`}
                    >
                      <a
                        className="nav-link"
                        href="/enquiry/not-todays-postponed-enquiry"
                      >
                        Todays postponed
                        <span
                          className=" badge rounded-pill bg-[#25378b] fs-10 ml-2"
                          id="count"
                        >
                          {userData?.value?.data?.enq_counts?.t_post}
                        </span>
                      </a>
                    </li>
                    <li
                      className={`nav-item ${
                        activePage == "not-todays-ringing-enquiry"
                          ? "nav_active"
                          : ""
                      }`}
                    >
                      <a
                        className="nav-link"
                        href="/enquiry/not-todays-ringing-enquiry"
                      >
                        Todays ringing
                        <span
                          className=" badge rounded-pill bg-[#25378b] fs-10 ml-2"
                          id="count"
                        >
                          {userData?.value?.data?.enq_counts?.t_ring}
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="lg:hidden md:hidden">
                <div className="">
                  <Accordion className="bg-white border-0">
                    <Accordion.Item className="border-0" eventKey="0">
                      <Accordion.Header
                        className={`menu-title !text-xs/[1rem] pl-[5px] ${
                          activePage == "staff" ? "nav_active" : ""
                        }	`}
                      >
                        <i
                          className={`mdi mdi-view-headline menu-icon ${
                            activePage == "staff" ? "nav_active" : ""
                          }`}
                        ></i>
                        <span
                          className={`menu-title !pl-[5px] ${
                            activePage == "staff" ? "nav_active" : ""
                          }`}
                        >
                          Staff
                        </span>{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="submenu-item !p-[0]">
                          <li
                            className={`nav-item !text-[#686868] cursor-pointer ${
                              activePage == "history" ? "nav_active" : ""
                            }`}
                            onClick={() => navigate("/staff/history")}
                          >
                            History
                          </li>
                          <li
                            className={`nav-item !text-[#686868] cursor-pointer ${
                              activePage == "attendance" ? "nav_active" : ""
                            }`}
                            onClick={() => navigate("/staff/attendance")}
                          >
                            Attendance
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </li>
              <li className="!hidden lg:!block md:!block nav-item mega-menu">
                <a href="#" className="nav-link ">
                  <i
                    className={`mdi mdi-view-headline menu-icon ${
                      activePage == "staff" ? "nav_active" : ""
                    }`}
                  ></i>
                  <span
                    className={`menu-title ${
                      activePage == "staff" ? "nav_active" : ""
                    }`}
                  >
                    Staff
                  </span>
                  {/* <i className="mdi mdi-chevron-down"></i> */}
                </a>

                <div className={`submenu  !left-[198px]`}>
                  <ul className="submenu-item">
                    <li className="nav-item">
                      <a className="nav-link" href="/staff/history">
                        History{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/staff/attendance">
                        Attendance{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="!hidden lg:!block md:!block nav-item mega-menu">
                <a
                  className={`nav-link ${
                    activePage == "orders" ? "nav_active" : ""
                  }`}
                  href="#"
                >
                  <i
                    className={`mdi mdi-view-headline menu-icon ${
                      activePage == "orders" ? "nav_active" : ""
                    }`}
                  ></i>
                  <span
                    className={`"menu-title ${
                      activePage == "orders" ? "nav_active" : ""
                    }"`}
                  >
                    Orders
                  </span>
                </a>

                <div className={`submenu !left-[285px]`}>
                  <ul className="submenu-item">
                    <li className="nav-item">
                      <a className="nav-link" href="/enquiry/orders/placed">
                        Orders Placed{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/enquiry/orders/confirmed">
                        Orders Confirmed{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/enquiry/orders/dispatched">
                        Orders Dispatched
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/enquiry/orders/delivered">
                        Orders Delivered{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/enquiry/orders/returned">
                        Orders Returned
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/enquiry/orders/cancelled">
                        Orders Cancelled
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="lg:hidden md:hidden">
                <div className="">
                  <Accordion className="bg-white border-0">
                    <Accordion.Item className="border-0" eventKey="0">
                      <Accordion.Header
                        className={`menu-title !text-xs/[1rem] pl-[5px] ${
                          activePage == "staff" ? "nav_active" : ""
                        }	`}
                      >
                        <i
                          className={`mdi mdi-view-headline menu-icon ${
                            activePage == "staff" ? "nav_active" : ""
                          }`}
                        ></i>
                        <span
                          className={`menu-title !pl-[5px] ${
                            activePage == "staff" ? "nav_active" : ""
                          }`}
                        >
                          Orders
                        </span>{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="submenu-item !p-[0]">
                          <li
                            className={`nav-item !text-[#686868] cursor-pointer ${
                              activePage == "customer" ? "nav_active" : ""
                            }`}
                            onClick={() => navigate("/enquiry/orders/placed")}
                          >
                            Orders Placed
                          </li>
                          <li
                            className={`nav-item !text-[#686868] cursor-pointer ${
                              activePage == "customer" ? "nav_active" : ""
                            }`}
                            onClick={() =>
                              navigate("/enquiry/orders/confirmed")
                            }
                          >
                            Orders Confirmed
                          </li>
                          <li
                            className={`nav-item !text-[#686868] cursor-pointer ${
                              activePage == "customer" ? "nav_active" : ""
                            }`}
                            onClick={() =>
                              navigate("/enquiry/orders/dispatched")
                            }
                          >
                            Orders Dispatched
                          </li>
                          <li
                            className={`nav-item !text-[#686868] cursor-pointer ${
                              activePage == "customer" ? "nav_active" : ""
                            }`}
                            onClick={() =>
                              navigate("/enquiry/orders/delivered")
                            }
                          >
                            Orders Delivered
                          </li>
                          <li
                            className={`nav-item !text-[#686868] cursor-pointer ${
                              activePage == "customer" ? "nav_active" : ""
                            }`}
                            onClick={() => navigate("/enquiry/orders/returned")}
                          >
                            Orders Returned
                          </li>
                          <li
                            className={`nav-item !text-[#686868] cursor-pointer ${
                              activePage == "customer" ? "nav_active" : ""
                            }`}
                            onClick={() =>
                              navigate("/enquiry/orders/cancelled")
                            }
                          >
                            Orders Cancelled
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activePage == "customer" ? "nav_active" : ""
                  }`}
                  href="/enquiry/customers/dashboard"
                >
                  <i
                    className={`mdi  mdi-account-group menu-icon ${
                      activePage == "customer" ? "nav_active" : ""
                    }`}
                  ></i>
                  <span
                    className={`"menu-title ${
                      activePage == "customer" ? "nav_active" : ""
                    }"`}
                  >
                    Customer
                  </span>
                </a>
              </li>
            </ul>
            <div className="w-full contents col-md-4  md:!flex justify-end items-center">
              <span className="">
                <b>Login</b> : {userData?.value?.data?.login?.split(" ")[1]} |{" "}
              </span>
              <span className="text-red-500">
                {" "}
                &nbsp; <b>Late</b>:{" "}
                {parseInt(userData?.value?.data?.late_login / 3600) < 10
                  ? `0${parseInt(userData?.value?.data?.late_login / 3600)}`
                  : parseInt(userData?.value?.data?.late_login / 3600)}
                :
                {parseInt(userData?.value?.data?.late_login / 60) < 10
                  ? `0${parseInt(userData?.value?.data?.late_login / 60)}`
                  : parseInt(userData?.value?.data?.late_login / 60)}
                :{userData?.value?.data?.late_login % 60}
              </span>
            </div>
          </div>
        </nav>
      </div>
      {/* side nav bar */}
      <div>
        <div
          ref={sidebarRef}
          className={` z-[9999] fixed inset-y-0 right-0 bg-white w-[20rem]  p-4 transform duration-300 ease-in-out ${
            isExpanded ? "translate-x-0" : "translate-x-full"
          }`}
          // {` top-0 right-0 h-screen w-64 bg-gray-900 text-white flex flex-col items-center transition-transform duration-300 ease-in-out transform ${
          //   isExpanded ? 'translate-x-full' : 'translate-x-0'
          // }`}
        >
          <div className="flex w-full justify-end mr-1">
            <button onClick={() => setIsExpanded(false)}>
              <GrClose />
            </button>
          </div>
          <div>
            {" "}
            {/* tabs in sidebar */}
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "Profile" ? "active" : ""
                  }`}
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="true"
                  onClick={() => setActiveTab("Profile")}
                >
                  Profile
                </button>
              </li>
              {/* <li className="nav-item" role="presentation">
                  <button className={`nav-link ${activeTab === "Chat" ? "active" : ""}`} id="profile-tab" data-bs-toggle="tab" data-bs-target="#chat" type="button" role="tab" aria-controls="chat" aria-selected="false" onClick={() => setActiveTab("Chat")}>Chat</button>
                </li> */}
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "Activity" ? "active" : ""
                  }`}
                  id="activity-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#activity"
                  type="button"
                  role="tab"
                  aria-controls="activity"
                  aria-selected="false"
                  onClick={() => setActiveTab("Activity")}
                >
                  Activity
                </button>
              </li>
              {/* <li className="nav-item" role="presentation">
                  <button className={`nav-link ${activeTab === "Todo" ? "active" : ""}`} id="todo-tab" data-bs-toggle="tab" data-bs-target="#todo" type="button" role="tab" aria-controls="todo" aria-selected="false" onClick={() => setActiveTab("Todo")}>Todo</button>
                </li> */}
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className={`tab-pane fade ${
                  activeTab === "Profile" ? "show active" : ""
                }`}
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="flex items-center justify-center py-4">
                  <div className="profile-pic w-20 h-20 rounded-full bg-zinc-400	ml-2  flex justify-center items-center ">
                    <BsPerson className="" size={40} />
                  </div>
                </div>
                <div className="flex justify-center">
                  <p className="">{userData?.value?.data?.staff?.name}</p>
                </div>
                <div className="flex justify-center flex-grow">
                  <p className="flex flex-grow text-center truncate">
                    {userData?.value?.data?.staff?.email}
                  </p>
                </div>
                {/* <div className="grid ">
                  <label className="mt-2" htmlFor="changePassword">
                    Current Pasword
                  </label>
                  <input
                    className="mt-2 border form-control"
                    id="changePassword"
                    placeholder="Enter Password"
                  />
                  <div className="grid place-items-center mt-3 mb-3">
                    <button className=" w-1/2 btn btn-block btn-primary btn-sm font-weight-medium auth-form-btn	">
                      Submit
                    </button>
                  </div>
                </div> */}

                <div className="flex-1 mt-2">
                  <nav className="flex justify-around items-center ">
                    <div
                      className="text-center flex flex-col justify-center items-center cursor-pointer"
                      onClick={() => {
                        navigate("/enquiry/customers/dashboard");
                      }}
                    >
                      <IoIosPeople size={18} />

                      <span>Customers</span>
                    </div>
                    <div
                      className="text-center flex flex-col justify-center items-center cursor-pointer"
                      onClick={() => handleSignOut()}
                    >
                      <FaEnvelope className="" />
                      <span>Sign out</span>
                    </div>
                    {/* <ul className="space-y-2 text-black flex justify-between 	 items-baseline w-[100%]">
                      <li className=" items-center py-2 cursor-pointer text-center">
                        <FaUser className="ml-2" />
                        <span>Inbox</span>
                      </li>
                      <li className=" items-centerpy-2 cursor-pointer">
                        <FaCog className="ml-2" />
                        <span>Settings</span>
                      </li>
                      <li
                        className=" items-center py-2 cursor-pointer"
                        onClick={() => handleSignOut()}
                      >
                        <FaEnvelope className="ml-2" />
                        <span>Sign out</span>
                      </li>
                    </ul> */}
                  </nav>
                </div>
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "Activity" ? "show active" : ""
                }`}
                id="activity"
                role="tabpanel"
                aria-labelledby="activity-tab"
              >
                <div className="col-12 overflow-x-hidden min-h-[90vh] max-h-[90vh]  !overflow-y-visible	">
                  <Card className="mt-[15px]">
                    <Card.Title className="p-[1rem] pb-0">Activity</Card.Title>
                    <Card.Body>
                      <div className="timeline">
                        {activityData?.length > 0 &&
                          activityData.map((activity, ind) => (
                            <div
                              key={`activity-${ind}`}
                              className="timeline-item w-[11rem] sm: w-[16rem]"
                            >
                              <div className="timeline-icon">
                                <TbCircleDot />
                              </div>
                              <div className="timeline-content">
                                <div className="">
                                  <div className="">
                                    <h4 className="text-sm	">
                                      {activity?.action}
                                    </h4>
                                    <p className="text-xs">
                                      {activity?.result}
                                    </p>
                                  </div>
                                  <div className="flex mt-3 items-center ">
                                    <BsClock className="clock-icon mr-1" />
                                    <small className="time">
                                      {new Date(
                                        activity?.created_at
                                      ).toLocaleDateString()}{" "}
                                      {new Date(
                                        activity?.created_at
                                      ).toLocaleTimeString()}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              {/* <div className={`tab-pane fade ${activeTab === "Todo" ? "show active" : ""}`} id="todo" role="tabpanel" aria-labelledby="todo-tab">todo</div> */}
            </div>
          </div>
        </div>
      </div>
      <CountdownTimer />
    </>
  );
}
