import React, { useState } from "react";
import { Tab, Nav, Button, Table, Form } from "react-bootstrap";
import TopNavbar from "../navbar/topNavbar";
import NavbarMarquee from "../navbar/marquee";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
// import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { setLoaderFalse, setLoaderTrue } from "../../slice/loaderSlice";
import { DateRangePicker } from "rsuite";
import axios from "axios";
import "rsuite/dist/rsuite.css";
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { combine, allowedMaxDays, before } = DateRangePicker;
  const userData = useSelector((state) => state?.userInfoReducer);
  console.log(userData, "data");
  const loaderState = useSelector((state) => state.loaderReducer.value);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState("");
  const [productsCart, setProductsCart] = useState([]);
  const [relativeQty, setRelativeQty] = useState([{"option1":0,"option2":0,"option3":0,"option4":0,"option5":0}]);
  const [relativeTax, setRelativeTax] = useState([{"option1":0,"option2":0,"option3":0,"option4":0,"option5":0}]);
  const [productPrices, setProductPrices] = useState([{"option1":100,"option2":500,"option3":750,"option4":1000,"option5":1250}]);
  const [selectedProductsPrice, setSelectedproductsPrice] = useState([{"option1":0,"option2":0,"option3":0,"option4":0,"option5":0}]);
  const [taxedValues, setTaxedValues] = useState([{"option1":0,"option2":0,"option3":0,"option4":0,"option5":0}]);
  const [checkoutPrice, setCheckoutPrice] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const [taxPrecent, setTaxPercent] = useState(0);;
  const [options, setOptions] = useState([
    { name: "option1", label: "Option 1" },
    { name: "option2", label: "Option 2" },
    { name: "option3", label: "Option 3" },
    { name: "option4", label: "Option 4" },
    { name: "option5", label: "Option 5" },
  ]);

  useEffect(() => {
    if (loaderState) {
      dispatch(setLoaderFalse());
    } else {
      dispatch(setLoaderTrue());
    }
  }, [navigate]);
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSelectedOptions = (products) => {
    let selectedProductsArr = [];
    const qtyArr = [...relativeQty];
    const priceArr =  [...selectedProductsPrice]
    
    products?.map((val, ind) => {
      selectedProductsArr.push(val?.name);
      const key = val.name;
    console.log(key)
    qtyArr[0][key] = 1;
    priceArr[0][key] = parseInt(productPrices[0][key] * qtyArr[0][key])

    });
    console.log(selectedProductsArr)
    setProductsCart([...selectedProductsArr]);
    setRelativeQty([...qtyArr]);
    setSelectedproductsPrice([...priceArr])
    setCheckoutPrice(Object.values(selectedProductsPrice[0]).reduce((accumulator, currentValue) => accumulator + currentValue, 0) + Object.values(taxedValues[0]).reduce((accumulator, currentValue) => accumulator + currentValue, 0))
    
  };

  const handleRemoveProduct = (products) => {
    console.log(products)
    let removedProductsArr = [];
    let remainingProds = []
    products?.map((val, ind) => {
      remainingProds.push(val.name)
    });
    removedProductsArr = productsCart?.filter((item) => remainingProds.includes(item));
    let pricesArr = [...selectedProductsPrice]
    let qtyArr = [...relativeQty]
    let taxArr=[...taxedValues]
    let removedPrice=0
    for(let obj of pricesArr){
      Object.entries(obj).forEach(function([key,val]){
        if(!removedProductsArr.includes(key)){
          removedPrice+=(pricesArr[0][key]+taxArr[0][key]);
          pricesArr[0][key] = 0;
          qtyArr[0][key] = 0;
          taxArr[0][key]=0;
        }

      })
    }
    console.log(taxArr)
    setSelectedproductsPrice([...pricesArr])
    setRelativeQty([...qtyArr])
    console.log(pricesArr,qtyArr)
    setTaxedValues([...taxArr])
    setProductsCart([...removedProductsArr]);
    if(checkoutPrice> 0){
      console.log(checkoutPrice - parseInt(Object.values(pricesArr[0]).reduce((accumulator, currentValue) => accumulator + currentValue, 0)))
      setCheckoutPrice(checkoutPrice - parseInt(removedPrice))
    }

  };

  const handleQtyChange = (val) => {
    const qtyArr = [...relativeQty];
    const priceArr =  [...selectedProductsPrice]
    const key = val[2];
    console.log(key)
    qtyArr[0][key] = val[1];
    priceArr[0][key] = parseInt(productPrices[0][key] * qtyArr[0][key])
    setRelativeQty([...qtyArr]);
    setSelectedproductsPrice([...priceArr])
    console.log(val);
    let additionalTax=0;
    if(taxedValues[0][val] !=0){
      additionalTax = ((taxedValues[0][val]/100)*priceArr[0][val]).toFixed(2)
    }

    setCheckoutPrice(checkoutPrice + parseInt(Object.values(priceArr[0]).reduce((accumulator, currentValue) => accumulator + currentValue, 0)))
  };

  const handleDiscountPrice=(val)=>{
      setDiscountValue(val)
      setCheckoutPrice(Object.values(selectedProductsPrice[0]).reduce((accumulator, currentValue) => accumulator + currentValue, 0)- val)
  }

  const handleTaxAddition=(val)=>{
    console.log(parseInt(val[0].split("%")[0]),   selectedProductsPrice[0][val[1]])
    setTaxPercent(val[0])
    let taxArr = [...taxedValues]
    const taxAmount =  (val[0].split("%")[0]/100)*parseInt(selectedProductsPrice[0][val[1]]).toFixed(2);
    const finalPrice = checkoutPrice - taxArr[0][val[1]]
    console.log(taxAmount, finalPrice,taxArr[0][val[1]])
    setCheckoutPrice(taxAmount+ finalPrice)
    taxArr[0][val[1]] = taxAmount
    setTaxedValues([...taxArr])
    // Object.values(priceArr[0][val[1]]) =  Object.values(priceArr[0][val[1]]) * parseInt(val[0].split("%")[0])
  }

  return (
    <>
      <div className="container-scroller  ">
        <TopNavbar />
        <div className="top-[63px] sm:top-[0px]">
          <NavbarMarquee />
        </div>
        <div className="page-header container ">
          <ol className="breadcrumb">
            {/* <!-- breadcrumb --> */}
            <li className="breadcrumb-item">Dashboard</li>
            <li className="breadcrumb-item active" aria-current="page">
              Invoice
            </li>
          </ol>
          {/* <!-- End breadcrumb --> */}
          <div className="ml-auto">
            <div className="input-group">
              <a
                href="#"
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
        {/* <div className=" page-header container " style={{display:"block"}}>
                    <button type="button" onClick={()=>navigate("/enquiry/assigned-enquiry")} className="btn btn-outline-secondary  !text-[#467fcf]  position-relative mr-2 py-2 fs-14"> Assigned | {userData?.value?.data?.enq_counts?.remaining_count} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/ringing-enquiry")} className="btn btn-outline-secondary textwhite  !bg-[#28afd0] position-relative mr-2 py-2 fs-14"> Ringing | {userData?.value?.data?.enq_counts?.ringing} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/postponed-enquiry")} className="btn btn-outline-secondary !text-[#5eba00] position-relative mr-2 py-2 fs-14"> Postponed | {userData?.value?.data?.enq_counts?.postponed} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/not-intersted-enquiry")} className="btn btn-outline-secondary  !text-[#f66] position-relative mr-2 py-2 fs-14"> Not Intrested | {userData?.value?.data?.enq_counts?.notin}  </button>
                    <button type="button" onClick={()=>navigate("/enquiry/not-todays-ringing-enquiry")} className="btn btn-outline-secondary !text-[#467fcf] position-relative mr-2 py-2 fs-14"> Total Ringing | {userData?.value?.data?.enq_counts?.t_ring}  </button>
                    <button type="button" onClick={()=>navigate("/enquiry/not-todays-postponed-enquiry")} className="btn btn-outline-secondary  !text-[#ffc107] position-relative mr-2 py-2 fs-14"> Today Postponed | {userData?.value?.data?.enq_counts?.t_post} </button>
                </div> */}
        <div className="container">
          <Card>
            <Card.Title className="card-header border-bottom py-3 !bg-[#25378b] text-white">
              Unpaid Invoices
            </Card.Title>
            <Card.Body>
              <div className="container mx-auto">
                <div className="flex">
                  <>
                    <div className="flex justify-around	">
                      <div className=" mr-10">
                        <Form.Group controlId="dropdown">
                          <Form.Label>Select Currency:</Form.Label>
                          <Form.Control as="select">
                            <option>USD</option>
                            <option>IND</option>
                          </Form.Control>
                        </Form.Group>
                      </div>
                      <div className=" justify-end">
                        <Form.Group controlId="multiSelect">
                          <Form.Label>select Products:</Form.Label>
                          <Multiselect
                            // className='!relative'
                            options={options} // Options to display in the dropdown
                            selectedValues={""} // Preselected value to persist in dropdown
                            onSelect={(e) => {
                              handleSelectedOptions(e);
                            }} // Function will trigger on select event
                            onRemove={(e) => {
                              handleRemoveProduct(e);
                            }} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                          />
                        </Form.Group>
                      </div>
                    </div>
                  </>
                </div>
                <div className="!block mt-3">
                  {productsCart?.length > 0 && (
                    <Table responsive striped bordered>
                      <thead>
                        <tr>
                          <th>id</th>
                          <th> product</th>
                          <th>quantity</th>
                          <th>tax</th>
                          <th>price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productsCart?.map((val, ind) => (
                          <tr key={ind}>
                            <td>#00{ind}</td>
                            <td><p>{val}</p></td>
                            <td>
                              <input
                                className="border-0 border-indigo-600 w-[50px] bg-zinc-200	"
                                defaultValue={relativeQty[0][val]}
                                onChange={(e) =>
                                  handleQtyChange([ind,e?.target?.value,val])
                                }
                                type="number"
                                min={1}
                              ></input>
                            </td>
                            <td>
                              <select defaultValue={`${taxedValues[0][val]}%`} onChange={(e)=>{handleTaxAddition([e.target.value,val])}}>
                                <option >0%</option>
                                <option>5%</option>
                                <option>10%</option>
                              </select>
                            </td>
                            <td>{selectedProductsPrice[0][val]}</td>
                          </tr>
                          
                        ))}
                        {/* Add more rows as needed */}
                      </tbody>
                    </Table>
                  )}
                </div>
                {productsCart?.length > 0 && (
                <div className="border-2 border-gray-500 py-4" >
                  <b className="text-xl font-bold">Summary</b>
                  <div className="row !ml-3 sm:!ml-8">
                    <div className="col-md-8">
                      <b>Sub total :</b>
                    </div>
                    <div className="col-md-4">
                      <p>{  Object.values(selectedProductsPrice[0]).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</p>
                    </div>
                  </div>
                  <div className="row !ml-3 sm:!ml-8">
                    <div className="col-md-8">
                      <b>Discount :</b>
                    </div>
                    <div className="col-md-4">
                      <input type="number" min={0} max={parseInt(( Object.values(selectedProductsPrice[0])?.reduce((accumulator, currentValue) => accumulator + currentValue, 0))/2)} style={{border:"1px solid"}} onChange={(e)=>{handleDiscountPrice(e.target.value)}}></input>
                      <small className="block text-red-800" >Discount accepted till 50% only !!</small>
                    </div>
                  </div>
                  <div className="row !ml-3 sm:!ml-8">
                    <div className="col-md-8">
                      <b>Discount rate :</b>
                    </div>
                    <div className="col-md-4">
                     {discountValue > 0 && <p className="text-green-500">{(discountValue/Object.values(selectedProductsPrice[0]).reduce((accumulator, currentValue) => accumulator + currentValue, 0)*100)?.toFixed(2)}%</p>}
                     {discountValue == 0 && <p>0</p>}
                    </div>
                  </div>
                  <div className="row !ml-3 sm:!ml-8">
                    <div className="col-md-8">
                      <b>Tax :</b>
                    </div>
                    <div className="col-md-4">
                      {taxPrecent !=0 && <p className="font-bold">{taxPrecent}</p>}
                      {taxPrecent ==0 && <p>0</p>}
                    </div>
                  </div>
                  <div className="row !ml-3 sm:!ml-8">
                    <div className="col-md-8">
                      <b>Total :</b>
                    </div>
                    <div className="col-md-4">
                      <p className="font-bold">{ checkoutPrice}</p>
                    </div>
                  </div>
                  <div className="row !ml-3 sm:!ml-8">
                    <div className="col-md-8"></div>
                    <div className="col-md-4"></div>
                  </div>

                </div>)}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Products;
