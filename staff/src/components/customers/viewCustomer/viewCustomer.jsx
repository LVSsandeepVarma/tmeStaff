import React, { useEffect, useState } from "react";
import NavbarMarquee from "../../navbar/marquee";
import TopNavbar from "../../navbar/topNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { setLoaderFalse, setLoaderTrue } from "../../../slice/loaderSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import moment from "moment";
import { FaRegAddressCard } from "react-icons/fa";
import CopyRight from "../../copyright/Copyright";

export default function ViewCustomer() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [clientData, setClientData] = useState();
  const [clientActivity, setClientActivity] = useState();
  const [clientStats, setClientStats] = useState();
  const [activeTab, setActiveTab] = useState(1);
  const [clientAddresses, setClientAddresses] = useState();
  const [orderData, setOrderData] = useState();
  const [ordNo, setOrdNo] = useState()
  const [type, setType] = useState("");
  const [tableData, setTableData] = useState([]);
  const [next, setNext] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        dispatch(setLoaderTrue());
        const response = await axios.get(
          `https://admin.tradingmaterials.com/api/staff/customers/view?client_id=${params?.client_id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("tmToken"),
            },
          }
        );

        if (response?.data?.status) {
          setClientData(response?.data?.data?.customer);
          setClientActivity(response?.data?.data?.activity);
          setClientStats(response?.data?.data?.count);
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(setLoaderFalse());
      }
    };

    fetchClientData();
  }, []);

  useEffect(() => {
    const getClientAddresses = async () => {
      try {
        dispatch(setLoaderTrue());
        const response = await axios.get(
          `https://admin.tradingmaterials.com/api/delivery/customers/get-orders-by-type?type=address&client_id=${params?.client_id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("tmToken"),
            },
          }
        );
        if (response?.data?.status) {
          setClientAddresses(response?.data?.data?.results);
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(setLoaderFalse());
      }
    };

    if (activeTab == 2) {
      getClientAddresses();
    }
    if (activeTab == 4) {
      setType("placed");
    }
    if (activeTab == 5) {
      setType("confirmed");
    }
    if (activeTab == 6) {
      setType("dispatched");
    }
    if (activeTab == 7) {
      setType("delivered");
    }
    if (activeTab == 8) {
      setType("returned");
    }
    if (activeTab == 9) {
      setType("cancelled");
    }
  }, [activeTab]);

  useEffect(() => {
   const fetchUserInfo = async () => {
     try {
       if (type) {
         dispatch(setLoaderTrue());
         const token = sessionStorage.getItem("tmToken")?.length
           ? sessionStorage.getItem("tmToken")
           : localStorage.getItem("tmToken");
         const response = await axios.get(
           "https://admin.tradingmaterials.com/api/staff/customers/get-orders-by-type?",
           {
             params: {
               type: type,
               client_id: params?.client_id,
             },
             headers: {
               Authorization: `Bearer ${token}`,
             },
           }
         );
         if (response?.data?.status) {
           dispatch(setLoaderFalse());
         }

         setTableData(response?.data?.data);
         setNext(response?.data?.data?.orders?.next_cursor);
         setCurrentPage(1);
       }
       //   dispatch(setUserInfo(response?.data))
     } catch (error) {
       console.error(error);
       dispatch(setLoaderFalse());
     }
    };
    const fetchOrderInfoTwo = async (secondType) => {
      try {
        dispatch(setLoaderTrue());
        const token = sessionStorage.getItem("tmToken")?.length
          ? sessionStorage.getItem("tmToken")
          : localStorage.getItem("tmToken");
        const response = await axios.get(
          "https://admin.tradingmaterials.com/api/staff/customers/get-orders-by-type?",
          {
            params: {
              type: secondType,
              client_id: params?.client_id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.data?.status) {
          dispatch(setLoaderFalse());
        }

        setTableData([...response?.data?.data,...tableData]);
        setNext(response?.data?.data?.orders?.next_cursor);
        setCurrentPage(1);
        //   dispatch(setUserInfo(response?.data))
      } catch (error) {
        console.error(error);
        dispatch(setLoaderFalse());
      }
    };
    fetchUserInfo();
    if (type == "confirmed") {
      fetchOrderInfoTwo("cancelled")
    }
  }, [type]);

    useEffect(() => {
      const fetchOrder = async () => {
        try {
          dispatch(setLoaderTrue());
          const response = await axios.get(
            `https://admin.tradingmaterials.com/api/staff/view-order?id=${ordNo}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("tmToken"),
              },
            }
          );
          if (response?.data?.status) {
           
            setOrderData(response?.data?.data?.order);
          }
        } catch (err) {
          console.log(err);
        } finally {
          dispatch(setLoaderFalse());
        }
      };

      fetchOrder();
    }, [ordNo]);



  const hasValue = (array, key, value) =>
    array?.some((obj) => obj[key] === value);


  return (
    <>
      <div className="container-scroller  sm:relative top-[0px] sm:top-[60px] md:top-[100px] lg:top-[0px] marqueePosition min-h-[100vh]">
        <TopNavbar />
        <div className="top-[63px] sm:top-[0px]">
          <NavbarMarquee />
        </div>
        <div className="page-header dropshadow-xl shadow-sm border-0 !py-0 !mt-0  container">
          <ol className="breadcrumb !text-sm">
            {/* <!-- breadcrumb --> */}
            <li
              className=" text-blue-600 "
              style={{ fontSize: "10px !important" }}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li className=" active ">
              &#160;/ Customers/&#160;{params?.client_id}
            </li>
          </ol>
          {/* <!-- End breadcrumb --> */}
        </div>
        <div className="container">
          <div className="row ">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card border-0 drop-shadow-lg shadow-sm">
                <div class="card-body p-1 m-0">
                  <div class="d-sm-flex flex-row flex-wrap text-center text-sm-left align-items-center !w-full p-2">
                    <img
                      src="/images/blueProfile.png"
                      className=" rounded w-[15%] sm:w-[15%] md:w-[4%]"
                      alt="profile"
                    />
                    <div class="ml-sm-3 ml-md-0 ml-xl-3 mt-2 mt-sm-0 mt-md-2 mt-xl-0 ml-2 !text-left">
                      <h6 class="mb-0 capitalize">
                        {clientData?.first_name} {clientData?.last_name}
                      </h6>
                      <p class="text-muted mb-1">{clientData?.email}</p>
                      <p class="mb-0 text-success fw-bold">
                        {clientData?.phone}
                      </p>
                    </div>
                    {/* <div className="float-right">go Back</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="grid lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-3 grid-cols-2  drop-shadow-xl"
            tabindex="0"
          >
            <div className="">
              <button
                onClick={() => {
                  setActiveTab(1);
                  setOrderData();
                }}
                type="button"
                class={`btn btn-social-icon-text btn-facebook  !border-1 hover:drop-shadow-sm  !bg-transparent !text-[#7b7d7f]`}
              >
                <img
                  class="mdi mdi-facebook !bg-transparent !border-1"
                  src="/images/orders/placed.png"
                  alt="act_img"
                ></img>
                Activity
                {activeTab == 1 && (
                  <div className="animated-border bg-[#7b7d7f]"></div>
                )}
              </button>
            </div>
            <div className="">
              <button
                onClick={() => {
                  setActiveTab(2);
                  setOrderData();
                }}
                type="button"
                class={`btn btn-social-icon-text btn-facebook  !border-1 hover:drop-shadow-sm  !bg-transparent !text-[#6574cd] `}
              >
                <div className="!flex !items-center ">
                  <FaRegAddressCard
                    className=" mr-2 !bg-transparent !border-1"
                    size={18}
                  />
                  Addresses
                </div>
                {activeTab == 2 && (
                  <div className="animated-border bg-[#6574cd]"></div>
                )}
              </button>
            </div>

            <div className="">
              <button
                onClick={() => {
                  setActiveTab(4);
                  setOrderData();
                }}
                type="button"
                class={`btn btn-social-icon-text btn-facebook  !border-1 hover:drop-shadow-sm !bg-transparent text-primary `}
              >
                <img
                  class="mdi mdi-facebook  !bg-transparent !border-1 "
                  src="/images/orders/placed.png"
                  alt="act_img"
                ></img>
                Placed
                {activeTab == 4 && (
                  <div className="animated-border bg-primary"></div>
                )}
              </button>
            </div>
            <div className="">
              <button
                onClick={() => {
                  setActiveTab(5);
                  setOrderData();
                }}
                type="button"
                className={`btn btn-social-icon-text btn-facebook  !border-1 hover:drop-shadow-sm !bg-transparent !text-[#0cd196] `}
              >
                <div className="!flex !items-center">
                  <img
                    class="mdi mdi-facebook  !bg-transparent !border-1"
                    src="/images/orders/confirmed.png"
                    alt="act_img"
                  ></img>
                  Confirmed
                </div>
                {activeTab == 5 && (
                  <div className="animated-border bg-[#0cd196]"></div>
                )}
              </button>
            </div>
            <div className="">
              <button
                onClick={() => {
                  setActiveTab(6);
                  setOrderData();
                }}
                type="button"
                class={`btn btn-social-icon-text btn-facebook !border-1 hover:drop-shadow-sm !bg-transparent !text-[#bad10c]`}
              >
                <div className="!flex !items-center ">
                  <img
                    class="mdi mdi-facebook  !bg-transparent !border-1"
                    src="/images/orders/dispatched.png"
                    alt="act_img"
                  ></img>
                  Dispatched
                </div>
                {activeTab == 6 && (
                  <div className="animated-border bg-[#bad10c]"></div>
                )}
              </button>
            </div>
            <div className="">
              <button
                onClick={() => {
                  setActiveTab(7);
                  setOrderData();
                }}
                type="button"
                class={`btn btn-social-icon-text btn-facebook  !border-1 hover:drop-shadow-sm !bg-transparent text-success`}
              >
                <img
                  class="mdi mdi-facebook !bg-transparent !border-1"
                  src="/images/orders/delivered.png"
                  alt="act_img"
                ></img>
                Delivered
                {activeTab == 7 && (
                  <div className="animated-border bg-success"></div>
                )}
              </button>
            </div>
            <div className="">
              <button
                onClick={() => {
                  setActiveTab(9);
                  setOrderData();
                }}
                type="button"
                class={`btn btn-social-icon-text btn-facebook  !border-1 hover:drop-shadow-sm !bg-transparent !text-[#bb4f0d]`}
              >
                <img
                  class="mdi mdi-facebook !bg-transparent !border-1"
                  src="/images/orders/cancelled.png"
                  alt="act_img"
                ></img>
                Cancelled
                {activeTab == 9 && (
                  <div className="animated-border bg-[#bb4f0d]"></div>
                )}
              </button>
            </div>
            <div className="">
              <button
                onClick={() => {
                  setActiveTab(8);
                  setOrderData();
                }}
                type="button"
                class={`btn btn-social-icon-text btn-facebook drop-shadow-lg !border-1 hover:shadow-lg  !bg-transparent text-danger`}
              >
                <img
                  class="mdi mdi-facebook drop-shadow-lg !bg-transparent !border-1"
                  src="/images/orders/returned.png"
                  alt="act_img"
                ></img>
                Returned
                {activeTab == 8 && (
                  <div className="animated-border bg-danger"></div>
                )}
              </button>
            </div>
          </div>

          {/* Address Component */}
          {activeTab == 2 && (
            <div class="row mt-4 !border-0 drop-shadow-lg">
              <div class="col-12 refreshcards">
                <div class="card !border-0 ">
                  <div class="card-header border-0 !bg-white pb-0">
                    <h5 class="font-weight-bold">Addresses</h5>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-12 group col-md-4 col-lg-4 col-xl-4">
                        <div class="offer offer-success  border-0 group-hover:drop-shadow-xl ">
                          <div class="shape">
                            <div
                              class="shape-text"
                              data-toggle="tooltip"
                              title="Primary Address"
                            >
                              <i class="fa fa-bank"></i>
                            </div>
                          </div>
                          <div class="offer-content !drop-shadow-xl !py-0">
                            <h3 class="lead text-muted !font-semibold ">
                              Primary Address
                            </h3>
                            <p class="mb-1 drop-shadow-xl">
                              <i class="fa fa-building  mr-1"></i>
                              {clientData?.p_addres?.city}
                            </p>
                            <p class="mb-1 drop-shadow-xl">
                              <i class="fa fa-map-marker mr-1 "></i>
                              {clientData?.p_addres?.state}
                            </p>
                            <p class="mb-1 drop-shadow-xl">
                              <i class="fa fa-globe mr-1"></i>
                              {clientData?.p_addres?.country}
                            </p>
                            <p class="mb-1 drop-shadow-xl">
                              <i class="fa fa-street-view mr-1"></i>
                              {clientData?.p_addres?.zip}
                            </p>
                            <p class="mb-1 drop-shadow-xl">
                              <i class="fa fa-vcard mr-1"></i>
                              {clientData?.p_addres?.add_1}
                            </p>
                            {clientData?.p_addres?.add_2 != null && (
                              <p class="mb-1 drop-shadow-xl">
                                <i class="fa fa-vcard mr-1 truncate"></i>
                                {clientData?.p_addres?.add_2}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      {clientAddresses?.length > 0 &&
                        clientAddresses?.map((address, ind) => (
                          <div
                            key={ind}
                            class="col-12 group col-md-4 col-lg-4 col-xl-4"
                          >
                            <div class="offer offer-secondary  border-0 group-hover:drop-shadow-xl ">
                              <div class="shape">
                                <div
                                  class="shape-text"
                                  data-toggle="tooltip"
                                  title="Primary Address"
                                >
                                  <i class="fa fa-bank"></i>
                                </div>
                              </div>
                              <div class="offer-content !drop-shadow-xl !py-0">
                                <h3 class="lead text-muted !font-semibold ">
                                  Secondary Address
                                </h3>
                                <p class="mb-1 drop-shadow-xl">
                                  <i class="fa fa-building  mr-1"></i>
                                  {address?.city}
                                </p>
                                <p class="mb-1 drop-shadow-xl">
                                  <i class="fa fa-map-marker mr-1 "></i>
                                  {address?.state}
                                </p>
                                <p class="mb-1 drop-shadow-xl">
                                  <i class="fa fa-globe mr-1"></i>
                                  {address?.country}
                                </p>
                                <p class="mb-1 drop-shadow-xl">
                                  <i class="fa fa-street-view mr-1"></i>
                                  {address?.zip}
                                </p>
                                <p class="mb-1 drop-shadow-xl">
                                  <i class="fa fa-vcard mr-1"></i>
                                  {address?.add_1}
                                </p>
                                {address?.add_2 != null && (
                                  <p class="mb-1 drop-shadow-xl">
                                    <i class="fa fa-vcard mr-1 truncate"></i>
                                    {address?.add_2}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* order related status */}
          {activeTab == 1 && (
            <div className="row mt-4">
              <div className="hover:drop-shadow-lg col-md-4 grid-margin stretch-card ">
                <div class="card">
                  <div class="card-body ">
                    <h4 class="card-title">Client Logs</h4>
                    <ul class="bullet-line-list h-[35vh] overflow-auto drop-shadow-sm">
                      {clientActivity?.length > 0 &&
                        clientActivity?.map((activity, ind) => {
                          if (
                            activity?.action?.includes("Register") ||
                            activity?.action?.includes("log") ||
                            activity?.action?.includes("Add") ||
                            activity?.action?.includes("Remove")
                          ) {
                            return (
                              <li>
                                <h6>{activity?.action}</h6>
                                <p>{activity?.result} </p>
                                <p class="text-muted mb-4">
                                  <i class="mdi mdi-clock-outline"></i>
                                  {moment(activity?.created_at).fromNow()}
                                </p>
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="hover:drop-shadow-lg col-md-4 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body ">
                    <h4 class="card-title">Client Activities</h4>
                    <ul class="bullet-line-list h-[35vh] overflow-auto drop-shadow-sm">
                      {clientActivity?.length > 0 &&
                        clientActivity?.map((activity, ind) => {
                          if (
                            activity?.action?.includes("Order") ||
                            activity?.action?.includes("order")
                          ) {
                            return (
                              <li>
                                <h6>{activity?.action}</h6>
                                <p>{activity?.result} </p>
                                <p class="text-muted mb-4">
                                  <i class="mdi mdi-clock-outline"></i>
                                  {moment(activity?.created_at).fromNow()}
                                </p>
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="hover:drop-shadow-lg col-md-4 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Client Payments</h4>
                    <p>
                      {!hasValue(clientActivity, "action", "payment")
                        ? "No Payments Found"
                        : ""}
                    </p>
                    {hasValue(clientActivity, "action", "payment") && (
                      <ul class="bullet-line-list h-[35vh] overflow-auto drop-shadow-sm">
                        {clientActivity?.length > 0 &&
                          clientActivity?.map((activity, ind) => {
                            if (
                              activity?.action?.includes("Payment") ||
                              activity?.action?.includes("payment")
                            ) {
                              return (
                                <li>
                                  <h6>{activity?.action}</h6>
                                  <p>{activity?.result} </p>
                                  <p class="text-muted mb-4">
                                    <i class="mdi mdi-clock-outline"></i>
                                    {moment(activity?.created_at).fromNow()}
                                  </p>
                                </li>
                              );
                            }
                          })}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* orders placed */}
          {activeTab == 4 && (
            <div className="row">
              <div className="col-md-12 mt-3">
                <div className="drop-shadow-lg hover:shadow-lg card !border-none ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 m-2">
                    {tableData?.results?.length > 0 &&
                      tableData?.results?.map((row, ind) => (
                        <>
                          <div className="" key={ind}>
                            <div
                              className="p-2 bg-[#bcd2f5] border-1 shadow-sm hover:border-[#0d6efd] rounded-sm cursor-pointer"
                              onClick={() => setOrdNo(row?.id)}
                            >
                              <p>#{row?.order_number}</p>
                              <small className="truncate ">
                                {new Date(row?.created_at).toLocaleDateString()}
                              </small>
                            </div>
                          </div>
                        </>
                      ))}
                  </div>
                  {tableData?.results?.length == 0 && (
                    <p className="p-2  gap-2 m-2 text-sm antialiased w-[100%]">
                      No&nbsp;orders&nbsp;{type}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-md-9"></div>
            </div>
          )}
          {/* order confirmed */}
          {activeTab == 5 && (
            <div className="row">
              <div className="col-md-12 mt-3">
                <div className="drop-shadow-lg hover:shadow-lg card !border-none ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                    {tableData?.results?.length > 0 &&
                      tableData?.results?.map((row, ind) => (
                        <>
                          <div className=" m-2" key={ind}>
                            <div
                              className="p-2 bg-[#d2fff2] border-1 shadow-sm hover:border-[#0cd196] rounded-sm cursor-pointer"
                              onClick={() => setOrdNo(row?.id)}
                            >
                              <p>#{row?.order_number}</p>
                              <small className="truncate ">
                                {new Date(row?.created_at).toLocaleDateString()}
                              </small>
                            </div>
                          </div>
                        </>
                      ))}
                    {tableData?.results?.length == 0 && (
                      <p className="p-2  gap-2 m-2 text-sm antialiased">
                        No&nbsp;orders&nbsp;{type}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-9"></div>
            </div>
          )}
          {/* orders dispatched */}
          {activeTab == 6 && (
            <div className="row">
              <div className="col-md-12 mt-3">
                <div className="drop-shadow-lg hover:shadow-lg card !border-none ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                    {tableData?.results?.length > 0 &&
                      tableData?.results?.map((row, ind) => (
                        <>
                          <div className="m-2" key={ind}>
                            <div
                              className="p-2 bg-[#f7fcd7] border-1 shadow-sm hover:border-[#bad10c] rounded-sm cursor-pointer"
                              onClick={() => setOrdNo(row?.id)}
                            >
                              <p>#{row?.order_number}</p>
                              <small className="truncate ">
                                {new Date(row?.created_at).toLocaleDateString()}
                              </small>
                            </div>
                          </div>
                        </>
                      ))}
                    {tableData?.results?.length == 0 && (
                      <p className="p-2  gap-2 m-2 text-sm antialiased">
                        No&nbsp;orders&nbsp;{type}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-9"></div>
            </div>
          )}
          {/* orders delivered */}
          {activeTab == 7 && (
            <div className="row">
              <div className="col-md-12 mt-3">
                <div className="drop-shadow-lg hover:shadow-lg card !border-none ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                    {tableData?.results?.length > 0 &&
                      tableData?.results?.map((row, ind) => (
                        <>
                          <div className=" m-2" key={ind}>
                            <div
                              className="p-2 bg-[#e4f8d4] border-1 shadow-sm hover:border-[#273b17] rounded-sm cursor-pointer"
                              onClick={() => setOrdNo(row?.id)}
                            >
                              <p>#{row?.order_number}</p>
                              <small className="truncate ">
                                {new Date(row?.created_at).toLocaleDateString()}
                              </small>
                            </div>
                          </div>
                        </>
                      ))}
                    {tableData?.results?.length == 0 && (
                      <p className="p-2  gap-2 m-2 text-sm antialiased">
                        No&nbsp;orders&nbsp;{type}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-9"></div>
            </div>
          )}
          {/* orders cancelled */}
          {activeTab == 9 && (
            <div className="row">
              <div className="col-md-12 mt-3">
                <div className="drop-shadow-lg hover:shadow-lg card !border-none ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                    {tableData?.results?.length > 0 &&
                      tableData?.results?.map((row, ind) => (
                        <>
                          <div className=" m-2" key={ind}>
                            <div
                              className="p-2 bg-[#f5d1bb] shadow-sm border-1 hover:border-[#bb4f0d] rounded-sm cursor-pointer"
                              onClick={() => setOrdNo(row?.id)}
                            >
                              <p>#{row?.order_number}</p>
                              <small className="truncate ">
                                {new Date(row?.created_at).toLocaleDateString()}
                              </small>
                            </div>
                          </div>
                        </>
                      ))}
                    {tableData?.results?.length == 0 && (
                      <p className="p-2  gap-2 m-2 text-sm antialiased">
                        No&nbsp;orders&nbsp;{type}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-9"></div>
            </div>
          )}
          {/* orders returned */}
          {activeTab == 8 && (
            <div className="row">
              <div className="col-md-12 mt-3">
                <div className="drop-shadow-lg hover:shadow-lg card !border-none ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                    {tableData?.results?.length > 0 &&
                      tableData?.results?.map((row, ind) => (
                        <>
                          <div className=" m-2" key={ind}>
                            <div className="p-2 bg-[#f8d4d4] shadow-sm border-1 hover:border-red-600 rounded-sm cursor-pointer">
                              <p>#{row?.order_number}</p>
                              <small className="truncate ">
                                {new Date(row?.created_at).toLocaleDateString()}
                              </small>
                            </div>
                          </div>
                        </>
                      ))}
                    {tableData?.results?.length == 0 && (
                      <p className="p-2  gap-2 m-2 text-sm antialiased">
                        No&nbsp;orders&nbsp;{type}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-9"></div>
            </div>
          )}
          {/* payments related data */}
          {activeTab > 3 && (
            <div className="mt-4  card border-0 drop-shadow-lg shadow-sm">
              <h4 className="p-2 text-lg">Order Payment History</h4>
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
                  {orderData?.payments && (
                    <tbody>
                      {orderData?.payments?.map((data, i) => (
                        <tr key={i}>
                          <td style={{ paddingLeft: "1rem" }}>
                            {data?.order_id}
                          </td>
                          <td style={{ paddingLeft: "1rem" }}>
                            {orderData?.currency == "INR" ? "₹" : "$"}
                            {data?.total_amount}
                          </td>
                          <td
                            style={{ paddingLeft: "1rem" }}
                            className="text-danger"
                          >
                            {orderData?.currency == "INR" ? "₹" : "$"}
                            {data?.paid_amount}
                          </td>
                          <td
                            style={{ paddingLeft: "1rem" }}
                            className="text-danger"
                          >
                            {data?.transaction_id}
                          </td>
                          {data?.status === 1 && (
                            <td style={{ paddingLeft: "1rem" }}>
                              <label className="badge badge-success">
                                success
                              </label>
                            </td>
                          )}
                          {data?.status === 0 && (
                            <td style={{ paddingLeft: "1rem" }}>
                              <label className="badge badge-info">
                                Initiated
                              </label>
                            </td>
                          )}
                          {data?.status === 2 && (
                            <td style={{ paddingLeft: "1rem" }}>
                              <label className="badge badge-danger">
                                Failed
                              </label>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
                {!orderData?.payments?.length && (
                  <p className="w-full text-center pb-3">No Payments Found</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-5 bottom-0  flex justify-center">
        <CopyRight />
      </div>
    </>
  );
}
