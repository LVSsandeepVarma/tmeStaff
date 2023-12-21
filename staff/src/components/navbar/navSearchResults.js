import { faBoxOpen, faBoxesStacked, faCalendar, faEnvelope, faPhone, faTruck, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Badge, Button, Card, Col, Row } from 'react-bootstrap'
import { FaMailBulk } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'

export default function NavSearchResults({data}) {
  console.log(data, "datatest")
  return (
    <div className="bg-green-100">
      <Card
        className="mt-2 !absolute w-[225%]  !bg-white-100 "
        style={{
          zIndex: 999,
          borderRadius: "10px",
          border: "none",
          left: "-45%",
        }}
      >
        <Card.Body
          className="overflow-auto h-auto max-h-[70vh]"
          //  style={{background: "linear-gradient(235deg, rgb(37, 55, 139), rgb(103 120 203) 1000px)", borderRadius:"10px"}}
          style={{
            background: "rgb(0, 0, 0, 0.1)",
            backdropFilter: "blur(2px)",
          }}
        >
          {data?.length > 0 &&
            data?.map((searchData, ind) => (
              <Card className="mb-3 relative drop-shadow-xl ">
                <Card.Title className=" w-[100%] contents shadow-2xl">
                  <Row className="pr-2 pl-2 ">
                    <Col>
                      <p className="flex items-center mt-1 truncate text-sm normal-case">
                        <MdAlternateEmail className="mr-1" />
                        {searchData?.email}
                      </p>
                    </Col>
                  </Row>
                </Card.Title>
                <Card.Body className="drop-shadow-lg">
                  <div className="mb-2 grid grid-cols-2 gap-2">
                    <Badge className="mb-2 bg-transparent !text-sm search_placed">
                      <b>
                        <FontAwesomeIcon
                          icon={faBoxesStacked}
                          className="mr-1"
                        />
                        Order Placed
                      </b>
                      : {searchData?.placed}
                    </Badge>
                    <Badge className="mb-2 bg-transparent !text-sm search_dispatched">
                      <b>
                        <FontAwesomeIcon icon={faTruck} className="mr-1" />
                        Order Dispatched
                      </b>
                      : {searchData?.dispatched}
                    </Badge>
                    <Badge className="mb-2 !text-sm  bg-transparent search_delivered">
                      <b>
                        <FontAwesomeIcon icon={faBoxOpen} className="mr-1" />
                        Order Delivered
                      </b>
                      : {searchData?.delivered}
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            ))}
          {data?.length == 0 && (
            <p className="flex w-full text-white justify-center items-center h-full text-lg font-bold text-gray-500">
              No results Found
            </p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
