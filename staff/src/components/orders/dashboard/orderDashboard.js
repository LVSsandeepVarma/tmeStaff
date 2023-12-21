import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom';
import Loading from "../../loader/loading";
import TopNavbar from "../../navbar/topNavbar";
import NavbarMarquee from "../../navbar/marquee";
import { Divider, Tooltip, Whisper } from "rsuite";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { BiRefresh } from "react-icons/bi";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import ActionModel from "../../modals/orderCommetns";
import CopyRight from "../../copyright/Copyright";

export default function OrderDashboard() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch()
  const userData = useSelector((state) => state?.userInfoReducer);
  const loader = useSelector((state) => state?.loaderReducer);
  const [orderData, setOrderData] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const params = useParams();
  const [call, setCall] = useState("");
  const [isFetchUpdatedData, setIsFetchingUpdatedData] = useState(false);
  const [staffStatus, setStaffStatus] = useState("");
  const [staffUpdate, setStaffupdate] = useState("");
  const [delvStatus, setDelvStatus] = useState("");
  const [delvUpdate, setDelvUpdate] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `https://admin.tradingmaterials.com/api/staff/view-order?id=${params?.order_id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("tmToken"),
            },
          }
        );
        if (response?.data?.status) {
          console.log(response?.data?.data?.order?.items, "nitable");
          setStaffStatus(
            response?.data?.data?.order?.orderstatus?.staff_status
          );
          setStaffupdate(
            response?.data?.data?.order?.orderstatus?.staff_update
          );
          setDelvStatus(response?.data?.data?.order?.orderstatus?.delv_status);
          setDelvUpdate(response?.data?.data?.order?.orderstatus?.delv_update);
          if (response?.data?.data?.order?.status == "1")
            setOrderStatus("Pending");
          setOrderData(response?.data?.data?.order);
        }
        
      
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrder();
  }, [call]);

  function downloadFile() {
    // const html = document.getElementById("invoice")
    // const pdf = new PDFViewer({
    //   html
    // })
    // pdf.save("invoice.pdf")
  }

  const createPDF = async () => {
    const pdf = new jsPDF("portrait","pt", "a4");
    const data = await document.querySelector("#invoice");
    pdf.html(data).then(() => {
      pdf.save("shipping_label.pdf");
    });
  };

  const shareContent = {
    title: "Your share title",
    text: "Your share text",
    url: "https://example.com", // URL you want to share
  };
  const handleShare = async () => {
    try {
      await navigator.share(shareContent);
      console.log("Shared successfully");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  console.log(userData, "data");

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleStatusUpdate = (id, title, status) => {
    console.log(status, "status-");
    setTitle(title);
    setStatus(status);
    setShow(true);
  };

  const refreshData = async () => {
    try {
      setIsFetchingUpdatedData(true);
      const response = await axios.get(
        `https://admin.tradingmaterials.com/api/staff/get-order-status?order_id=${params.order_id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tmToken"),
          },
        }
      );
      if (response?.data?.status) {
        console.log(
          response?.data?.data?.order_status?.staff_status,
          "status-"
        );
        setStaffStatus(response?.data?.data?.order_status?.staff_status);
        setStaffupdate(response?.data?.data?.order_status?.staff_update);
        setDelvStatus(response?.data?.data?.order_status?.delv_status);
        setDelvUpdate(response?.data?.data?.order_status?.delv_update);
        console.log();
        if (
          response?.data?.data?.order_status?.staff_status == "1" &&
          response?.data?.data?.order_status?.delv_status == "1"
        ) {
          console.log(orderStatus, "status-");
          setOrderStatus("OnHold");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetchingUpdatedData(false);
    }

    // setCall(!call);
  };
  return (
    <>
      {loader?.value === true ? <Loading /> : ""}
      <ActionModel
        close={show}
        setClose={handleCloseModal}
        id={params.order_id}
        destination={""}
        tit={title}
        status={status}
        setCall={setCall}
        call={call}
      />
      <div className="container-scroller  sm:relative top-[0px] sm:top-[60px] md:top-[100px] lg:top-[0px] marqueePosition">
        <TopNavbar />
        <div className="top-[63px] sm:top-[0px]">
          <NavbarMarquee />
        </div>
        <div className=" ">
          <div className="container-fluid page-body-wrapper">
            <div className="main-panel !bg-white">
              <div className="content-wrapper shadow">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="border-bottom text-center pb-4">
                              <div className="flex justify-center w-full ">
                                <img
                                  src="/images/blueProfile.png"
                                  alt="profile"
                                  className="img-lg rounded-circle mb-3"
                                />
                              </div>
                              <div className="mb-3">
                                <h3>
                                  {orderData?.customer?.first_name}{" "}
                                  {orderData?.customer?.last_name}
                                </h3>
                                {/* <div className="d-flex align-items-center">
                            <h5 className="mb-0 me-2 text-muted">Canada</h5>
                            <select id="profile-rating" name="rating" autocomplete="off">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div> */}
                              </div>
                              <div>
                                <div className="flex items-center justify-center mb-">
                                  <MdOutlineMailOutline className="w-4 h-4 mr-1" />
                                  <p
                                    className="text-gray-500 font-semibold "
                                    style={{ fontSize: "16px" }}
                                  >
                                    {orderData?.customer?.email}
                                  </p>
                                </div>
                                <div className="flex items-center justify-center mb-2">
                                  <BsTelephone className="w-3 h-3 mr-1" />
                                  <p
                                    className="text-gray-500 font-semibold "
                                    style={{ fontSize: "16px" }}
                                  >
                                    {orderData?.customer?.phone}
                                  </p>
                                </div>
                              </div>
                              {/* <p className="w-75 mx-auto mb-3">Bureau Oberhaeuser is a design bureau focused on Information- and Interface Design. </p> */}
                              <div className="d-flex justify-content-center gap-3 !font-semibold">
                                <label className="badge !text-green-700 badge-outline-success truncate !font-semibold">
                                  Order no : <p>{orderData?.order_number}</p>{" "}
                                </label>
                                <label className="badge !text-green-700 badge-outline-success !font-semibold">
                                  Ordered Date :{" "}
                                  <p>
                                    {new Date(
                                      orderData?.created_at
                                    ).toLocaleDateString()}
                                  </p>
                                </label>
                                {/* <button className="btn btn-success me-1">Hire Me</button>
                          <button className="btn btn-success">Follow</button> */}
                              </div>
                            </div>
                            {/* <div className="border-bottom py-4">
                        <p>Skills</p>
                        <div>
                          <label className="badge text-black badge-outline-warning">Chalk</label>
                          <label className="badge badge-outline-primary">Hand lettering</label>
                          <label className="badge badge-outline-dark">Information Design</label>
                          <label className="badge badge-outline-dark">Graphic Design</label>
                          <label className="badge badge-outline-dark">Web Design</label>  
                        </div>                                                               
                      </div> */}

                            <div className="border-bottom py-4">
                              <div className="flex items-center justify-between mt-2 mb-2">
                                <span className="flex items-center">
                                  Status:&nbsp;
                                  {orderData?.status == "1" && (
                                    <span className="subpixel-antialiased font-semibold text-secondary flex items-center">
                                      Order placed{" "}
                                      <label className="badge !text-green-700 badge-outline-success truncate !font-semibold ml-2">
                                        {orderStatus}
                                      </label>
                                    </span>
                                  )}
                                  {orderData?.status == "2" && (
                                    <span className="subpixel-antialiased font-semibold text-info">
                                      Order Confirmed
                                    </span>
                                  )}
                                  {orderData?.status == "3" && (
                                    <span className="subpixel-antialiased font-semibold text-primary">
                                      Order Dispatched
                                    </span>
                                  )}
                                  {orderData?.status == "4" && (
                                    <span className="subpixel-antialiased font-semibold text-success">
                                      Order Delivered
                                    </span>
                                  )}
                                  {orderData?.status == "5" && (
                                    <span className="subpixel-antialiased font-semibold text-danger">
                                      Order Cancelled
                                    </span>
                                  )}
                                </span>
                                {/* <span>
                                  {staffUpdate !== null
                                    ? new Date(
                                        staffUpdate
                                      ).toLocaleDateString()
                                    : ""}
                                </span> */}
                              </div>
                              <div className="d-flex mb-3">
                                <div className="progress progress-md flex-grow">
                                  <div
                                    className={`progress-bar bg-${
                                      orderData?.status == "1"
                                        ? "secondary"
                                        : orderData?.status == "2"
                                        ? "info"
                                        : orderData?.status == "3"
                                        ? "primary"
                                        : orderData?.status == "4"
                                        ? "success"
                                        : orderData?.status == "5"
                                        ? "danger"
                                        : "secondary"
                                    }`}
                                    role="progressbar"
                                    aria-valuenow="55"
                                    style={{
                                      width: `${
                                        orderData?.status == "1"
                                          ? "20%"
                                          : orderData?.status == "2"
                                          ? "40%"
                                          : orderData?.status == "3"
                                          ? "60%"
                                          : orderData?.status == "4"
                                          ? "80%"
                                          : orderData?.status == "5"
                                          ? "100%"
                                          : ""
                                      }`,
                                    }}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-2 mb-2">
                                <span>
                                  Payment:&nbsp;
                                  {orderData?.amount_paid > 0 && (
                                    <span className="subpixel-antialiased font-semibold text-success">
                                      {orderData?.amount_paid}
                                    </span>
                                  )}
                                </span>
                                {/* <span>
                                  {staffUpdate !== null
                                    ? new Date(
                                        staffUpdate
                                      ).toLocaleDateString()
                                    : ""}
                                </span> */}
                              </div>
                              <div className="flex justify-between items-center">
                                <p>
                                  {orderData?.currency}&nbsp;
                                  {orderData?.amount_paid}
                                </p>
                                <p className="p-0 m-0">
                                  {orderData?.currency}&nbsp;{orderData?.total}
                                </p>
                              </div>
                              <div className="d-flex">
                                <div className="progress progress-md flex-grow">
                                  <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    aria-valuenow={orderData?.amount_paid}
                                    style={{ width: "10%" }}
                                    aria-valuemin={0}
                                    aria-valuemax={orderData?.total}
                                  ></div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-3">
                              <div className="border-1 p-3 mb-3">
                                <div className="flex items-center justify-between">
                                  <p className="font-bold float-left text-smooth text-lg">
                                    Your Status
                                  </p>
                                  {staffStatus != "2" && delvStatus != "0" && (
                                    <div className="dropdown">
                                      <Dropdown>
                                        <Dropdown.Toggle
                                          className="!flex items-center !border-0"
                                          variant="default"
                                          id="dropdown-basic"
                                        >
                                          <HiOutlineDotsVertical />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          {delvStatus != "3" &&
                                            delvStatus == "2" &&
                                            staffStatus != "2" && (
                                              <Dropdown.Item
                                                className="!flex justify-center !no-underline"
                                                onClick={() => {
                                                  handleStatusUpdate(
                                                    orderData?.id,
                                                    "confirm Order",
                                                    "2"
                                                  );
                                                }}
                                              >
                                                <span>Confirm Order</span>
                                              </Dropdown.Item>
                                            )}
                                          {staffStatus != "1" && (
                                            <Dropdown.Item
                                              className="!flex justify-center !no-underline"
                                              onClick={() => {
                                                handleStatusUpdate(
                                                  orderData?.id,
                                                  "Onhold Order",
                                                  "1"
                                                );
                                              }}
                                            >
                                              <span>Onhold Order</span>
                                            </Dropdown.Item>
                                          )}
                                          {staffStatus != "3" && (
                                            <Dropdown.Item
                                              className="!flex justify-center !no-underline"
                                              onClick={() => {
                                                handleStatusUpdate(
                                                  orderData?.id,
                                                  "Reject Order",
                                                  "3"
                                                );
                                              }}
                                            >
                                              <span>Reject Order</span>
                                            </Dropdown.Item>
                                          )}
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center justify-between mt-2 mb-2">
                                  <span>
                                    {staffStatus == "0" && (
                                      <span className="subpixel-antialiased font-semibold">
                                        Order placed (Pending)
                                      </span>
                                    )}
                                    {staffStatus == "1" && (
                                      <span className="subpixel-antialiased font-semibold">
                                        onHold
                                      </span>
                                    )}
                                    {staffStatus == "2" && (
                                      <span className="subpixel-antialiased font-semibold">
                                        Confirmed
                                      </span>
                                    )}
                                    {staffStatus == "3" && (
                                      <span className="subpixel-antialiased font-semibold">
                                        Rejected
                                      </span>
                                    )}
                                  </span>
                                  <span>
                                    {staffUpdate !== null
                                      ? new Date(
                                          staffUpdate
                                        ).toLocaleDateString("en-GB", {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        })
                                      : ""}
                                  </span>
                                </div>
                                <div className="progress progress-md flex-grow">
                                  <div
                                    className={`progress-bar bg-${
                                      staffStatus == "0"
                                        ? "warning"
                                        : staffStatus == "1"
                                        ? "info"
                                        : staffStatus == "2"
                                        ? "success"
                                        : staffStatus == "3"
                                        ? "danger"
                                        : "bg-info"
                                    }`}
                                    role="progressbar"
                                    aria-valuenow={`${
                                      staffStatus == "0"
                                        ? 25
                                        : staffStatus == "1"
                                        ? 50
                                        : staffStatus == "2"
                                        ? 100
                                        : staffStatus == "3"
                                        ? 75
                                        : 25
                                    }`}
                                    style={{
                                      width: `${
                                        staffStatus == "0"
                                          ? "25%"
                                          : staffStatus == "1"
                                          ? "50%"
                                          : staffStatus == "2"
                                          ? "100%"
                                          : staffStatus == "3"
                                          ? "100%"
                                          : ""
                                      }`,
                                    }}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                              <div className="border-1 p-3 mb-3">
                                <div className="flex items-center justify-between !mb-2">
                                  <Whisper
                                    speaker={
                                      <Tooltip>Get Current Status</Tooltip>
                                    }
                                  >
                                    <p className="flex items-center font-bold float-left text-smooth text-lg">
                                      Delivery Status{" "}
                                      <BiRefresh
                                        className={`w-6 h-6 ml-2 !cursor-pointer ${
                                          isFetchUpdatedData
                                            ? "rotate-90 rotate-infinite"
                                            : "rotate-0"
                                        } transition-transform duration-1000 ease-in-out`}
                                        onClick={() => refreshData()}
                                      />
                                    </p>
                                  </Whisper>

                                  {/* <HiOutlineDotsVertical className='float-right hover:cursor-pointer' /> */}
                                </div>
                                <div className="flex items-center justify-between mt-2 mb-2">
                                  {delvStatus == "0" && (
                                    <span>Order placed (Pending)</span>
                                  )}
                                  {delvStatus == "1" && <span>OnHold</span>}
                                  {delvStatus == "2" && <span>Confirmed</span>}
                                  {delvStatus == "3" && (
                                    <span>Order Cancelled</span>
                                  )}
                                  <span>
                                    {delvUpdate !== null
                                      ? new Date(delvUpdate).toLocaleDateString(
                                          "en-GB",
                                          {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                          }
                                        )
                                      : ""}
                                  </span>
                                </div>
                                <div className="progress progress-md flex-grow mb-2">
                                  <div
                                    className={`progress-bar bg-${
                                      delvStatus == "0"
                                        ? "warning"
                                        : delvStatus == "1"
                                        ? "info"
                                        : delvStatus == "2"
                                        ? "success"
                                        : delvStatus == "3"
                                        ? "danger"
                                        : "primary"
                                    }`}
                                    role="progressbar"
                                    aria-valuenow={`${
                                      delvStatus == "0"
                                        ? 25
                                        : delvStatus == "1"
                                        ? 50
                                        : delvStatus == "2"
                                        ? 75
                                        : delvStatus == "3"
                                        ? 100
                                        : 25
                                    }`}
                                    style={{
                                      width: `${
                                        delvStatus == "0"
                                          ? "25%"
                                          : delvStatus == "1"
                                          ? "50%"
                                          : delvStatus == "2"
                                          ? "100%"
                                          : delvStatus == "3"
                                          ? "100%"
                                          : ""
                                      }`,
                                    }}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                            </div>

                            {/* <button
                              className="btn btn-primary btn-block mb-2"
                              onClick={downloadFile}
                            >
                              Preview
                            </button> */}
                          </div>
                          <div className="col-lg-8">
                            {/* <div className="d-flex justify-content-between">
                              <div>
                                <button className="btn btn-outline-primary">
                                  Download
                                </button>
                              </div>
                            </div> */}
                            <div className="d-flex justify-end">
                              <div>
                                <label className="font-bold text-gray-700">
                                  {new Date().toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </label>
                              </div>
                            </div>
                            <div className="mt-4 py-2 border-top border-bottom">
                              <ul className="nav profile-navbar text-lg">
                                <li
                                  className="nav-item no-underline"
                                  onClick={() => setActiveTab("products")}
                                >
                                  <span
                                    className={`nav-link no-underline cursor-pointer ${
                                      activeTab === "products" ? "active" : ""
                                    }`}
                                  >
                                    <i className="mdi mdi-cart-outline"></i>
                                    Products
                                  </span>
                                </li>
                                <li
                                  className="nav-item"
                                  onClick={() => setActiveTab("payments")}
                                >
                                  <span
                                    class={`nav-link !appearance-none cursor-pointer ${
                                      activeTab === "payments" ? "active" : ""
                                    }`}
                                  >
                                    <i className="mdi mdi-newspaper"></i>
                                    Payments
                                  </span>
                                </li>
                                <li
                                  className="nav-item"
                                  onClick={() => setActiveTab("invoice")}
                                >
                                  <span
                                    className={`nav-link cursor-pointer ${
                                      activeTab === "invoice" ? "active" : ""
                                    }`}
                                  >
                                    <i className="mdi mdi-receipt-text"></i>
                                    Invoice
                                  </span>
                                </li>
                              </ul>
                            </div>
                            {activeTab === "products" && (
                              <div className="profile-feed ">
                                <div className="w-full d-flex align-items-start profile-feed-item">
                                  <div className="nk-section-content row px-lg-7 w-full ">
                                    <div className="">
                                      <div className="nk-entry pe-lg-5 w-full">
                                        <div className="mb-5">
                                          {orderData?.items?.length > 0 ? (
                                            <div className="table-responsive w-100">
                                              <table className="table responsive">
                                                <tbody>
                                                  {orderData?.items?.length >
                                                    0 &&
                                                    orderData?.items?.map(
                                                      (product, ind) => {
                                                        return (
                                                          <tr
                                                            key={ind}
                                                            className=""
                                                          >
                                                            <td className="">
                                                              <div className="d-flex align-items-start">
                                                                <img
                                                                  src={
                                                                    product
                                                                      ?.product_details
                                                                      ?.img_1
                                                                  }
                                                                  alt="product"
                                                                  className="mb-0 mr-2 !w-[20%] !h-[20%]"
                                                                  // width="150px"
                                                                />
                                                                <div className="w-75">
                                                                  <p
                                                                    className="prod-title text-lg mb-0 ml-2"
                                                                    style={{
                                                                      textOverflow:
                                                                        "ellipsis",
                                                                      whiteSpace:
                                                                        "nowrap",
                                                                      overflow:
                                                                        "hidden",
                                                                      width:
                                                                        "90%",
                                                                    }}
                                                                  >
                                                                    {
                                                                      product
                                                                        ?.product_details
                                                                        ?.name
                                                                    }
                                                                  </p>

                                                                  <div className=" row mt-2 !ml-2">
                                                                    <div
                                                                      id="counter text-center"
                                                                      className="col-md-4  mt-2"
                                                                    >
                                                                      <div>
                                                                        Qty:
                                                                      </div>
                                                                      <span className=" fs-18 m-0 text-gray-1200 !text-xs !font-bold !ml-1 !mr-2r">
                                                                        {
                                                                          product?.qty
                                                                        }
                                                                      </span>
                                                                    </div>
                                                                    <div
                                                                      className=" col-md-4 mt-2"
                                                                      // style={{ marginLeft: "1rem" }}
                                                                    >
                                                                      <div>
                                                                        Unit:
                                                                      </div>
                                                                      <span className="total font-semibold">
                                                                        ₹{" "}
                                                                        {
                                                                          product?.price
                                                                        }
                                                                      </span>{" "}
                                                                    </div>
                                                                    <div
                                                                      className=" col-md-4 mt-2"
                                                                      // style={{ marginLeft: "1rem" }}
                                                                    >
                                                                      <div>
                                                                        Total:
                                                                      </div>
                                                                      <span className="total font-semibold text-lg text-[#178a97] !font-bold">
                                                                        ₹{" "}
                                                                        {
                                                                          product?.total
                                                                        }
                                                                      </span>{" "}
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </td>
                                                          </tr>
                                                        );
                                                      }
                                                    )}
                                                </tbody>
                                              </table>
                                            </div>
                                          ) : (
                                            <div className="text-center font-bold text-gray-700 ">
                                              <p>
                                                No products found in the order
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      <hr className="mt-2" />
                                      <div className="mt-5"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {activeTab === "payments" && (
                              <div className="profile-feed">
                                <div className="stretch-card">
                                  <div className="card">
                                    <div className="card-body">
                                      <h4 className="card-title">
                                        Payment History
                                      </h4>

                                      <div className="table-responsive">
                                        <table className="table table-hover">
                                          <thead>
                                            <tr>
                                              <th>Order ID</th>
                                              <th>Total Amount </th>
                                              <th>Paid Amount</th>
                                              <th>Transaction Id</th>
                                              <th>Payment Status</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {orderData?.payments?.map(
                                              (data, i) => (
                                                <tr>
                                                  <td>{data?.order_id}</td>
                                                  <td>
                                                    {orderData?.currency ==
                                                    "INR"
                                                      ? "₹"
                                                      : "$"}
                                                    {data?.total_amount}
                                                  </td>
                                                  <td className="text-danger">
                                                    {orderData?.currency ==
                                                    "INR"
                                                      ? "₹"
                                                      : "$"}
                                                    {data?.paid_amount}
                                                  </td>
                                                  <td className="text-danger">
                                                    {data?.transaction_id}
                                                  </td>
                                                  {data?.status === 1 && (
                                                    <td>
                                                      <label className="badge badge-success">
                                                        success
                                                      </label>
                                                    </td>
                                                  )}
                                                  {data?.status === 0 && (
                                                    <td>
                                                      <label className="badge badge-info">
                                                        Initiated
                                                      </label>
                                                    </td>
                                                  )}
                                                  {data?.status === 2 && (
                                                    <td>
                                                      <label className="badge badge-danger">
                                                        Failed
                                                      </label>
                                                    </td>
                                                  )}
                                                </tr>
                                              )
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {activeTab === "invoice" && (
                              <div className="profile-feed ">
                                <div className="card px-2" id="invoice">
                                  <div className="card-body">
                                    <div
                                      className="d-flex  align-items-center container-fluid"
                                      style={{ width: "100%" }}
                                    >
                                      <img
                                        src={"/logo-light.png"}
                                        alt="logo"
                                        className="mb-0 mr-2 cursor-pointer m-2 rounded "
                                        style={{
                                          width: "150px",
                                          height: "50px",
                                        }}
                                      />
                                      <h3
                                        className="text-end my-5"
                                        style={{ marginLeft: "auto" }}
                                      >
                                        Invoice&nbsp;&nbsp;
                                        {orderData?.invoice?.prefix}
                                        {orderData?.invoice?.number}
                                      </h3>
                                    </div>
                                    <hr />
                                    <div className="container-fluid d-flex justify-content-between">
                                      <div className="col-lg-3 ps-0">
                                        <p className="mt-5 mb-2">
                                          <b> Trading Materials</b>
                                        </p>
                                        <p>
                                          No.3 FC, 401, level-4 RAGHAVA
                                          <br />
                                          BUILDING, 4Th Floor, Ramamurthy Nagar,
                                          <br />
                                          Bengaluru, Karnataka - 560016.
                                          <br />
                                          Phone : 971 568030111
                                        </p>
                                      </div>
                                      <div className="col-lg-3 pe-0">
                                        <p className="mt-5 mb-2 text-end">
                                          <b>Invoice to</b>
                                        </p>

                                        <p className="text-end">
                                          <b>
                                            {" "}
                                            {
                                              orderData?.customer?.first_name
                                            }{" "}
                                            {orderData?.customer?.last_name}
                                          </b>
                                          <br />
                                          {orderData?.invoice?.address_1}
                                          <br /> {orderData?.invoice?.address_2}
                                          <br />{" "}
                                          {
                                            orderData?.invoice?.billing_city
                                          } ,{" "}
                                          {orderData?.invoice?.billing_state}
                                          <br />
                                          {
                                            orderData?.invoice?.billing_country
                                          }{" "}
                                          - {orderData?.invoice?.billing_zip}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="container-fluid d-flex justify-content-between">
                                      <div className="col-lg-4 ps-0">
                                        <p className="mb-0 mt-5">
                                          Invoice Date :{" "}
                                          {orderData?.invoice?.date}
                                        </p>
                                        {orderData?.invoice?.duedate !=
                                          null && (
                                          <p>
                                            Due Date :{" "}
                                            {orderData?.invoice?.duedate}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    <div className="container-fluid mt-5 d-flex justify-content-center w-100">
                                      <div className="table-responsive w-100">
                                        <table className="table">
                                          <thead>
                                            <tr className=" text-white">
                                              <th className="!bg-[#1c2c42] text-white">
                                                S.No
                                              </th>
                                              <th className="!bg-[#1c2c42] text-white">
                                                Name
                                              </th>
                                              <th className="text-end !bg-[#1c2c42] text-white">
                                                Qty
                                              </th>
                                              <th className="text-end !bg-[#1c2c42] text-white">
                                                Unit cost
                                              </th>
                                              <th className="text-end !bg-[#1c2c42] text-white">
                                                Total
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {orderData?.items?.map(
                                              (product, ind) => (
                                                <tr
                                                  key={ind}
                                                  className="text-end"
                                                >
                                                  <td className="text-start">
                                                    {ind + 1}
                                                  </td>
                                                  <td className="text-start">
                                                    {
                                                      product?.product_details
                                                        ?.name
                                                    }
                                                  </td>
                                                  <td>{product?.qty}</td>
                                                  <td>
                                                    {orderData?.currency ===
                                                    "INR"
                                                      ? "₹"
                                                      : "$"}
                                                    {product?.price}
                                                  </td>
                                                  <td>
                                                    {orderData?.currency ===
                                                    "INR"
                                                      ? "₹"
                                                      : "$"}
                                                    {product?.total}
                                                  </td>
                                                </tr>
                                              )
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                    <div className="container-fluid mt-5 w-100">
                                      <p className="text-end font-bold mb-2">
                                        Sub - Total Amount:{" "}
                                        {orderData?.currency === "INR"
                                          ? "₹"
                                          : "$"}{" "}
                                        {orderData?.sub_total}
                                      </p>
                                      <p className="text-end mb-2 font-bold">
                                        Discount:{" "}
                                        {orderData?.currency === "INR"
                                          ? "₹"
                                          : "$"}{" "}
                                        {orderData?.discount_amount}
                                      </p>
                                      <p className="text-end mb-2 font-bold">
                                        Tax:{" "}
                                        {orderData?.currency === "INR"
                                          ? "₹"
                                          : "$"}{" "}
                                        {orderData?.total_tax}
                                      </p>
                                      <p className="text-end font-bold">
                                        Total :{" "}
                                        {orderData?.currency === "INR"
                                          ? "₹"
                                          : "$"}{" "}
                                        {orderData?.total}
                                      </p>
                                      <p className="text-end font-bold">
                                        Amount Paid :{" "}
                                        {orderData?.currency === "INR"
                                          ? "₹"
                                          : "$"}{" "}
                                        {orderData?.amount_paid}
                                      </p>
                                      <p className="text-end font-bold text-red-500">
                                        Amount Due:{" "}
                                        {orderData?.currency === "INR"
                                          ? "₹"
                                          : "$"}{" "}
                                        {orderData?.balance}
                                      </p>
                                      {/* <h4 className="text-end mb-5">
                                        Total : {orderData?.currency === "INR" ? "₹" : "$"}{" "}{orderData?.total}
                                      </h4> */}
                                      <hr />
                                    </div>
                                    <div className="container-fluid w-100">
                                      <span
                                        className="btn btn-primary float-right mt-4 ms-2 me-1"
                                        onClick={() => {
                                          window.open(
                                            orderData?.invoice?.invoicefile
                                              ?.invoice_pdf
                                          );
                                        }}
                                      >
                                        <i className="mdi mdi-printer me-1"></i>
                                        Print
                                      </span>
                                      <span
                                        // onClick={handleShare}
                                        className="btn btn-success float-right mt-4 "
                                      >
                                        <i className="mdi mdi-telegram me-1"></i>
                                        Send Invoice
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="footer-wrapper">
          <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-center text-sm-left d-block d-sm-inline-block">Copyright &copy; 2021 All rights reserved. </span>
            </div>
          </footer>
        </div> */}
              <div className="mt-5 flex justify-center">
                <CopyRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
