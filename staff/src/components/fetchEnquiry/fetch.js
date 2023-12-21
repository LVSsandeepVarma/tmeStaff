"use client";
import TopNavbar from "../navbar/topNavbar";
import { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import NavbarMarquee from "../navbar/marquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faLock,
  faPlane,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { RxCrossCircled } from "react-icons/rx";
import * as Yup from "yup";
import axios from "axios";
import DatatablePage from "./fetchEnquiryTable";
import MyTable from "./fetchEnquiryTable";
import { setLoaderFalse, setLoaderTrue } from "../../slice/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import NoDataModal from "./noDataModal";
import FetchTable from "./fetchEnquiryTable";
import Loading from "../loader/loading";
import { useNavigate } from "react-router-dom";
import CopyRight from "../copyright/Copyright";
// import { data } from "autoprefixer";
export default function Fetch_Enquiry() {
  const userData = useSelector((state) => state?.userInfoReducer);
  const loaderState = useSelector((state) => state?.loaderReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(userData, "data");
  const initialValues = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    add_1: "",
    add_2: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  };
  const validationSchema = Yup.object({
    first_name: Yup.string().required("first name is required"),
    last_name: Yup.string().required("last name is required"),
    phone: Yup.string("please enter valid number")
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    email: Yup.string()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid email address"
      )
      .required("Email is required"),
    add_1: Yup.string().required("address 1 is required"),
    add_2: Yup.string().required("address 2 is required"),
    city: Yup.string().required("city is required"),
    state: Yup.string().required("state is required"),
    country: Yup.string().required("country is required"),
    zip: Yup.string().required("pincode is required"),
  });
  const [showModal, setShowModal] = useState(false);
  const [showNoDataModAL, SetShowNoDataModal] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState("");
  const [fetchEnquiryStatus, setFetchEnquiryStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [autoassignFetchData, setAutoAssignFetchData] = useState([]);
  const [tableData, setTableData] = useState([]);
  //    const [isVisible, setIsVisible] = useState("block")

  //   const TimedVisibleFunction = () =>{
  // 	setTimeout(()=>{
  // 		setIsVisible("none")
  // 	},5000)
  //   }

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleNoDataModalOpen = () => {
    SetShowNoDataModal(true);
  };

  const handleNoDataModalClose = () => {
    SetShowNoDataModal(false);
  };

  const handleSubmit = async (values) => {
    try {
      dispatch(setLoaderTrue());
      const token = localStorage.getItem("tmToken");
      const postData = new FormData();
      if (values) {
        postData.append("first_name", values.first_name);
        postData.append("last_name", values.last_name);
        postData.append("email", values.email);
        postData.append("phone", values.phone);
        postData.append("add_1", values.add_1);
        postData.append("add_2", values.add_2);
        postData.append("city", values.city);
        postData.append("state", values.state);
        postData.append("country", values.country);
        postData.append("zip", values.zip);
      }
      const response = await axios.post(
        "https://admin.tradingmaterials.com/api/staff/add-new-enquiry",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);
      setErrorMessage("");
      setSuccessMessage(response?.data?.message);
    } catch (error) {
      console.log("error", error);
      setErrorMessage(error?.response?.data?.errors?.email);
      dispatch(setLoaderFalse());
    }
    dispatch(setLoaderFalse());
  };
  const FetchAutoAssignData = async () => {
    try {
      dispatch(setLoaderTrue());
      const token = localStorage.getItem("tmToken");
      const response = await axios.get(
        "https://admin.tradingmaterials.com/api/staff/auto-assign-enquiry",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response?.data, response?.data?.data?.f_enq, "response");
      if (!response?.data?.status) {
        setNoDataMessage(response?.data?.message);
        setFetchEnquiryStatus(response?.data?.status);
        console.log(response?.data?.status);
        // TimedVisibleFunction()
        // const tableData = [...autoassignFetchData]
        // setAutoAssignFetchData([...tableData, response?.data?.data])
        handleNoDataModalOpen();
        // setIsVisible("block")
      } else {
        setFetchEnquiryStatus(true);
        console.log(response?.data?.data?.f_enq);
        setTableData([response?.data?.data?.f_enq]);
        setTimeout(() => {
          setFetchEnquiryStatus(false);
          window.location.reload();
        }, 5000);
      }
    } catch (err) {
      console.log(err);
      dispatch(setLoaderFalse());
    }
    dispatch(setLoaderFalse());
  };
  //   tableData?.map((row)=>{
  // 	console.log(row,"row")
  //   })

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
      {loaderState.value == true ? <Loading /> : ""}
      <div className="container-scroller  min-h-[100vh]">
        <TopNavbar />
        <div className="top-[63px] sm:top-[0px]">
          <NavbarMarquee />
        </div>
        <div className="page-header container ">
          <ol className="breadcrumb">
            {/* <!-- breadcrumb --> */}
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item active" aria-current="page">
              Fetch
            </li>
          </ol>
          {/* <!-- End breadcrumb --> */}

          <div className="ml-auto">
            <div className="input-group">
              <a
                onClick={() => handleLockingScreen()}
                className="btn btn-primary text-white mr-2 btn-sm"
                data-toggle="tooltip"
                title=""
                data-placement="bottom"
                data-original-title="lock"
              >
                <span>
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </a>
              <a
                href="#"
                id="addbtn"
                className="btn btn-warning text-white btn-sm"
                data-toggle="tooltip"
                title=""
                data-placement="bottom"
                data-original-title="Add New"
                onClick={() => handleModalOpen()}
              >
                <span>
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              </a>
            </div>
            <Modal
              size="lg"
              show={showModal}
              onHide={handleModalClose}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Create Enquiry</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => handleSubmit(values)}
                >
                  <Form>
                    <input
                      type="hidden"
                      name="_token"
                      value="ThyTG4DHzcZgecQNk1AqhO0Yx9dJ7RAEiVhlDSLN"
                    />
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label for="fname">First Name</label>
                          <Field
                            type="text"
                            id="fname"
                            placeholder="Enter First Name..."
                            className="form-control name"
                            name="first_name"
                          />
                          <ErrorMessage
                            className="text-red-600 !absolute"
                            name="first_name"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label for="lname">Last Name</label>
                          <Field
                            type="text"
                            id="lname"
                            placeholder="Enter Last Name..."
                            className="form-control name"
                            name="last_name"
                          />
                          <ErrorMessage
                            className="text-red-600 !absolute"
                            name="last_name"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label for="mob">Phone</label>
                          <Field
                            id="mob"
                            placeholder="Enter Phone Number"
                            className="form-control number"
                            name="phone"
                          />
                          <ErrorMessage
                            className="text-red-600 !absolute"
                            name="phone"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label for="mail">Email</label>
                          <Field
                            id="mail"
                            type="email"
                            placeholder="Enter Email Address"
                            className="form-control"
                            name="email"
                          />
                          <ErrorMessage
                            className="text-red-600 !absolute"
                            name="email"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label for="add_1">Address 1</label>
                          <Field
                            as="textarea"
                            id=""
                            cols="30"
                            rows="2"
                            className="form-control"
                            placeholder="Address Line 1"
                            name="add_1"
                          ></Field>
                          <ErrorMessage
                            className="text-red-600 !absolute"
                            name="add_1"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label for="add_1">Address 2</label>
                          <Field
                            as="textarea"
                            id=""
                            cols="30"
                            rows="2"
                            className="form-control"
                            placeholder="Address Line 2"
                            name="add_2"
                          ></Field>
                          <ErrorMessage
                            className="text-red-600 !absolute"
                            name="add_2"
                            component="div"
                          />{" "}
                        </div>
                      </div>
                      <div className="col-12 col-md-3">
                        <div className="form-group">
                          <label for="cty">city</label>
                          <Field
                            type="text"
                            id="cty"
                            className="form-control name"
                            placeholder="Enter city"
                            name="city"
                          />
                          <ErrorMessage
                            className="text-red-600 !absolute"
                            name="city"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-3">
                        <div className="form-group">
                          <label for="state">state</label>
                          <Field
                            type="text"
                            className="form-control name"
                            placeholder="Enter state"
                            name="state"
                          />
                          <ErrorMessage
                            className="text-red-600 !absolute"
                            name="state"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-3">
                        <div className="form-group">
                          <label for="cntry">country</label>
                          <Field
                            as="select"
                            className="form-control select2-show-search select2-hidden-accessible !bg-white"
                            data-placeholder="Choose one (with searchbox)"
                            name="country"
                            tabIndex="-1"
                            aria-hidden="true"
                          >
                            <option value=" " selected="">
                              -Select country-
                            </option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Aland Islands">Aland Islands</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">
                              American Samoa
                            </option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Antigua and Barbuda">
                              Antigua and Barbuda
                            </option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bonaire, Sint Eustatius and Saba">
                              Bonaire, Sint Eustatius and Saba
                            </option>
                            <option value="Bosnia and Herzegovina">
                              Bosnia and Herzegovina
                            </option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Territory">
                              British Indian Ocean Territory
                            </option>
                            <option value="Brunei">Brunei</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">
                              Cayman Islands
                            </option>
                            <option value="Central African Republic">
                              Central African Republic
                            </option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">
                              Christmas Island
                            </option>
                            <option value="Cocos (Keeling) Islands">
                              Cocos (Keeling) Islands
                            </option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote d'ivoire (Ivory Coast)">
                              Cote divoire (Ivory Coast)
                            </option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Curacao">Curacao</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">
                              Czech Republic
                            </option>
                            <option value="Democratic Republic of the Congo">
                              Democratic Republic of the Congo
                            </option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">
                              Dominican Republic
                            </option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">
                              Equatorial Guinea
                            </option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands (Malvinas)">
                              Falkland Islands (Malvinas)
                            </option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">
                              French Polynesia
                            </option>
                            <option value="French Southern Territories">
                              French Southern Territories
                            </option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadaloupe">Guadaloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guernsey">Guernsey</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Heard Island and McDonald Islands">
                              Heard Island and McDonald Islands
                            </option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran">Iran</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Isle of Man">Isle of Man</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Kosovo">Kosovo</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Laos">Laos</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libya">Libya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macao">Macao</option>
                            <option value="North Macedonia">
                              North Macedonia
                            </option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">
                              Marshall Islands
                            </option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia">Micronesia</option>
                            <option value="Moldava">Moldava</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar (Burma)">
                              Myanmar (Burma)
                            </option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">
                              Norfolk Island
                            </option>
                            <option value="North Korea">North Korea</option>
                            <option value="Northern Mariana Islands">
                              Northern Mariana Islands
                            </option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Palestine">Palestine</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">
                              Papua New Guinea
                            </option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russia">Russia</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Barthelemy">
                              Saint Barthelemy
                            </option>
                            <option value="Saint Helena">Saint Helena</option>
                            <option value="Saint Kitts and Nevis">
                              Saint Kitts and Nevis
                            </option>
                            <option value="Saint Lucia">Saint Lucia</option>
                            <option value="Saint Martin">Saint Martin</option>
                            <option value="Saint Pierre and Miquelon">
                              Saint Pierre and Miquelon
                            </option>
                            <option value="Saint Vincent and the Grenadines">
                              Saint Vincent and the Grenadines
                            </option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">
                              Sao Tome and Principe
                            </option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Sint Maarten">Sint Maarten</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">
                              Solomon Islands
                            </option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Georgia and the South Sandwich Islands">
                              South Georgia and the South Sandwich Islands
                            </option>
                            <option value="South Korea">South Korea</option>
                            <option value="South Sudan">South Sudan</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard and Jan Mayen">
                              Svalbard and Jan Mayen
                            </option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syria">Syria</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania">Tanzania</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Timor-Leste (East Timor)">
                              Timor-Leste (East Timor)
                            </option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">
                              Trinidad and Tobago
                            </option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos Islands">
                              Turks and Caicos Islands
                            </option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">
                              United Arab Emirates
                            </option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="United states">United states</option>
                            <option value="United states Minor Outlying Islands">
                              United states Minor Outlying Islands
                            </option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Vatican city">Vatican city</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="Virgin Islands, British">
                              Virgin Islands, British
                            </option>
                            <option value="Virgin Islands, US">
                              Virgin Islands, US
                            </option>
                            <option value="Wallis and Futuna">
                              Wallis and Futuna
                            </option>
                            <option value="Western Sahara">
                              Western Sahara
                            </option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                            {/* <optgroup label="Mountain Time Zone">
								<!--	<option value="AZ">Arizona</option>-->
								<!--	<option value="CO">Colorado</option>-->
								<!--	<option value="ID">Idaho</option>-->
								<!--	<option value="MT">Montana</option><option value="NE">Nebraska</option>-->
								<!--	<option value="NM">New Mexico</option>-->
								<!--	<option value="ND">North Dakota</option>-->
								<!--	<option value="UT">Utah</option>-->
								<!--	<option value="WY">Wyoming</option>-->
								<!--</optgroup>-->
								<!--<optgroup label="Central Time Zone">-->
								<!--	<option value="AL">Alabama</option>-->
								<!--	<option value="AR">Arkansas</option>-->
								<!--	<option value="IL">Illinois</option>-->
								<!--	<option value="IA">Iowa</option>-->
								<!--	<option value="KS">Kansas</option>-->
								<!--	<option value="KY">Kentucky</option>-->
								<!--	<option value="LA">Louisiana</option>-->
								<!--	<option value="MN">Minnesota</option>-->
								<!--	<option value="MS">Mississippi</option>-->
								<!--	<option value="MO">Missouri</option>-->
								<!--	<option value="OK">Oklahoma</option>-->
								<!--	<option value="SD">South Dakota</option>-->
								<!--	<option value="TX">Texas</option>-->
								<!--	<option value="TN">Tennessee</option>-->
								<!--	<option value="WI">Wisconsin</option>-->
								<!--</optgroup>--> */}
                          </Field>
                          <ErrorMessage
                            className="text-red-600 !absolute"
                            name="country"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-3">
                        <div className="form-group">
                          <label for="pode">Pincode</label>
                          <Field
                            type="text"
                            id="pcode"
                            className="form-control number"
                            placeholder="Enter Pincode"
                            name="zip"
                          />
                          <ErrorMessage
                            className="text-red-600 !absolute"
                            name="zip"
                            component="div"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      {errorMessage !== "" ? (
                        <p className="text-red-600">{errorMessage}</p>
                      ) : (
                        ""
                      )}
                      {successMessage != "" ? (
                        <p className="text-green-900">{successMessage}</p>
                      ) : (
                        ""
                      )}
                      {loaderState.value == true ? <Loading /> : ""}
                      <button
                        type="button"
                        className="btn btn-warning py-1"
                        data-dismiss="modal"
                        onClick={handleModalClose}
                      >
                        Close
                      </button>

                      <button
                        type="submit"
                        className="btn btn-success subbtn py-1"
                        value=""
                        data-type=""
                      >
                        Save{" "}
                      </button>
                    </div>
                  </Form>
                </Formik>
                {/* Content of the modal */}
              </Modal.Body>
            </Modal>
          </div>
        </div>
        <div className="container">
          <button
            type="button"
            className="btn btn-info position-relative py-2 fs-14"
            disabled
          >
            {" "}
            Remaining
            <span
              className="position-absolute start-100 translate-middle badge rounded-pill bg-danger fs-10"
              id="count"
            >
              {userData?.value?.data?.enq_counts?.remaining_count}{" "}
            </span>
          </button>
        </div>
        <div className=" mt-2 container">
          <div className="row">
            <div className="col-sm-12 col-lg-5 col-xl-6">
              <div className="card">
                <div className="card-header py-4">
                  <button
                    className="btn btn-primary btnfetch"
                    onClick={() => FetchAutoAssignData()}
                  >
                    Fetch Enquiry{" "}
                    <FontAwesomeIcon
                      icon={faEye}
                      title=""
                      data-toggle="tooltip"
                      aria-hidden="true"
                      data-original-title="Click here to get single enquiry"
                    />
                  </button>
                  {/* <span
                      className="position-absolute  translate-middle badge rounded-pill bg-danger fs-10"
                      id="count"
                    >
                      {userData?.value?.data?.enq_counts?.remaining_count}{" "}
                    </span> */}
                </div>
                <Modal
                  show={showNoDataModAL}
                  onHide={handleNoDataModalClose}
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Fetch Enquiry</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {/* Content of the modal */}
                    <div
                      aria-labelledby="swal2-title"
                      aria-describedby="swal2-html-container"
                      className="flex flex-col	items-center justify-center"
                      tabIndex="-1"
                      role="dialog"
                      aria-live="assertive"
                      aria-modal="true"
                      style={{ display: "flex" }}
                    >
                      <RxCrossCircled className="text-red-500" size={100} />
                      <h2
                        className="swal2-title p-4 pb-3"
                        id="swal2-title"
                        style={{ display: "block" }}
                      >
                        Oops...
                      </h2>
                      <div
                        className="font-bold pb-4 text-lg"
                        id="swal2-html-container"
                        style={{ display: "block" }}
                      >
                        {noDataMessage}
                      </div>
                      <Button onClick={() => handleNoDataModalClose()}>
                        Ok
                      </Button>
                    </div>
                  </Modal.Body>
                </Modal>
                <div className="card-body d-none" id="c_details">
                  <div className="d-flex clearfix">
                    <div className="text-left mt-3">
                      <ul className="list-group" style={{ fontWeight: "bold" }}>
                        <ul>
                          <li className="list-group-item">
                            {" "}
                            <FontAwesomeIcon
                              icon={faPlane}
                              className=" text-primary me-1"
                              aria-hidden="true"
                            ></FontAwesomeIcon>{" "}
                            Name:
                            <span
                              id="c_name"
                              style={{
                                marginLeft: "4px",
                                fontWeight: "initial",
                              }}
                            ></span>
                          </li>
                          <li className="list-group-item">
                            {" "}
                            <i
                              className="fa fa-phone text-primary me-1"
                              aria-hidden="true"
                            ></i>{" "}
                            Phone:
                            <span
                              id="c_phone"
                              style={{
                                marginLeft: "4px",
                                fontWeight: "initial",
                              }}
                            ></span>
                          </li>
                          <li className="list-group-item">
                            {" "}
                            <i
                              className="fa fa-envelope  text-primary me-1"
                              aria-hidden="true"
                            ></i>{" "}
                            Email:
                            <span
                              id="c_email"
                              style={{
                                marginLeft: "4px",
                                fontWeight: "initial",
                              }}
                            ></span>
                          </li>
                        </ul>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {console.log(tableData.length)}
              {fetchEnquiryStatus == true && (
                <div className={`mt-5`}>
                  {/* <FetchTable/> */}
                  <Table responsive striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                      </tr>
                    </thead>
                    {/* {console.log(tableData.length)} */}
                    {tableData?.length ? (
                      <tbody>
                        {tableData?.map((row) => (
                          <tr key={row.id}>
                            <td>{row.first_name}</td>
                            <td>{row?.email}</td>
                            <td>{row.phone}</td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          <p className="text-muted">
                            No data available in table
                          </p>
                        </td>
                      </tr>
                    )}
                  </Table>
                </div>
              )}
            </div>
            <div className="col-sm-12 col-lg-6 col-xl-6">
              {/* <DatatablePage/> */}
              <FetchTable />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-center">
        <CopyRight />
      </div>
    </>
  );
}
