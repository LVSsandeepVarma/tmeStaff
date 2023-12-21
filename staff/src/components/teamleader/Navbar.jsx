import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { BsPerson, BsThreeDots } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { TbBrandDatabricks } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setLoaderFalse, setLoaderTrue } from "../../slice/loaderSlice";
import { setUserInfo } from "../../slice/userInfoSlice";
import axios from "axios";
import { GrClose } from "react-icons/gr";
import { FaEnvelope } from "react-icons/fa6";
import { Card } from "react-bootstrap";

export default function TlNavbar() {
  const [active, setActive] = useState("dashboard");
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");
  const [activityData, setActivityData] = useState([]);
  const pathname = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const loaderState = useSelector((state) => state?.loaderReducer);

  const userData = useSelector((state) => state?.userInfoReducer);

  useEffect(() => {
    if (pathname.pathname.includes("staff")) {
      setActive("staff-list");
    } else {
      setActive("dashboard");
    }

    const fetchUserInfo = async () => {
      try {
        dispatch(setLoaderTrue());
        const token = localStorage.getItem("tmToken");
        const response = await axios.get(
          "https://admin.tradingmaterials.com/api/teamleader/get-user-info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response?.data);
        dispatch(setUserInfo(response?.data));
      } catch (error) {
        // navigate("/login");
        console.error(error);
        if (error?.response?.data?.message?.includes("Unauthenticated")) {
          navigate("/login");
        }
      } finally {
        dispatch(setLoaderFalse());
      }
    };

    fetchUserInfo();
  }, []);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    setActiveTab("Profile");
  };

  useEffect(() => {
    const fetchActivyData = async () => {
      try {
        const token = sessionStorage.getItem("tmToken")?.length
          ? sessionStorage.getItem("tmToken")
          : localStorage.getItem("tmToken");
        const response = await axios.get(
          " https://admin.tradingmaterials.com/api/teamleader/activity",
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
        if (err?.response?.data?.message?.includes("Unauthenticated")) {
          navigate("/login");
        }
      }
    };
    // fetchActivyData();
  }, []);

  // logout functionality
  const handleSignOut = async () => {
    try {
      dispatch(setLoaderTrue());
      const token = sessionStorage.getItem("tmToken")?.length
        ? sessionStorage.getItem("tmToken")
        : localStorage.getItem("tmToken");
      console.log(token, "token");
      const response = await axios.post(
        "https://admin.tradingmaterials.com/api/teamleader/auth/logout",
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
      // setShowTimedErrorModal(true);
      console.log("log out failed", err);
      if (err?.response?.data?.message?.includes("Unauthenticated")) {
        navigate("/login");
      }
      dispatch(setLoaderFalse());
    }
    dispatch(setLoaderFalse());
  };

    const handleLockingScreen = async () => {
      try {
        const token = sessionStorage.getItem("tmToken")?.length
          ? sessionStorage.getItem("tmToken")
          : localStorage.getItem("tmToken");
        const response = await axios.post(
          "https://admin.tradingmaterials.com/api/teamleader/lockout",
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
        if (err?.response?.data?.message?.includes("Unauthenticated")) {
          navigate("/login");
        }
      }
    };

  return (
    <>
      <div className="horizontal-menu !relative">
        <nav className="navbar top-navbar col-lg-12 col-12 p-0 bg-[#25378b] h-[auto] ">
          <div className="container flex justify-around items-center">
            <div className="text-start navbar-brand-wrapper d-flex align-items-center content-start col-lg-4">
              <a className="navbar-brand brand-logo  h-auto !" href="/">
                <img src="/logo-light.png" alt="logo" />
              </a>
              <a
                className="navbar-brand navbar-brand-logo brand-logo-mini"
                href="/"
              >
                <img src="/logo-light.png" alt="brand logo" />
              </a>
            </div>

            <div className=" flex  items-center">
              <BiLockAlt
                className="text-white text-xl mr-2	cursor-pointer"
                onClick={() => {
                  handleLockingScreen();
                }}
              />
              <AiOutlineBell className="text-white text-xl mr-2	" />
              <div className="hidden lg:flex ">
                {/* <div className="relative ml-2">
                    <div className="absolute flex h-full justify-end	 items-center	">
                          < HiOutlineMagnifyingGlass className="mr-[20px]" />
                        </div>
                    <input
                      className="form-control"
                      placeholder="Search"
                      aria-label="search"
                      aria-describedby="search"
                      onChange={handleSearchResult}
                      style={{ backgroundimg: "images/searchIcon.png" }}
                    />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <div>
                      {showSearchRes == true && mainSearchText!=""  ? (
                        <NavSearchResults data={searchData} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div> */}
                <p className="flex items-center truncate !max-w-[100px] text-white  ml-2">
                  {userData?.value?.data?.staff?.name}
                </p>
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
          </div>
        </nav>
        <div className=" bg-slate-100 shadow-sm  p-1 h-auto">
          <div className="container flex justify-start gap-5 items-center">
            <ul className="md:mx-4 d-flex items-center justify-start gap-5">
              <li
                className={`text-sm flex items-center justify-start gap-1 pt-2 cursor-pointer ${
                  active == "dashboard" ? "text-[#25378b]" : ""
                }`}
                onClick={() => navigate("/team-lead/dashboard")}
              >
                <TbBrandDatabricks size={18} /> Dashboard
              </li>
              <li
                className={`text-sm flex items-center justify-start gap-1 pt-2 cursor-pointer ${
                  active == "staff-list" ? "text-[#25378b]" : ""
                }`}
                onClick={() => navigate("/team-lead/staff-list")}
              >
                <IoIosPeople size={18} />
                Staff
              </li>
            </ul>
          </div>
        </div>
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
                <div className="flex items-center justify-center py-2">
                  <div className="profile-pic w-20 h-20 rounded-full bg-zinc-400	ml-2  flex justify-center items-center ">
                    <BsPerson className="" size={40} />
                  </div>
                </div>
                <div className="flex justify-center">
                  <p className="">{userData?.value?.data?.staff?.name}</p>
                </div>
                <div className="flex justify-center flex-grow">
                  <p className="flex justify-center max-w-[225px] truncate">
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
                    {/* <div
                      className="text-center flex flex-col justify-center items-center cursor-pointer"
                      onClick={() => {
                        navigate("/enquiry/customers/dashboard");
                      }}
                    >
                      <IoIosPeople size={18} />

                      <span>Customers</span>
                    </div> */}
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
                              className="timeline-item w-[11rem] sm:w-[16rem]"
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
    </>
  );
}
