import React, { useEffect, useState } from "react";
import NavbarMarquee from "../../navbar/marquee";
import TopNavbar from "../../navbar/topNavbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoaderFalse, setLoaderTrue } from "../../../slice/loaderSlice";
import axios from "axios";
import CopyRight from "../../copyright/Copyright";

export default function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [customersArray, setCustomersArray] = useState();
  const [originalCustomersArray, setOriginalCustomersArray] = useState()
  const [searchedText, setSearchedText] = useState("")
  const [next, setNext] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const [LastPage, setLastPage] = useState()
  const [prevPage, setPrevPage] = useState()

  useEffect(()=>{
    const fetchCustomers =async()=>{
      try{
        dispatch(setLoaderTrue());
        const token = localStorage.getItem("tmToken")
        const response = await axios.get("https://admin.tradingmaterials.com/api/staff/customers", {headers: {
          Authorization: "Bearer "+token
        }})
        if(response?.data?.status){
          setCustomersArray(response?.data?.data?.customers?.data)
          setOriginalCustomersArray(response?.data?.data?.customers)
          setCurrentPage(response?.data?.data?.customers?.current_page)
          setLastPage(response?.data?.data?.customers?.last_page)
          setNext(response?.data?.data?.customers?.next_page_url)
          setPrevPage(response?.data?.data?.customers?.prev_page_url)
        }

      }catch(err){
        console.log(err)
      }finally{
        dispatch(setLoaderFalse())
      }
    }

    fetchCustomers()
  },[])

  const handlePrevPage = async() => {
    try{
      dispatch(setLoaderTrue())
      const response = await axios.get(prevPage,{headers: {
        Authorization: "Bearer "+localStorage.getItem("tmToken")

      }})
      if(response?.data?.status){
        setOriginalCustomersArray(response?.data?.data?.customers)
        setCustomersArray(response?.data?.data?.customers?.data)
        setCurrentPage(response?.data?.data?.customers?.current_page)
        setLastPage(response?.data?.data?.customers?.last_page)
        setNext(response?.data?.data?.customers?.next_page_url)
      }
      
    }catch(err){console.log(err)}
    finally{dispatch(setLoaderFalse())}
  };

  // handling pagination
  const handleNextPage = async()=>{
    //api for handling pagination
    try{
      dispatch(setLoaderTrue())
      setCurrentPage(currentPage+1)
      const response = await axios.get(next,{headers: {
        Authorization: "Bearer "+localStorage.getItem("tmToken")

      }})
      if(response?.data?.status){
        setOriginalCustomersArray(response?.data?.data?.customers)
        setCustomersArray(response?.data?.data?.customers?.data)
        setCurrentPage(response?.data?.data?.customers?.current_page)
        setLastPage(response?.data?.data?.customers?.last_page)
        setNext(response?.data?.data?.customers?.next_page_url)
      }
      
    }catch(err){console.log(err)}
    finally{dispatch(setLoaderFalse())}
  }

  const handleSelectedPage = async(pageNo)=>{
    //api for handling pagination
    try{
      dispatch(setLoaderTrue())
      setCurrentPage(currentPage+1)
      const response = await axios.get(`https://admin.tradingmaterials.com/api/staff/customers?page=${pageNo}
      `,{headers: {
        Authorization: "Bearer "+localStorage.getItem("tmToken")

      }})
      if(response?.data?.status){
        setOriginalCustomersArray(response?.data?.data?.customers)
        setCustomersArray(response?.data?.data?.customers?.data)
        setCurrentPage(response?.data?.data?.customers?.current_page)
        setLastPage(response?.data?.data?.customers?.last_page)
        setNext(response?.data?.data?.customers?.next_page_url)
      }
      
    }catch(err){console.log(err)}
    finally{dispatch(setLoaderFalse())}
  }

  // handling search customers
  const handleCustomerSearch = (event) =>{
    const searchText = event?.target?.value
    setSearchedText(searchText)
    if(searchText != "")
    {const filteredData = originalCustomersArray?.data.filter((item) =>
        item?.email?.toLowerCase().startsWith(searchText.toLowerCase()) || item?.order_number?.includes(searchText?.toLowerCase()) || item?.customer?.first_name?.startsWith(searchText?.toLowerCase())
      ); 
      

      setCustomersArray(filteredData)
    }else{
        setCustomersArray(originalCustomersArray?.data)
      }
  } 

  return (
    <>
      <div className="container-scroller  sm:relative top-[0px] sm:top-[60px] md:top-[100px] lg:top-[0px] marqueePosition min-h-[100vh]">
        <TopNavbar />
        <div className="top-[63px] sm:top-[0px]">
          <NavbarMarquee />
        </div>
        <div className="page-header border-0 !py-0 !mt-0  container">
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
            <li className=" active ">&#160;/ Customers</li>
          </ol>
          {/* <!-- End breadcrumb --> */}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12 ">
              <div className="card !border-0 ">
                <div className="card-header !bg-white d-flex flex-wrap justify-between items-center px-4 py-2 !border-b-0">
                  <div className="card-title !drop-shadow-lg m-0">
                    <i className="fa fa-users mr-1"></i>
                    Customers
                  </div>
                  <div className="search_form">
                    <div className="form-group mb-0 d-flex align-items-baseline">
                      <label className="mb-0 mr-1 hover:drop-shadow-sm">
                        Search:
                      </label>
                      <input
                        type="search"
                        name="searchparm"
                        value={searchedText}
                        onChange={handleCustomerSearch}
                        placeholder="search here"
                        className="form-control csearch hover:drop-shadow-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div className="table-responsive ">
                    {customersArray?.length > 0 ? (
                      <table
                        id="fileexport-datatable"
                        className="table key-buttons text-nowrap"
                      >
                        <thead>
                          <tr className=" border-y">
                            <th className="border-bottom-0 ">Profile</th>
                            <th className="border-bottom-0">Name</th>
                            <th className="border-bottom-0">Email</th>
                            <th className="border-bottom-0">Phone</th>
                            <th className="border-bottom-0">Orders</th>
                            <th className="border-bottom-0">Action</th>
                          </tr>
                        </thead>
                        <tbody className="refresh_customers">
                          {customersArray?.map((customer, ind) => (
                            <tr className="border-b gropu hover:drop-shadow-lg">
                              <td>
                                <div className="avatar-group">
                                  <a className="avatar avatar-sm" href="#">
                                    {customer?.profile_image != null ? (
                                      <img
                                        alt="placeholder"
                                        className="drop-shadow-lg rounded-circle !w-[30px] !h-[30px] "
                                        src={
                                          customer?.profile_image?.profile_image
                                        }
                                      />
                                    ) : (
                                      <img
                                        alt="placeholder"
                                        className="rounded-circle !w-[30px] !h-[30px]"
                                        src="/images/blueProfile.png"
                                      />
                                    )}
                                  </a>
                                </div>
                              </td>
                              <td>
                                <p className="mb-0 group-hover:drop-shadow-lg text-capitalize">
                                  {customer?.first_name}
                                </p>
                              </td>
                              <td>
                                <p className="mb-0 group-hover:drop-shadow-lg fa-12 text-[#2bb4a6]">
                                  {customer?.email}
                                </p>
                              </td>
                              <td>
                                <p className="mb-0 group-hover:drop-shadow-lg  fa-14 text-[#2bb4a6]">
                                  {customer?.phone}
                                </p>
                              </td>
                              <td>
                                <p className="mb-0 group-hover:drop-shadow-lg fa-14 !text-indigo-5">
                                  {customer?.orders}
                                </p>
                              </td>
                              <td>
                                <button
                                  className="btn btn-teal text-white !bg-[#2bb4a6]"
                                  onClick={() => {
                                    navigate(
                                      `/enquiry/customers/view-customer/${customer?.id}`
                                    );
                                  }}
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="!font-semibold text-lg text-gray-600 text-center w-full">
                        Customers not found
                      </p>
                    )}
                  </div>
                  <div className="!flex  justify-end">
                    <ul className="pagination">
                      <li
                        class={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          type="button"
                          className="page-link"
                          onClick={() => {
                            handleSelectedPage(currentPage - 1);
                          }}
                        >
                          Prev
                        </button>
                      </li>
                      {Array.from({ length: LastPage }, (_, index) => (
                        <li
                          key={index}
                          class={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => {
                              handleSelectedPage(index + 1);
                            }}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li
                        class={`page-item ${next === null ? "disabled" : ""}`}
                      >
                        <button
                          type="button"
                          className="page-link"
                          onClick={handleNextPage}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 bottom-0  flex justify-center">
        <CopyRight />
      </div>
    </>
  );
}
