"use client";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCartPlus,
  faComment,
  faExclamationCircle,
  faHeadphones,
  faPhone,
  faPhoneVolume,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import Barchart from "./ordersbarchart";
import Barcharts from "./ordersbarchart";
import PaymentsBarcharts from "./paymentsBarchart";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import StaffActionsTable from "./staffActionsTable";
import CopyRight from "../copyright/Copyright";

export default function DashboardData() {

const userData = useSelector((state)=>state?.userInfoReducer?.value?.data)
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselActiveIndexes, setCarouselActiveIndexes] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [disablePrevButton, setDisablePrevButton] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const [disableNextButton, setDisableNextButton] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handlePrev = (id) => {
    console.log(id);
    // setActiveIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
    console.log(disablePrevButton, disableNextButton);
    const carouselIndexes = [...carouselActiveIndexes];
    // if(carouselIndexes[id] == 0){
    const prevButtonsArr = [...disablePrevButton];
    prevButtonsArr[id] = true;
    setDisablePrevButton([...prevButtonsArr]);
    const nextButtonArr = [...disableNextButton];
    nextButtonArr[id] = false;
    setDisableNextButton([...nextButtonArr]);
    // }
    // else{
    carouselIndexes[id] = 0;
    setCarouselActiveIndexes([...carouselIndexes]);
    // }
  };

  const handleNext = (id) => {
    // setActiveIndex((prevIndex) => (prevIndex === 2 ? prevIndex : prevIndex + 1));
    // console.log(id)
    // setActiveIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
    const carouselIndexes = [...carouselActiveIndexes];
    // if(carouselIndexes[id] == 0){
    const prevButtonsArr = [...disablePrevButton];
    prevButtonsArr[id] = false;
    setDisablePrevButton([...prevButtonsArr]);
    const nextButtonArr = [...disableNextButton];
    nextButtonArr[id] = true;
    setDisableNextButton([...nextButtonArr]);
    // }
    // else{
    carouselIndexes[id] = 1;
    setCarouselActiveIndexes([...carouselIndexes]);
    // }
  };
  return (
    <>
      <div className="container mt-20 sm:mt-10 ">
        <div className=" row row-6 relative flex justify-start ">
          <Card className="shadow-sm mr-3 mb-3" style={{ width: "18rem" }}>
            <div className="flex !items-center h-[100%]">
              <Card.Body>
                <Card.Title className="font-extrabold	">
                  Total Clients
                </Card.Title>
                {/* <Carousel
                  indicators={false}
                  className=""
                  activeIndex={carouselActiveIndexes[0]}
                  prevLabel=""
                  nextLabel=""
                > */}
                {/* <Carousel.Item> */}
                <p className="text-3xl	font-extrabold">8379</p>
                {/* </Carousel.Item> */}
                {/* <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>8379</p>
                                </Carousel.Item> */}
                {/* </Carousel> */}
              </Card.Body>
              <div className="ml-auto w-[25%] flex items-center justify-center ">
                <span className="bg-success-transparent icon-service text-success rounded-full !bg-green">
                  <FontAwesomeIcon className=" !h-[4rem]" icon={faUser} />
                </span>
              </div>
            </div>
          </Card>
          <Card className="shadow-sm mr-3 mb-3" style={{ width: "18rem" }}>
            <div className="flex items-center h-[100%]">
              <Card.Body>
                <Card.Title className="font-extrabold	">
                  Total Enquiries
                </Card.Title>
                <Carousel
                  className=""
                  activeIndex={carouselActiveIndexes[1]}
                  indicators={false}
                >
                  <Carousel.Item>
                    <p className="text-3xl font-extrabold	">8379</p>
                  </Carousel.Item>
                  <Carousel.Item>
                    <p className="text-3xl font-extrabold	">8379</p>
                  </Carousel.Item>
                </Carousel>
              </Card.Body>
              <div className="ml-auto w-[25%] flex items-center justify-center ">
                <span className="bg-success-transparent icon-service text-success rounded-full">
                  <FontAwesomeIcon
                    className=" !h-[4rem]"
                    color="#ffc107"
                    icon={faPhone}
                  />
                </span>
              </div>
            </div>
            <Card.Footer className="text-end bg-white border-0 flex justify-end ">
              <Button
                className={`bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1  ${
                  disablePrevButton[1] == true ? "!hidden" : "!flex"
                } items-center justify-center	`}
                onClick={() => handlePrev("1")}
              >
                {"<"}
              </Button>
              <Button
                className={`bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1  ${
                  disableNextButton[1] == true ? "!hidden" : "!flex"
                } items-center justify-center	`}
                onClick={() => handleNext("1")}
              >
                {">"}
              </Button>
            </Card.Footer>
          </Card>
          <Card className="shadow-sm mr-3 mb-3" style={{ width: "18rem" }}>
            <div className="flex items-center h-[100%]">
              <Card.Body>
                <Card.Title className="font-extrabold	">Total Sales</Card.Title>
                <Carousel
                  className=""
                  activeIndex={carouselActiveIndexes[6]}
                  prevLabel=""
                  nextLabel=""
                >
                  <Carousel.Item>
                    <p>Today's Total Sales</p>
                    <p className="text-3xl	font-extrabold">2,456K</p>
                  </Carousel.Item>
                  <Carousel.Item>
                    <p>Yesterday's Total Sales</p>
                    <p className="text-3xl	font-extrabold">2,456K</p>
                  </Carousel.Item>
                </Carousel>
              </Card.Body>
              <div className="ml-auto w-[25%] flex items-center justify-center ">
                <span className="bg-success-transparent icon-service text-success rounded-full !bg-green">
                  <FontAwesomeIcon
                    className=" !h-[4rem]"
                    icon={faWallet}
                    color="#ffc107"
                  />
                </span>
              </div>
            </div>
            <Card.Footer className="text-end bg-white border-0 flex justify-end ">
              <Button
                className={`bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full ${
                  disablePrevButton[6] == true ? "!hidden" : "!flex"
                } items-center justify-center	`}
                onClick={() => handlePrev("6")}
              >
                {"<"}
              </Button>
              <Button
                className={`bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full ${
                  disableNextButton[6] == true ? "!hidden" : "!flex"
                } items-center justify-center	`}
                onClick={() => handleNext("6")}
              >
                {">"}
              </Button>
            </Card.Footer>
          </Card>
          <Card className="shadow-sm mr-3 mb-3" style={{ width: "18rem" }}>
            <div className="flex items-center h-[100%]">
              <Card.Body>
                <Card.Title className="font-extrabold	">
                  Ringing Enquiries
                </Card.Title>
                <Carousel
                  className=""
                  activeIndex={carouselActiveIndexes[2]}
                  prevLabel=""
                  nextLabel=""
                >
                  <Carousel.Item>
                    <p>today's Ringing Enquiries</p>
                    <p className="text-3xl	font-extrabold">8379</p>
                  </Carousel.Item>
                  <Carousel.Item>
                    <p>yesterday's Ringing Enquiries</p>
                    <p className="text-3xl	font-extrabold">8379</p>
                  </Carousel.Item>
                </Carousel>
              </Card.Body>
              <div className="ml-auto w-[25%] flex items-center justify-center ">
                <span className="bg-success-transparent icon-service text-success rounded-full ">
                  <FontAwesomeIcon
                    className=" !h-[4rem]"
                    icon={faHeadphones}
                    color="#28afd0"
                  />
                </span>
              </div>
            </div>
            <Card.Footer className="text-end bg-white border-0 flex justify-end ">
              <Button
                className={`bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full ${
                  disablePrevButton[2] == true ? "!hidden" : "!flex"
                } items-center justify-center	`}
                disabled={disablePrevButton[2]}
                onClick={() => handlePrev("2")}
              >
                {"<"}
              </Button>
              <Button
                className={`bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full ${
                  disableNextButton[2] == true ? "!hidden" : "!flex"
                } items-center justify-center	`}
                disabled={disableNextButton[2]}
                onClick={() => handleNext("2")}
              >
                {">"}
              </Button>
            </Card.Footer>
          </Card>
          <Card className="shadow-sm mr-3 mb-3" style={{ width: "18rem" }}>
            <div className="flex items-center h-[100%]">
              <Card.Body>
                <Card.Title className="font-extrabold	">
                  Postponed Enquiries
                </Card.Title>
                <Carousel
                  className=""
                  activeIndex={carouselActiveIndexes[3]}
                  prevLabel=""
                  nextLabel=""
                >
                  <Carousel.Item>
                    <p>today's Postponed Enquirues</p>
                    <p className="text-3xl font-extrabold	">285</p>
                  </Carousel.Item>
                  <Carousel.Item>
                    <p>Yesterday's Postponed Enquirues</p>
                    <p className="text-3xl	font-extrabold">285</p>
                  </Carousel.Item>
                </Carousel>
              </Card.Body>
              <div className="ml-auto w-[25%] flex items-center justify-center ">
                <span className="bg-success-transparent icon-service text-success rounded-full ">
                  <FontAwesomeIcon
                    className=" !h-[4rem]"
                    icon={faPhoneVolume}
                    color="#467fcf"
                  />
                </span>
              </div>
            </div>
            <Card.Footer className="text-end bg-white border-0 flex justify-end ">
              <Button
                className={`bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full ${
                  disablePrevButton[3] == true ? "!hidden" : "!flex"
                } items-center justify-center	`}
                disabled={disablePrevButton[3]}
                onClick={() => handlePrev("3")}
              >
                {"<"}
              </Button>
              <Button
                className={`bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full ${
                  disableNextButton[3] == true ? "!hidden" : "!flex"
                } items-center justify-center	`}
                disabled={disableNextButton[3]}
                onClick={() => handleNext("3")}
              >
                {">"}
              </Button>
            </Card.Footer>
          </Card>
          <Card className="shadow-sm mr-3 mb-3" style={{ width: "18rem" }}>
            <div className="flex items-center h-[100%]">
              <Card.Body>
                <Card.Title className="font-extrabold	">
                  Not Interested Enquiries
                </Card.Title>
                <Carousel
                  className=""
                  activeIndex={carouselActiveIndexes[4]}
                  prevLabel=""
                  nextLabel=""
                >
                  <Carousel.Item>
                    <p>Today's Not Interested Enquiries</p>
                    <p className="text-3xl	font-extrabold">285</p>
                  </Carousel.Item>
                  <Carousel.Item>
                    <p>Yesterday's Not Interested Enquiries</p>
                    <p className="text-3xl	font-extrabold">285</p>
                  </Carousel.Item>
                </Carousel>
              </Card.Body>
              <div className="ml-auto w-[25%] flex items-center justify-center ">
                <span className="bg-success-transparent icon-service text-success rounded-full">
                  <FontAwesomeIcon
                    className=" !h-[4rem]"
                    icon={faBan}
                    color="#f66"
                  />
                </span>
              </div>
            </div>
            <Card.Footer className="text-end bg-white border-0 flex justify-end ">
              <Button
                className={`bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full ${
                  disablePrevButton[4] == true ? "!hidden" : "!flex"
                } items-center justify-center	`}
                disabled={disablePrevButton[4]}
                onClick={() => handlePrev("4")}
              >
                {"<"}
              </Button>
              <Button
                className={`bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full ${
                  disableNextButton[4] == true ? "!hidden" : "!flex"
                } items-center justify-center	`}
                disabled={disableNextButton[4]}
                onClick={() => handleNext("4")}
              >
                {">"}
              </Button>
            </Card.Footer>
          </Card>
          <Card className="shadow-sm mr-3 mb-3" style={{ width: "18rem" }}>
            <div className="flex items-center h-[100%]">
              <Card.Body>
                <Card.Title className="font-extrabold	">Total Orders</Card.Title>
                <Carousel
                  className=""
                  activeIndex={carouselActiveIndexes[5]}
                  prevLabel=""
                  nextLabel=""
                >
                  <Carousel.Item>
                    <p>Today's Total Orders</p>
                    <p className="text-3xl	font-extrabold">6,895</p>
                  </Carousel.Item>
                  <Carousel.Item>
                    <p>Yesterday's Total Orders</p>
                    <p className="text-3xl	font-extrabold">6,895</p>
                  </Carousel.Item>
                </Carousel>
              </Card.Body>
              <div className="ml-auto w-[25%] flex items-center justify-center ">
                <span className="bg-success-transparent icon-service text-success rounded-full">
                  <FontAwesomeIcon
                    className=" !h-[4rem]"
                    icon={faCartPlus}
                    color="#467fcf"
                  />
                </span>
              </div>
            </div>
            <Card.Footer className="text-end bg-white border-0 flex justify-end ">
              <Button
                className={`bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full ${
                  disablePrevButton[5] == true ? "!hidden" : "!flex"
                } items-center justify-center	`}
                disabled={disablePrevButton[5]}
                onClick={() => handlePrev("5")}
              >
                {"<"}
              </Button>
              <Button
                className={`bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full ${
                  disableNextButton[5] == true ? "!hidden" : "!flex"
                } items-center justify-center	`}
                disabled={disableNextButton[5]}
                onClick={() => handleNext("5")}
              >
                {">"}
              </Button>
            </Card.Footer>
          </Card>
          <div className="row  mt-5">
            <div className="col-md-6 drop-shadow-lg">
              <Barcharts className="ml-5" />
            </div>
            <div className="col-md-6 drop-shadow-lg">
              <PaymentsBarcharts />
            </div>
          </div>

          {/*  staff actions */}
          {userData?.staff?.id == 27 && (
            <div className="mt-4">
              <div className="container">
                <h3 className="py-2">Staff Actions</h3>
                <StaffActionsTable />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
