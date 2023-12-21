import { useEffect } from "react"

import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "react-bootstrap"
// import { useRouter } from "next/navigation"
import { useNavigate } from "react-router-dom"
// import AssignTable from "./assignedTable"

import OrdersCommon, { GetApiTitle } from "./OrdersCommon"
import TopNavbar from "../navbar/topNavbar"
import NavbarMarquee from "../navbar/marquee"
import axios from "axios"
import CopyRight from "../copyright/Copyright"




export default function OrdersLayout() {
    
    const navigate = useNavigate();
    // const dispatch = useDispatch()
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
        <div className="container-scroller  sm:relative top-[0px] sm:top-[60px] md:top-[100px] lg:top-[0px] marqueePosition min-h-[90vh]">
          <TopNavbar />
          <div className="top-[63px] sm:top-[0px]">
            <NavbarMarquee />
          </div>

          <div className="page-header container">
            <ol className="breadcrumb">
              {/* <!-- breadcrumb --> */}
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">Orders</li>
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
          <div className=" page-header container 	" style={{ display: "block" }}>
            <button
              type="button"
              onClick={() => navigate("/enquiry/orders/placed")}
              className={`btn  ${
                type == "placed"
                  ? "!bg-blue-500 text-white"
                  : "!text-[#467fcf] btn-outline-secondary"
              }   position-relative mr-2 py-2 `}
            >
              {" "}
              Placed{" "}
            </button>
            <button
              type="button"
              onClick={() => navigate("/enquiry/orders/confirmed")}
              className={`btn  ${
                type == "confirmed"
                  ? "!bg-blue-500 text-white"
                  : "text-green-500 btn-outline-secondary"
              }    position-relative mr-2 py-2 `}
            >
              Confirmed{" "}
            </button>
            <button
              type="button"
              onClick={() => navigate("/enquiry/orders/dispatched")}
              className={`btn  ${
                type == "dispatched"
                  ? "!bg-blue-500 text-white"
                  : "!text-[#28afd0] btn-outline-secondary"
              }  position-relative mr-2 py-2 `}
            >
              {" "}
              Dispatched{" "}
            </button>
            <button
              type="button"
              onClick={() => navigate("/enquiry/orders/delivered")}
              className={`btn  ${
                type == "delivered"
                  ? "!bg-blue-500 text-white"
                  : "!text-[#5eba00] btn-outline-secondary"
              }   position-relative mr-2 py-2 `}
            >
              {" "}
              Delivered{" "}
            </button>
            <button
              type="button"
              onClick={() => navigate("/enquiry/orders/returned")}
              className={`btn   ${
                type == "returned"
                  ? "!bg-blue-500 text-white"
                  : "!text-[#f66] btn-outline-secondary"
              }  position-relative mr-2 py-2 `}
            >
              {" "}
              Returned{" "}
            </button>
            <button
              type="button"
              onClick={() => navigate("/enquiry/orders/cancelled")}
              className={`btn  ${
                type == "cancelled"
                  ? "!bg-blue-500 text-white"
                  : "!text-[#467fcf] btn-outline-secondary"
              }  position-relative mr-2 py-2 `}
            >
              {" "}
              Cancelled{" "}
            </button>
          </div>
          <div className="container">
            <div className="col-md-12 col-lg-12">
              <Card>
                <Card.Title className="card-header border-bottom py-3 !bg-[#25378b] text-white">
                  {title}
                </Card.Title>
                <Card.Body>
                  <div className="table-responsive">
                    <OrdersCommon />
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        <div className="mt-5 bottom-0 flex justify-center">
          <CopyRight />
        </div>
      </>
    );
}