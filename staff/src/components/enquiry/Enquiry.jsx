import TopNavbar from "../navbar/topNavbar"
import NavbarMarquee from "../navbar/marquee"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import { Card } from "react-bootstrap"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { GetApiTitle } from "../orders/OrdersCommon"
import EnquiryTable from "./EnquiryTable"
import axios from "axios"
import CopyRight from "../copyright/Copyright"
// import { useRouter } from "next/navigation"

export default function Enquiry() {
    const navigate = useNavigate()
    const userData = useSelector((state) => state?.userInfoReducer)
    console.log(userData, "data")
  const { type, title } = GetApiTitle();
  

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

    return (
      <>
          <div className="container-scroller sm:relative top-[0px] sm:top-[60px] md:top-[100px] lg:top-[0px] marqueePosition min-h-[90vh]">
            <TopNavbar />
            <div className="top-[63px] sm:top-[0px]">
              <NavbarMarquee />
            </div>
            <div className="page-header container ">
              <ol className="breadcrumb">
                {/* <!-- breadcrumb --> */}
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item active" aria-current="page">
                  {title}
                </li>
              </ol>
              {/* <!-- End breadcrumb --> */}
              <div className="ml-auto">
                <div className="input-group">
                  <a
                    onClick={() => handleLockingScreen()}
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
            <div
              className=" page-header container gap-2"
              style={{ display: "block" }}
            >
              <button
                type="button"
                onClick={() => navigate("/enquiry/assigned-enquiry")}
                className={`btn mt-1 mb-1 ${
                  type == "NEW"
                    ? "!bg-blue-500 text-white"
                    : "!text-[#467fcf] btn-outline-secondary"
                }   position-relative mr-2 py-2 `}
              >
                {" "}
                Assigned | {userData?.value?.data?.enq_counts?.new}{" "}
              </button>
              <button
                type="button"
                onClick={() => navigate("/enquiry/ringing-enquiry")}
                className={`btn mt-1 mb-1 ${
                  type == "RINGING"
                    ? "!bg-[#46bacf] text-white"
                    : "!text-[#46bacf] btn-outline-secondary"
                }   position-relative mr-2 py-2 `}
              >
                {" "}
                Ringing | {userData?.value?.data?.enq_counts?.ringing}{" "}
              </button>
              <button
                type="button"
                onClick={() => navigate("/enquiry/postponed-enquiry")}
                className={`btn mt-1 mb-1 ${
                  type == "POSTPONED"
                    ? "!bg-[#46cf58] text-white"
                    : "!text-[#46cf58] btn-outline-secondary"
                }   position-relative mr-2 py-2 `}
              >
                {" "}
                Postponed | {userData?.value?.data?.enq_counts?.postponed}{" "}
              </button>
              <button
                type="button"
                onClick={() => navigate("/enquiry/not-intersted-enquiry")}
                className={`btn mt-1 mb-1 ${
                  type == "NOT-INTERESTED"
                    ? "!bg-[#cf4646e5] text-white"
                    : "!text-[#cf4646e5] btn-outline-secondary"
                }   position-relative mr-2 py-2 `}
              >
                {" "}
                Not Intrested | {userData?.value?.data?.enq_counts?.notin}{" "}
              </button>
              <button
                type="button"
                onClick={() => navigate("/enquiry/not-todays-ringing-enquiry")}
                className={`btn mt-1 mb-1 ${
                  type == "TODAYS-RING"
                    ? "!bg-blue-500 text-white"
                    : "!text-[#467fcf] btn-outline-secondary"
                }   position-relative mr-2 py-2 `}
              >
                {" "}
                Today Ringing | {userData?.value?.data?.enq_counts?.t_ring}{" "}
              </button>
              <button
                type="button"
                onClick={() =>
                  navigate("/enquiry/not-todays-postponed-enquiry")
                }
                className={`btn mt-1 mb-1 ${
                  type == "TODAYS-POST"
                    ? "!bg-[#cfc646] text-white"
                    : "!text-[#cfc646] btn-outline-secondary"
                }   position-relative mr-2 py-2 `}
              >
                {" "}
                Today Postponed | {
                  userData?.value?.data?.enq_counts?.t_post
                }{" "}
              </button>
            </div>
            <div className="container">
              <Card>
                <Card.Title className="card-header border-bottom py-3 !bg-[#25378b] text-white">
                  {title} Enquiries
                </Card.Title>
                <Card.Body>
                  <EnquiryTable />
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="mt-5 bottom-0 flex justify-center">
            <CopyRight />
          </div>
      </>
    );
                }