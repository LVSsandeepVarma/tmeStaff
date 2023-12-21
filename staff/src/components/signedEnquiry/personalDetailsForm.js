import React from "react";
import { Table } from "react-bootstrap";

const LastOrder = () => {
  return (
    <>
      <div>
        <div className="row !flex !justify-center">
          <div className="col-md-8 col-sm-12 col-12 ">
            <p>
              <b>Name</b> : Sandeep
            </p>
            <p>
              <b>email</b>: sandeep@gmail.com
            </p>
            <p>
              <b>phone</b>: 7901003266
            </p>
          </div>
          <div className="col-md-4">
            <p className="text-xl font-bold">ORD635RR19K8724</p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <p className="text-lg font-bold">Billing Address</p>
            <p>Adddress 1,</p>
            <p>Address2,</p>
            <p>city, state,</p>
            <p>country</p>
            <div></div>
          </div>
          <div className="col-md-6 flex justify-around ">
            <div>
              <p className="text-lg font-bold">Shipping Address</p>
              <p>Adddress 1,</p>
              <p>Address2,</p>
              <p>city, state,</p>
              <p>country</p>
            </div>
          </div>
        </div>
        <div>
          {/* centered div */}
          <div className="row mt-4 flex max-h-96 overflow-y-auto ">
            <div className="col-md-12">
              <p className="text-lg font-bold">Product Details</p>
              {/* <p className="flex justify-center items-center font-bold text-lg text-gray-300">No products ordered, By products to dislay</p> */}

              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th className="!font-bold">SL No.</th>
                    <th className="!font-bold">Porducts</th>
                    <th className="!font-bold">Quantity</th>
                    <th className="!font-bold">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>01</p>
                    </td>
                    <td>
                      <div className="!max-w-[50%]">
                        <p>porduct 1</p> {/* product*/}
                        <small className="break-word ">
                          Long content that needs to wrap onto multiple lines  onto multiple lines 
                        </small>{" "}
                        {/* description*/}
                      </div>
                    </td>
                    <td>
                      <p>5</p>
                    </td>
                    <td>
                      <p> 180</p>
                    </td>
                  </tr>
                  {/* row-2 */}
                  <tr>
                    <td>
                      <p>02</p>
                    </td>
                    <td>
                      <div className="!max-w-[50%]">
                        <p>porduct 2</p> {/* product*/}
                        <small className="break-word">prod 2 desc</small>{" "}
                        {/* description*/}
                      </div>
                    </td>
                    <td>
                      <p>3</p>
                    </td>
                    <td>
                      <p> 270</p>
                    </td>
                  </tr>
                  {/* row-3 */}
                  <tr>
                    <td>
                      <p>03</p>
                    </td>
                    <td>
                      <div className="!max-w-[50%]">
                        <p>porduct 3</p> {/* product*/}
                        <small className="break-word">
                          Long content that needs to wrap onto multiple lines
                        </small>{" "}
                        {/* description*/}
                      </div>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p> 100</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>04</p>
                    </td>
                    <td>
                      <div className="!max-w-[50%]">
                        <p>porduct 3</p> {/* product*/}
                        <small className="break-word">
                          Long content that needs to wrap onto multiple lines
                        </small>{" "}
                        {/* description*/}
                      </div>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p> 100</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>05</p>
                    </td>
                    <td >
                      <div className="!max-w-[50%]">
                        <p>porduct 3</p> {/* product*/}
                        <small className="break-word">
                          Long content that needs to wrap onto multiple lines
                        </small>{" "}
                        {/* description*/}
                      </div>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p> 100</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>06</p>
                    </td>
                    <td >
                      <div className="!max-w-[50%]">
                        <p>porduct 3</p> {/* product*/}
                        <small className="break-word">
                          Long content that needs to wrap onto multiple lines
                        </small>{" "}
                        {/* description*/}
                      </div>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p> 100</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>07</p>
                    </td>
                    <td >
                      <div className="!max-w-[50%]">
                        <p>porduct 3</p> {/* product*/}
                        <small className="break-word">
                          Long content that needs to wrap onto multiple lines
                        </small>{" "}
                        {/* description*/}
                      </div>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p> 100</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>08</p>
                    </td>
                    <td >
                      <div className="!max-w-[50%]">
                        <p>porduct 3</p> {/* product*/}
                        <small className="break-word">
                          Long content that needs to wrap onto multiple lines
                        </small>{" "}
                        {/* description*/}
                      </div>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p> 100</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>09</p>
                    </td>
                    <td >
                      <div className="!max-w-[50%]">
                        <p>porduct 3</p> {/* product*/}
                        <small className="break-word">
                          Long content that needs to wrap onto multiple lines
                        </small>{" "}
                        {/* description*/}
                      </div>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p> 100</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>10</p>
                    </td>
                    <td >
                      <div className="!max-w-[50%]">
                        <p>porduct 3</p> {/* product*/}
                        <small className="break-word">
                          Long content that needs to wrap onto multiple lines
                        </small>{" "}
                        {/* description*/}
                      </div>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p> 100</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>11</p>
                    </td>
                    <td >
                      <div className="!max-w-[50%]">
                        <p>porduct 3</p> {/* product*/}
                        <small className="break-word">
                          Long content that needs to wrap onto multiple lines
                        </small>{" "}
                        {/* description*/}
                      </div>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p> 100</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>12</p>
                    </td>
                    <td >
                      <div className="!max-w-[50%]">
                        <p>porduct 3</p> {/* product*/}
                        <small className="break-word">
                          Long content that needs to wrap onto multiple lines
                        </small>{" "}
                        {/* description*/}
                      </div>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p> 100</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>13</p>
                    </td>
                    <td >
                      <div className="!max-w-[50%]">
                        <p>porduct 3</p> {/* product*/}
                        <small className="break-word">
                          Long content that needs to wrap onto multiple lines 
                        </small>{" "}
                        {/* description*/}
                      </div>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p> 100</p>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          {/*summary end div */}
          <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-4">
              <div className="flex justify-end mt-3 !pr-[55px]">
                <div>
                  <p className="font-bold text-lg">Summary</p>
                  <p>
                    <b>Total</b> : 000
                  </p>
                  <p>
                    <b>Subtotal</b>: 000
                  </p>
                  <p>
                    <b>Discount</b>: 000
                  </p>
                  <p>
                    <b>tax</b>: 000
                  </p>
                  <p>
                    <b>Final Price</b>: 000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LastOrder;
