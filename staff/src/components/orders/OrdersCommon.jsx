import { Table } from 'react-bootstrap';
import {useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CommentsModal from '../modals/commentsModal';
import PostponedModal from '../modals/postponedModal';
import RingingModal from '../modals/ringingModal';
import NotIntrestedModal from '../modals/notIntrestedModal';
import EmailVerificationModal from '../modals/emailVerifiedModal';
import emailVerification from "../verification/emailVerification";
import { useDispatch, useSelector } from "react-redux"
import Loading from '../loader/loading';
import { setLoaderFalse, setLoaderTrue } from '../../slice/loaderSlice';
import CopyRight from '../copyright/Copyright';

const OrdersCommon = () => {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTable, setFilteredTable] = useState([]);
  const [show, setShow] = useState(false);
  const [ringingEnquiryModalShow, setRingingEnquiryShowModal] = useState(false);
  const [notIntrestedModalShow, setNotIntrestedModalShow] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState()
  const [showEmailVerifyModal,setShowEmailVerifyModal] = useState(false)
  const [id, setId] = useState("");
  const [showCommetnsModal, setShowCommentsModal] = useState(false);
  const [clientID, setClientID] = useState();
  const [commentsArr, setCommentsArr] = useState([]);
  const [itemsInPage, setItemsInPage] = useState(10);
  const [links, setLinks] = useState([])
  const [currentData, setCurrentData] = useState([])
  const [currentDataDup, setCurrentDatadup] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [next, setNext] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const { type, title } = GetApiTitle();

    useEffect(()=>{
        const fetchUserInfo = async () =>{
            try{
                dispatch(setLoaderTrue())
              const token = sessionStorage.getItem("tmToken")?.length ? sessionStorage.getItem("tmToken") : localStorage.getItem("tmToken")
              const response = await axios.get("https://admin.tradingmaterials.com/api/staff/get-orders?", {
                params: {
                    type: type
                  },
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              if(response?.data?.status){
                dispatch(setLoaderFalse())

              }
              
              setTableData([...response?.data?.data?.orders?.data])
              setCurrentData([...response?.data?.data?.orders?.data]);
              setCurrentDatadup([...response?.data?.data?.orders?.data]);
              setNext(response?.data?.data?.orders?.next_cursor)
              setCurrentPage(response?.data?.data?.orders?.current_page)
              console.log("test")
              setLinks(response?.data?.data?.orders?.links)
              // setTotalPages(response?.data?.data?.links)
              setTotalPages(response?.data?.data?.orders?.last_page);
              console.log(tableData.length, "useEffetc")
            }catch(error){
              console.error(error)
                dispatch(setLoaderFalse())

            }
          }
      
          fetchUserInfo()
    }, [type])
  

  

    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      const filteredData = tableData.filter(
        (item) =>
          item?.email
            ?.toLowerCase()
            .startsWith(event.target.value.toLowerCase()) ||
          item?.order_number?.includes(event.target.value?.toLowerCase()) ||
          item?.name?.toLowerCase()?.includes(event.target.value?.toLowerCase())
      ); 
      // Update the table data with the filtered results
      setFilteredTable(filteredData);
        if (event.target.value !== "") {
          setCurrentData(filteredTable);
        } else {
          setCurrentData(currentDataDup);
        }
    };


  // const totalPages = Math.ceil(tableData?.length / itemsInPage);

  // Pagination state


  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      console.log("test");
      const fetchUserInfo = async () => {
        if (currentPage-1 >=0) {
          try {
            const token = sessionStorage.getItem("tmToken")?.length
              ? sessionStorage.getItem("tmToken")
              : localStorage.getItem("tmToken");
            const link = links[currentPage-1]?.url;
            console.log(link, currentPage, "nitable");
            const response = await axios.get(
              "https://admin.tradingmaterials.com/api/staff/get-orders?",
              {
                params: {
                  type: type,
                  page: currentPage-1 ,
                },
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(response?.data.data.orders?.data, "nitable");
            setTableData([...tableData, ...response?.data?.data?.orders?.data]);
            setCurrentData([...response?.data?.data?.orders?.data]);
            setCurrentDataDup([...response?.data?.data?.orders?.data]);
            setNext(currentPage + 1);
            setCurrentPage(response?.data?.data?.orders?.current_page);
            console.log("test");
          } catch (error) {
            console.error(error);
          }
        }
      };
      fetchUserInfo()
    }
  };

  const fetchUserInfoPerPage = async (pageNo) => {
        console.log(pageNo, totalPages, "test")
        if (totalPages >= pageNo) {
          try {
            const token = sessionStorage.getItem("tmToken")?.length
              ? sessionStorage.getItem("tmToken")
              : localStorage.getItem("tmToken");
            const link = links[currentPage]?.url;
            console.log(link, currentPage, "nitable");
            const response = await axios.get(
              "https://admin.tradingmaterials.com/api/staff/get-orders?",
              {
                params: {
                  type: type,
                  page: pageNo,
                },
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setCurrentPage(pageNo);
            console.log(...response?.data.data.orders?.data, "nitable");
            setTableData([...tableData, ...response?.data?.data?.orders?.data]);
            setCurrentData([...response?.data?.data?.orders?.data]);
            setCurrentDataDup([...response?.data?.data?.orders?.data]);
            setNext(response?.data?.data?.orders?.next_cursor);
            setTotalPages(response?.data?.data?.orders?.last_page);
            
            console.log("test");
          } catch (error) {
            console.error(error);
          }
        }
      };

  const handleNextPage = () => {

    const fetchUserInfo = async () => {
      if (totalPages >= currentPage + 1) {
        try {
          const token = sessionStorage.getItem("tmToken")?.length ? sessionStorage.getItem("tmToken") : localStorage.getItem("tmToken")
          const link = links[currentPage]?.url
          console.log(link, currentPage, "nitable")
          const response = await axios.get(
            "https://admin.tradingmaterials.com/api/staff/get-orders?",
            {
              params: {
                type: type,
                page: currentPage+1,
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response?.data.data.orders?.data, "nitable")
          setTableData([...tableData,...response?.data?.data?.orders?.data])
          setCurrentData([...response?.data?.data?.orders?.data])
          setCurrentDataDup([...response?.data?.data?.orders?.data]);
          setNext(currentPage+1)
          setCurrentPage(response?.data?.data?.orders?.current_page)
          console.log("test");
        } catch (error) {
          console.error(error)
        }
      }
    }
    console.log(currentPage, totalPages, "ind")
    if(currentPage < totalPages){
        fetchUserInfo()
      setCurrentPage(currentPage + 1);
      console.log("test");
    }
  };




  // Get the current page's data
  console.log(itemsInPage)
  const startIndex = (currentPage - 1) * itemsInPage;
  const endIndex = startIndex + itemsInPage;
  // if(searchQuery !== ""){
  //   setCurrentData(filteredTable?.slice(startIndex, endIndex));
  // }
  console.log(currentData, tableData, startIndex, endIndex, "nitable")

  async function handleEmailverification(id){
    console.log(id)
    setId(id)
    const emailVerifyResponse  =await emailVerification(id)
    setShowEmailVerifyModal(true)
    console.log(emailVerifyResponse )
    setVerifyEmail(emailVerifyResponse)
  }

  const handleRingingTransferModal=(id)=>{
    setRingingEnquiryShowModal(true);
    setId(id)
  }
  
  const handlePostponedTransferModal = (id)=>{
    setShow(true);
    setId(id)
  }
  
  const handleNotIntrestedTransferModal = (id)=>{
    setNotIntrestedModalShow(true);
    setId(id)
  }

  const handleCommentModalDispaly =(id)=>{
    setShowCommentsModal(true)
    setClientID(id)
    const fetchEnquiryComments=async()=>{
      try{
        const token = localStorage.getItem("tmToken");
        const response = await axios.get(`https://admin.tradingmaterials.com/api/staff/get-comments?client_id=${id}`,{
          headers:{Authorization: `Bearer ${token}`}
        })
        let comments =[[],[],[]];
        comments[0].push(...response?.data?.data?.notin_comments)
        comments[1].push(...response?.data?.data?.post_comments)
        comments[2].push(...response?.data?.data?.ring_comments)
        setCommentsArr([...comments])

      }catch(err){
        console.log(err)
      }
    }
    
    fetchEnquiryComments()
  }

  // const handleItemsPerPageChange=(event)=>{
  //   console.log("limit",event.target.value);
  //   setItemsInPage(event.target.value)
  // }
  const loader = useSelector((state) => state?.loaderReducer)
  return (
    <>
      <div>
        {loader?.value == true ? <Loading /> : ""}
        <CommentsModal
          show={showCommetnsModal}
          setShowCommentsModal={setShowCommentsModal}
          data={commentsArr}
        />
        <PostponedModal show={show} setShow={setShow} id={id} source={"NEW"} />
        <RingingModal
          show={ringingEnquiryModalShow}
          setShow={setRingingEnquiryShowModal}
          id={id}
          source={"NEW"}
        />
        <NotIntrestedModal
          show={notIntrestedModalShow}
          setShow={setNotIntrestedModalShow}
          id={id}
          source={"NEW"}
        />
        <EmailVerificationModal
          show={showEmailVerifyModal}
          setShowEmailVerifyModal={setShowEmailVerifyModal}
          response={verifyEmail}
        />
        <div className="!flex">
          <div className="!flex justify-end !w-[100%] mb-1">
            <div className="input-group !w-[15vw] ">
              <input
                type="text"
                className="form-control flex w-[100%] justify-end"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <div className="!overflow-x-auto sm:!overflow-x-auto  md:!overflow-x-visible">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Order no</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Created Date</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            {currentData?.length > 0 ? (
              <tbody>
                {currentData.map((row) => (
                  <tr key={row.id}>
                    <td className="">
                      <h5 className="text-[#25378b] mb-1">{row?.name}</h5>
                      {row?.city && row?.country && (
                        <p className="mb-0">
                          {row.city} / {row.country} /ip
                        </p>
                      )}
                    </td>
                    {/* <td>{row.first_name}</td> */}
                    <td>{row?.order_number}</td>
                    {!row.email_verified === 1 ? (
                      <td
                        className={
                          !row?.email_verified &&
                          "cursor-pointer text-warning iconWrap Email_Varify"
                        }
                        onClick={() => handleEmailverification(row?.id)}
                      >
                        {!row.email_verified === 1 && (
                          <FontAwesomeIcon
                            color="#ffc107"
                            icon={faExclamationCircle}
                            data-id="148"
                            style={{ cursor: "pointer" }}
                          ></FontAwesomeIcon>
                        )}
                        {row.email}
                      </td>
                    ) : (
                      <td>{row?.email}</td>
                    )}
                    <td>{row.phone}</td>
                    <td>{new Date(row.created_at).toLocaleDateString()}</td>
                    <td className="" key={row.id}>
                      <button
                        class="btn btn-light"
                        onClick={() =>
                          navigate(`/enquiry/orders/view/${row?.id}`)
                        }
                      >
                        <i class="mdi mdi-eye text-primary"></i>View
                      </button>
                    </td>
                    <td>
                      <div
                        className="!flex items-center justify-center"
                        onClick={() => handleCommentModalDispaly(row?.id)}
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          color="grey"
                          icon={faComment}
                          data-id="148"
                          style={{ cursor: "pointer" }}
                        ></FontAwesomeIcon>
                        <FontAwesomeIcon
                          color="#25378b"
                          icon={faExclamationCircle}
                          data-id="148"
                          style={{ cursor: "pointer" }}
                        ></FontAwesomeIcon>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  <p className="text-muted">No data available in table</p>
                </td>
              </tr>
            )}
          </Table>
        </div>

        {currentData?.length > 0 && (
          <div className="!flex  justify-end">
            <ul className="pagination">
              <li class={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={handlePrevPage}>
                  Prev
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  class={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => fetchUserInfoPerPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                class={`page-item ${
                  totalPages == currentPage ? "disabled" : ""
                }`}
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
        )}
      </div>
    </>
  );
};

export default OrdersCommon;


export const GetApiTitle=()=>{
    const location=useLocation()
    const params = useParams();
    const id = params.id;
    let type = '';
    let title = '';
    let main=" ";
    let iSmall="";
    let iLarge=""
switch (location.pathname) {
case '/enquiry/orders/placed':
 case '/enquiry/orders/placed/':
 type = 'placed';
 title = 'Placed Orders';
 main="Orders";
 iSmall="/images/Order-Placed-Blue-Small.png";
iLarge="/images/Order-Placed-Blue-Small.png";
 break;
 case '/enquiry/orders/confirmed':
   case '/enquiry/orders/confirmed/':
   type = 'confirmed';
   title = 'Confirmed Orders';
   main="Orders";
   iSmall="/images/Order-Confirmed-Blue-Small.png";
iLarge="/images/Order-Confirmed-Blue-Small.png";
   break;
case '/enquiry/orders/dispatched':
 case '/enquiry/orders/dispatched/':
 type = 'dispatched';
 title = 'Dispatched Orders';
 main="Orders";
 iSmall="/images/Order-Dispatched-Blue-Small.png";
iLarge="/images/Order-Dispatched-Blue-Small.png";
 break;
case '/enquiry/orders/delivered':
 case '/enquiry/orders/delivered/':
 type = 'delivered';
 title = 'Delivered Orders';
 main="Orders";
 iSmall="/images/Order-Delivered-Blue-Small.png";
iLarge="/images/Order-Delivered-Blue-Small.png";
 break;
case '/enquiry/orders/returned':
 case '/enquiry/orders/returned/':
 type = 'returned';
 title = 'Returned Orders';
 main="Orders";
 iSmall="/images/Order-Returned-Blue-Small.png";
iLarge="/images/Order-Returned-Blue-Small.png";
 break;
case '/enquiry/orders/cancelled':
 case '/enquiry/orders/cancelled/':
 type = 'cancelled';
 title = 'Cancelled Orders';
 main="Orders";
 iSmall="/images/Order-Cancelled-Blue-Small.png";
iLarge="/images/Order-Cancelled-Blue-Small.png";
 break; 
case '/enquiry/assigned-enquiry':
 case '/enquiry/assigned-enquiry/':
 type = 'NEW';
 title = 'Assigned';
 main="Enquiry";
 iSmall="/images/Order-Placed-Blue-Small.png";
iLarge="/images/Order-Placed-Blue-Small.png";
 break;
 case '/enquiry/ringing-enquiry':
 case '/enquiry/ringing-enquiry/':
 type = 'RINGING';
 title = 'Ringing';
 main="Enquiry";
 iSmall="/images/Order-Placed-Blue-Small.png";
iLarge="/images/Order-Placed-Blue-Small.png";
 break;
 case '/enquiry/postponed-enquiry':
 case '/enquiry/postponed-enquiry/':
 type = 'POSTPONED';
 title = 'Postponed';
 main="Enquiry";
 iSmall="/images/Order-Placed-Blue-Small.png";
iLarge="/images/Order-Placed-Blue-Small.png";
 break;
 case '/enquiry/not-intersted-enquiry':
 case '/enquiry/not-intersted-enquiry/':
 type = 'NOT-INTERESTED';
 title = 'Not Interested';
 main="Enquiry";
 iSmall="/images/Order-Placed-Blue-Small.png";
iLarge="/images/Order-Placed-Blue-Small.png";
 break;
 case '/enquiry/not-todays-ringing-enquiry':
 case '/enquiry/not-todays-ringing-enquiry/':
 type = 'TODAYS-RING';
 title = 'Todays Ringing';
 main="Enquiry";
 iSmall="/images/Order-Placed-Blue-Small.png";
iLarge="/images/Order-Placed-Blue-Small.png";
 break;
 case '/enquiry/not-todays-postponed-enquiry':
 case '/enquiry/not-todays-postponed-enquiry/':
 type = 'TODAYS-POST';
 title = 'Today Postponed';
 main="Enquiry";
 iSmall="/images/Order-Placed-Blue-Small.png";
iLarge="/images/Order-Placed-Blue-Small.png";
 break;
default:
 type = '';
 title = '';
 main="";
 iSmall="";
iLarge="";
 const orderRegex = /^\/dashboard\/order\/(\d+)$/;
 const customerRegex = /^\/dashboard\/customer\/(\d+)$/;
 if (location.pathname.includes("dashboard/order/")) {
  
   type = '';
   title = "#"+params?.number;
   main ='Order';
 }
 if (location.pathname.includes("dashboard/customer/")) {
   type = '';
   title = params.name;
   main ='Customer';
 }
}
return { type, title,main ,iSmall,iLarge};
}