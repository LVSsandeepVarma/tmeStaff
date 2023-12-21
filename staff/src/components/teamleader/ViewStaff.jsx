import { useEffect, useState } from "react";
import TlNavbar from "./Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { MdAssignmentAdd, MdCancel, MdCoPresent, MdNotInterested, MdPhoneInTalk, MdPlaylistAddCircle, MdWatchLater, MdWifiCalling } from "react-icons/md";
import { FaBox, FaBoxesStacked, FaClock, FaPhoneVolume, FaTimeline, FaTruckRampBox } from "react-icons/fa6";
import CopyRight from "../copyright/Copyright";
import { BiPhoneCall } from "react-icons/bi";
import { GiConfirmed } from "react-icons/gi";
import { TbTruckReturn } from "react-icons/tb";
import { Divider } from "@mui/material";


export default function TlStaffView() {
  const [tlStaffView, setStaffView] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate()
  const params = useParams();
  useEffect(() => {
    const fetchStaffView = async () => {
      try {
        const response = await axios.get(
          `https://admin.tradingmaterials.com/api/teamleader/view-staff?staff_id=${params?.id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("tmToken"),
              Accept: "application/json",
            },
          }
        );
        console.log(response?.data);
        setStaffView(response?.data?.data);
      } catch (err) {
        console.log(err);
        console.log(err?.response?.data?.message)
        if (err?.response?.data?.message?.includes("Unauthenticated")) {
          navigate("/login");
        }
      }
    };
    fetchStaffView();
  }, []);
  return (
    <>
      <TlNavbar />
      <>
        <div className="main-panel bg-white">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-3 col-sm-4 col-12">
                <ul className="nav nav-tabs nav-tabs-vertical" role="tablist">
                  <li
                    onClick={() => setActiveTab(1)}
                    className={`nav-item cursor-pointer ${
                      activeTab == 1 ? "!text-white !bg-[#25378b]" : ""
                    }`}
                  >
                    <a
                      className={`nav-link !no-underline !flex items-center justify-between !font-semibold text-lg ${
                        activeTab == 1
                          ? "!text-white !bg-[#25378b] shadow-blue-800 shadow"
                          : ""
                      }`}
                    >
                      Enquires count
                      <MdPhoneInTalk size={18} />
                    </a>
                  </li>
                  <li
                    className={`nav-item cursor-pointer ${
                      activeTab == 2 ? "text-white bg-[#25378b]" : ""
                    }`}
                    onClick={() => setActiveTab(2)}
                  >
                    <a
                      className={`nav-link !no-underline !flex items-center justify-between !font-semibold text-lg ${
                        activeTab == 2
                          ? "!text-white !bg-[#25378b] shadow-blue-800 shadow"
                          : ""
                      }`}
                    >
                      Orders count
                      <FaBoxesStacked size={18} />
                    </a>
                  </li>
                  <li
                    className={`nav-item cursor-pointer ${
                      activeTab == 3 ? "text-white bg-[#25378b]" : ""
                    }`}
                    onClick={() => setActiveTab(3)}
                  >
                    <a
                      className={`nav-link  !no-underline !flex items-center justify-between !font-semibold text-lg ${
                        activeTab == 3
                          ? "!text-white !bg-[#25378b] shadow-blue-800 shadow"
                          : ""
                      }`}
                    >
                      Attendance
                      <MdCoPresent size={18} />
                    </a>
                  </li>
                  <li
                    className={`nav-item cursor-pointer  ${
                      activeTab == 4 ? "text-white bg-[#25378b]" : ""
                    }`}
                    onClick={() => setActiveTab(4)}
                  >
                    <a
                      className={`nav-link !no-underline !flex items-center justify-between !font-semibold text-lg ${
                        activeTab == 4
                          ? "!text-white !bg-[#25378b] shadow-blue-800 shadow"
                          : ""
                      }`}
                    >
                      logs
                      <FaTimeline size={18} />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-9 col-sm-8 col-12">
                <div className="tab-content !pt-0 tab-content-vertical shadow bg-white">
                  <div className="p-3 flex gap-3 items-center flex-wrap ">
                    <div className="profile ">
                      <img
                        src="/images/blueProfile.png"
                        width={75}
                        alt="staff_pic"
                      />
                    </div>
                    <div className="">
                      <p className="font-bold">{tlStaffView?.staff?.name}</p>
                      <p className="font-bold">{tlStaffView?.staff?.email}</p>
                    </div>
                  </div>
                  <hr className="my-0" />
                  {activeTab == 1 && (
                    <>
                      <p className="text-start text-lg py-2 font-bold">
                        Enquires
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="card border-1 !border-dashed !h-fit ">
                          <div className="card-text flex py-2 items-center justify-between !px-2 sm:!px-3 text-center text-lg">
                            <div className="rounded bg-gray-200 p-2">
                              <MdPlaylistAddCircle
                                size={35}
                                className=""
                                color="#254471"
                              />
                            </div>
                            <div className=" text-center">
                              <div className="font-semibold text-gray-500">
                                Total
                              </div>
                              <span className="font-bold">
                                {tlStaffView?.enq_counts?.new +
                                  tlStaffView?.enq_counts?.notin +
                                  tlStaffView?.enq_counts?.postponed +
                                  tlStaffView?.enq_counts?.ringing +
                                  tlStaffView?.enq_counts?.t_post +
                                  tlStaffView?.enq_counts?.t_ring}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card border-1 !border-dashed !h-fit">
                          <div className="card-text flex py-2 items-center justify-between !px-2 sm:!px-3 text-center text-lg">
                            <div className="rounded bg-gray-200 p-2">
                              <MdAssignmentAdd size={35} color="#254471" />
                            </div>
                            <div className=" text-center">
                              <div className="font-semibold text-gray-500">
                                Assigned
                              </div>
                              <span className="font-bold">
                                {tlStaffView?.enq_counts?.new}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card border-1 !border-dashed !h-fit">
                          <div className="card-text flex py-2 items-center justify-between !px-2 sm:!px-3 text-center text-lg">
                            <div className="rounded bg-gray-200 p-2">
                              <BiPhoneCall size={35} color="#254471" />
                            </div>
                            <div className=" text-center">
                              <div className="font-semibold text-gray-500">
                                Ringing
                              </div>
                              <span className="font-bold">
                                {tlStaffView?.enq_counts?.ringing}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card border-1 !border-dashed !h-fit">
                          <div className="card-text flex py-2 items-center justify-between !px-2 sm:!px-3 text-center text-lg">
                            <div className="rounded bg-gray-200 p-2">
                              <MdWifiCalling size={35} color="#254471" />
                            </div>
                            <div className=" text-center">
                              <div className="font-semibold text-gray-500">
                                Today's Ringing
                              </div>
                              <span className="font-bold">
                                {tlStaffView?.enq_counts?.t_ring}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card border-1 !border-dashed !h-fit">
                          <div className="card-text flex py-2 items-center justify-between !px-2 sm:!px-3 text-center text-lg">
                            <div className="rounded bg-gray-200 p-2">
                              <MdWatchLater size={35} color="#254471" />
                            </div>
                            <div className=" text-center">
                              <div className="font-semibold text-gray-500">
                                Postponed
                              </div>
                              <span className="font-bold">
                                {tlStaffView?.enq_counts?.postponed}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card border-1 !border-dashed !h-fit">
                          <div className="card-text flex py-2 items-center justify-between !px-2 sm:!px-3 text-center text-lg">
                            <div className="rounded bg-gray-200 p-2">
                              <MdWifiCalling size={35} color="#254471" />
                            </div>
                            <div className=" text-center">
                              <div className="font-semibold text-gray-500">
                                Today's Postponed
                              </div>
                              <span className="font-bold">
                                {tlStaffView?.enq_counts?.t_post}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card border-1 !border-dashed !h-fit">
                          <div className="card-text flex py-2 items-center justify-between !px-2 sm:!px-3 text-center text-lg">
                            <div className="rounded bg-gray-200 p-2">
                              <MdNotInterested size={35} color="#254471" />
                            </div>
                            <div className=" text-center">
                              <div className="font-semibold text-gray-500">
                                Not Interested
                              </div>
                              <span className="font-bold">
                                {tlStaffView?.enq_counts?.notin}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {activeTab == 2 && (
                    <>
                      <p className="text-start text-lg py-2 font-bold">
                        Orders
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="card border-1 !border-dashed !h-fit ">
                          <div className="card-text flex py-2 items-center justify-between !px-2 sm:!px-3 text-center text-lg">
                            <div className="rounded bg-gray-200 p-2">
                              <MdPlaylistAddCircle size={35} color="#254471" />
                            </div>
                            <div className=" text-center">
                              <div className="font-semibold text-gray-500">
                                Total
                              </div>
                              <span className="font-bold">
                                {tlStaffView?.order_count?.cancelled +
                                  tlStaffView?.order_count?.confirmed +
                                  tlStaffView?.order_count?.delivered +
                                  tlStaffView?.order_count?.dispatched +
                                  tlStaffView?.order_count?.placed +
                                  tlStaffView?.order_count?.returned}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card border-1 !border-dashed !h-fit">
                          <div className="card-text flex py-2 items-center justify-between !px-2 sm:!px-3 text-center text-lg">
                            <div className="rounded bg-gray-200 p-2">
                              <FaBoxesStacked size={35} color="#254471" />
                            </div>
                            <div className=" text-center">
                              <div className="font-semibold text-gray-500">
                                Placed
                              </div>
                              <span className="font-bold">
                                {tlStaffView?.order_count?.placed}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card border-1 !border-dashed !h-fit">
                          <div className="card-text flex py-2 items-center justify-between !px-2 sm:!px-3 text-center text-lg">
                            <div className="rounded bg-gray-200 p-2">
                              <GiConfirmed size={35} color="#254471" />
                            </div>
                            <div className=" text-center">
                              <div className="font-semibold text-gray-500">
                                Confirmed
                              </div>
                              <span className="font-bold">
                                {tlStaffView?.order_count?.confirmed}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card border-1 !border-dashed !h-fit">
                          <div className="card-text flex py-2 items-center justify-between !px-2 sm:!px-3 text-center text-lg">
                            <div className="rounded bg-gray-200 p-2">
                              <FaTruckRampBox size={35} color="#254471" />
                            </div>
                            <div className=" text-center">
                              <div className="font-semibold text-gray-500">
                                Dispatched
                              </div>
                              <span className=" font-bold">
                                {tlStaffView?.order_count?.dispatched}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card border-1 !border-dashed !h-fit">
                          <div className="card-text flex py-2 items-center justify-between !px-2 sm:!px-3 text-center text-lg">
                            <div className="rounded bg-gray-200 p-2">
                              <FaBox size={35} color="#254471" />
                            </div>
                            <div className=" text-center">
                              <div className="font-semibold text-gray-500">
                                Delivered
                              </div>
                              <span className="font-bold">
                                {tlStaffView?.order_count?.delivered}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card border-1 !border-dashed !h-fit">
                          <div className="card-text flex py-2 items-center justify-between !px-2 sm:!px-3 text-center text-lg">
                            <div className="rounded bg-gray-200 p-2">
                              <MdCancel size={35} color="#254471" />
                            </div>
                            <div className=" text-center">
                              <div className="font-semibold text-gray-500">
                                cancelled
                              </div>
                              <span className=" font-bold">
                                {tlStaffView?.order_count?.cancelled}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card border-1 !border-dashed !h-fit">
                          <div className="card-text flex py-2 items-center justify-between !px-2 sm:!px-3 text-center text-lg">
                            <div className="rounded bg-gray-200 p-2">
                              <TbTruckReturn size={35} color="#254471" />
                            </div>
                            <div className=" text-center">
                              <div className="font-semibold text-gray-500">
                                Returned
                              </div>
                              <span className="font-bold">
                                {tlStaffView?.order_count?.returned}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {activeTab == 3 && (
                    <div>
                      <p className="text-start text-lg py-2 font-bold">
                        {new Date().toLocaleDateString("en-US", {
                          month: "long",
                        })}{" "}
                        Attendance
                      </p>
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
                          {tlStaffView?.attendance?.length > 0 &&
                            tlStaffView?.attendance.map((val, ind) => (
                              <tr key={ind}>
                                <td
                                  className={`${
                                    val.day == "Sunday" ? "!text-red-600" : ""
                                  } ${
                                    val.note == "absent" ? "!bg-red-200" : ""
                                  }`}
                                >
                                  {val.date}
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
                                  {val?.login != null
                                    ? val.login?.split(" ")[1]
                                    : "-"}
                                </td>
                                <td
                                  className={`${
                                    val.day == "Sunday" ? "!text-red-600" : ""
                                  } ${
                                    val.note == "absent" ? "!bg-red-200" : ""
                                  }`}
                                >
                                  {val?.logout != null
                                    ? val.logout?.split(" ")[1]
                                    : "-"}
                                </td>
                              </tr>
                            ))}

                          {/* Add more rows as needed */}
                        </tbody>
                      </Table>
                    </div>
                  )}
                  {activeTab == 4 && (
                    <>
                      <div className="max-h-[800px] overflow-y-auto mx-auto container">
                        <div class="!mt-5">
                          <p className="text-lg ">
                            <b>{tlStaffView?.staff?.name}</b> Logs
                          </p>
                          <div class="timeline bg-transparent before:top-[64px] !w-auto pt-5">
                            {tlStaffView?.activity?.length > 0 &&
                              tlStaffView?.activity?.map((activity, ind) => {
                                if (ind == 0) {
                                  return (
                                    <>
                                      <div
                                        class={`timeline-wrapper ${
                                          ind % 2 == 0
                                            ? "timeline-inverted"
                                            : ""
                                        } timeline-wrapper-info`}
                                      >
                                        <div class="timeline-badge"></div>
                                        <div class="timeline-panel">
                                          <div class="timeline-heading">
                                            <h6 class="timeline-title">
                                              {activity?.action}
                                            </h6>
                                          </div>
                                          <div class="timeline-body">
                                            <p>{activity?.result}</p>
                                          </div>
                                          <div class="timeline-footer d-flex align-items-center flex-wrap">
                                            <span class="ml-md-auto fw-bold flex items-center gap-1">
                                              <FaClock className=" " />
                                              {new Date(
                                                activity?.updated_at
                                              ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                              })}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                } else {
                                  return (
                                    <>
                                      <div
                                        class={`timeline-wrapper ${
                                          ind % 2 == 0
                                            ? "timeline-inverted"
                                            : ""
                                        } timeline-wrapper-info`}
                                      >
                                        <div class="timeline-badge"></div>
                                        <div class="timeline-panel">
                                          <div class="timeline-heading">
                                            <h6 class="timeline-title">
                                              {activity?.action}
                                            </h6>
                                          </div>
                                          <div class="timeline-body">
                                            <p>{activity?.result}</p>
                                          </div>
                                          <div class="timeline-footer d-flex align-items-center flex-wrap">
                                            <span class="ml-md-auto fw-bold flex items-center gap-1">
                                              <FaClock className=" " />
                                              {new Date(
                                                activity?.updated_at
                                              ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                              })}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                }
                              })}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <CopyRight />
          </div>
        </div>
      </>
    </>
  );
}
