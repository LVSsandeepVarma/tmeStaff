import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
// import { ButtonGroup, Dropdown } from "react-bootstrap";
// // import { FaRepeat, FaPhoneVolume, FaCalendarPlus, FaHeadset } from 'react-icons/fa';
// import { AiOutlineCaretDown } from "react-icons/ai";
// import { CgPhone } from "react-icons/cg";
// import { BsCalendarPlus } from "react-icons/bs";
// import { TbPlugConnected } from "react-icons/tb";
// import PostponedModal from "../../modals/postponedModal";
// import RingingModal from "../../modals/ringingModal";
// import NotIntrestedModal from "../../modals/notIntrestedModal";
// import CommentsModal from "../../modals/commentsModal";
// import EmailVerificationModal from "../../modals/emailVerifiedModal";
import emailVerification from "../verification/emailVerification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const StaffActionsTable = () => {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTable, setFilteredTable] = useState([]);

  // const [showCommetnsModal, setShowCommentsModal] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState();
  const [showEmailVerifyModal, setShowEmailVerifyModal] = useState(false);
  const [id, setId] = useState("");
  const [itemsInPage, setItemsInPage] = useState(10);
  const [activeTab, setActiveTab] = useState("Today")
  const [fetchStaffActionsErr, setStaffActionsErr] = useState("")
  const [next, setNext] = useState("");
  // Calculate the total number of pages 
  const totalPages = Math.ceil(tableData?.length / itemsInPage);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = sessionStorage.getItem("tmToken")?.length
          ? sessionStorage.getItem("tmToken")
          : localStorage.getItem("tmToken");
        const response = await axios.get(
          "https://admin.tradingmaterials.com/api/staff/get-enquiries",
          {
            
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response?.data.data.orders?.data, "nitable");
        setTableData([...response?.data?.data?.today]);
        if(response?.data?.data?.today?.length <= 10){
            setNext(null);
        }
        setCurrentPage(1);
        //   dispatch(setUserInfo(response?.data))
      } catch (error) {
        console.error(error);
        setStaffActionsErr(error?.response?.data?.error)
      }
    };

    fetchUserInfo();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Filter the table data based on the search query
    const filteredData = tableData.filter(
      (item) =>
        // console.log(item)
        item?.email
          ?.toLowerCase()
          .startsWith(event.target.value.toLowerCase()) ||
        item?.order_number?.includes(event.target.value?.toLowerCase()) ||
        item?.customer?.first_name?.startsWith(
          event.target.value?.toLowerCase()
        )
    );
    // Update the table data with the filtered results
    setFilteredTable(filteredData);
  };



  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const fetchUserInfo = async () => {
      try {
        const token = sessionStorage.getItem("tmToken")?.length
          ? sessionStorage.getItem("tmToken")
          : localStorage.getItem("tmToken");
        const response = await axios.get(
          "https://admin.tradingmaterials.com/api/staff/get-enquiries",
          {
            
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response?.data.data.orders?.data, "nitable");
        setTableData([...tableData, ...response?.data?.data?.orders?.data]);
        currentData = [...tableData, ...response?.data?.data?.orders?.data];
        setNext(response?.data?.data?.orders?.next_cursor);
        setCurrentPage(currentPage + 1);
      } catch (error) {
        console.error(error);
      }
    };

    if (next !== null) {
      fetchUserInfo();
      setCurrentPage(currentPage + 1);
    }
  };

  // Get the current page's data
  console.log(itemsInPage);
  const startIndex = (currentPage - 1) * itemsInPage;
  const endIndex = startIndex + itemsInPage;
  let currentData = tableData?.slice(startIndex, endIndex);
  if (searchQuery !== "") {
    currentData = filteredTable?.slice(startIndex, endIndex);
  }

  async function handleEmailverification(id) {
    console.log(id);
    setId(id);
    const emailVerifyResponse = await emailVerification(id);
    setShowEmailVerifyModal(true);
    console.log(emailVerifyResponse);
    setVerifyEmail(emailVerifyResponse);
  }

  return (
    <div className="drop-shadow-lg">
  
      <div className="!flex">
        {/* <div className="!flex justify-start w-[20%] items-center ">
          Show
          <select
            value={itemsInPage}
            onChange={(e) => {
              handleItemsPerPageChange(e);
            }}
            style={{ border: "1px solid" }}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          Entries
        </div> */}
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
      <div className="!overflow-x-auto sm:!overflow-x-auto  md:!overflow-x-visible table-responsive" >
        <table  className="table border table-bordered text-nowrap mb-0 ">
          <thead>
            <tr className="">
              <th className="border border-r-1">Name</th>
              
              <th className="border border-r-1">Email</th>
              <th className="border border-r-1">Phone</th>
              <th className="border border-r-1">Created Date</th>
              <th className="border border-r-1">Domain</th>
              {/* <th >Action</th>
              <th></th> */}
            </tr>
          </thead>
          {currentData?.length > 0 ? (
            <tbody>
              {currentData.map((row) => (
                <tr key={row.id}>
                  <td className="">
                    <h5 className="text-[#25378b] mb-1">
                      {row?.first_name} {row?.last_name}
                    </h5>
                    <p className="mb-0">
                      {/* {row.city} / {row.country}  */}
                    </p>
                  </td>
                  {/* <td>{row.first_name}</td> */}
                  
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
                  <td>{new Date(row.created_at).toLocaleString('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{row?.domain}</td>
                  {/* <td className="!relative" key={row.id}>
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
                  </td> */}
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
        </table>
      </div>
      

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
              class={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li class={`page-item ${next === null ? "disabled" : ""}`}>
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
  );
};

export default StaffActionsTable;
