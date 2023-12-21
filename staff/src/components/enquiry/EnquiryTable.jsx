import { Table, Pagination } from 'react-bootstrap';
import {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
// import { FaRepeat, FaPhoneVolume, FaCalendarPlus, FaHeadset } from 'react-icons/fa';
import { AiOutlineCaretDown} from "react-icons/ai"
import {CgPhone} from "react-icons/cg";
import {BsCalendarPlus} from "react-icons/bs";
import {TbPlugConnected} from "react-icons/tb"
import PostponedModal from '../modals/postponedModal';
import RingingModal from '../modals/ringingModal';
import NotIntrestedModal from '../modals/notIntrestedModal';
import CommentsModal from '../modals/commentsModal';
import EmailVerificationModal from '../modals/emailVerifiedModal';
import emailVerification from '../verification/emailVerification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { GetApiTitle } from '../orders/OrdersCommon';

const EnquiryTable = () => {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTable, setFilteredTable] = useState([]);
    const [show, setShow] = useState(false);
    const [ringingEnquiryModalShow, setRingingEnquiryShowModal] = useState(false);
    const [notIntrestedModalShow, setNotIntrestedModalShow] = useState(false);
    // const [showCommetnsModal, setShowCommentsModal] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState()
    const [showEmailVerifyModal,setShowEmailVerifyModal] = useState(false)
    const [id, setId] = useState("");
    const [showCommetnsModal, setShowCommentsModal] = useState(false);
    const [clientID, setClientID] = useState();
    const [commentsArr, setCommentsArr] = useState([]);
    const [itemsInPage, setItemsInPage] = useState(10)
    const { type, title } = GetApiTitle();
    useEffect(()=>{
        const fetchUserInfo = async () =>{
            try{
              const token = sessionStorage.getItem("tmToken")?.length ? sessionStorage.getItem("tmToken") : localStorage.getItem("tmToken")
              const response = await axios.get("https://admin.tradingmaterials.com/api/staff/enq-by-type?", {
                params: {
                    type: type
                  },
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              console.log(response?.data.data.enquiries, "nitable")
              setTableData(response?.data?.data?.enquiries)
            //   dispatch(setUserInfo(response?.data))
            }catch(error){
              console.error(error)
            }
          }
          setCurrentPage(1)
          fetchUserInfo()
    },[type])

    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      // Filter the table data based on the search query
      const filteredData = tableData.filter((item) =>
      // console.log(item)
        item?.first_name?.toLowerCase().startsWith(event.target.value.toLowerCase())
      );
      // Update the table data with the filtered results
      setFilteredTable(filteredData);
    };


  // Number of items to display per page
  const itemsPerPage = 10;

  // Calculate the total number of pages
  const totalPages = Math.ceil(tableData.length / itemsInPage);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  // Get the current page's data
  console.log(itemsInPage)
  const startIndex = (currentPage - 1) * itemsInPage;
  const endIndex = startIndex + itemsInPage;
  let currentData = tableData.slice(startIndex, endIndex)
  if(searchQuery != ""){
    currentData = filteredTable.slice(startIndex, endIndex);
  }

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
        console.log(response?.data?.data?.notin_comments)
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

  const handleItemsPerPageChange=(event)=>{
    console.log("limit",event.target.value);
    setItemsInPage(event.target.value)
  }

  return (
    <div>
      <CommentsModal
        show={showCommetnsModal}
        setShowCommentsModal={setShowCommentsModal}
        data={commentsArr}
      />
      <PostponedModal show={show} setShow={setShow} id={id} source={type} />
      <RingingModal
        show={ringingEnquiryModalShow}
        setShow={setRingingEnquiryShowModal}
        id={id}
        source={type}
      />
      <NotIntrestedModal
        show={notIntrestedModalShow}
        setShow={setNotIntrestedModalShow}
        id={id}
        source={type}
      />
      <EmailVerificationModal
        show={showEmailVerifyModal}
        setShowEmailVerifyModal={setShowEmailVerifyModal}
        response={verifyEmail}
      />
      <div className="!flex">
        <div className="!flex justify-start w-[20%] items-center ">
          Show&nbsp;
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
          &nbsp;Entries
        </div>
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
              <th>ENQUIRY</th>
              <th>Email</th>
              <th>Phone</th>
              <th>
                MODIFIED DATE <small>(MM/DD/YYYY)</small>
              </th>
              <th>ACTION</th>
              <th></th>
            </tr>
          </thead>
          {currentData?.length > 0 ? (
            <tbody>
              {currentData.map((row) => (
                <tr key={row.id}>
                  <td className="">
                    <h5 className="text-[#25378b] mb-1">
                      {row.first_name} {row?.last_name}
                    </h5>
                    {row?.country && row?.state && (
                      <p className="mb-0">
                        {row.city} / {row.country} /ip
                      </p>
                    )}
                  </td>
                  {/* <td>{row.first_name}</td> */}
                  {!row.email_verified == 1 ? (
                    <td
                      className={
                        !row?.email_verified &&
                        "cursor-pointer text-warning iconWrap Email_Varify"
                      }
                      onClick={() => handleEmailverification(row?.id)}
                    >
                      {!row.email_verified == 1 && (
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
                  <td>{new Date(row.updated_at).toLocaleDateString()}</td>
                  <td className="!relative" key={row.id}>
                    <div className="!relative">
                      <ButtonGroup className="mt-2 mb-2">
                        <Dropdown>
                          <Dropdown.Toggle
                            className="!flex items-center"
                            variant="default"
                            id="dropdown-basic"
                          >
                            Action <AiOutlineCaretDown />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {/* <Dropdown.Item className="!flex justify-center" onClick={()=>{handleEmailverification(row.id)}}>
            <AiOutlineReload className="mr-2"/>
            </Dropdown.Item> */}
                            <Dropdown.Divider />
                            <Dropdown.Item
                              className="!flex justify-center !no-underline	"
                              onClick={() => {
                                handleRingingTransferModal(row.id);
                              }}
                            >
                              <CgPhone className="mr-2" /> Ringing
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="!flex justify-center !no-underline	"
                              onClick={() => {
                                handlePostponedTransferModal(row.id);
                              }}
                            >
                              <BsCalendarPlus className="mr-2" /> Postponed
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="!flex justify-center !no-underline	"
                              onClick={() => {
                                handleNotIntrestedTransferModal(row.id);
                              }}
                            >
                              <TbPlugConnected className="mr-2" /> Not
                              interested
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </ButtonGroup>
                    </div>
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
          <li
            class={`page-item ${
              currentPage === totalPages || totalPages == 0 ? "disabled" : ""
            }`}
          >
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EnquiryTable;