import React, {useState, useEffect} from "react";
import { Button, Card, Table } from "react-bootstrap";
import MyModal from "./orderDetailsModal";


const LastOrderTable = () => {
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clientId, setClientId] = useState("");
  useEffect(()=>{
      const table_data = [
          {order_id: "WD01",Customer: "Edinburgh",Total:"$1500", SubTotal:"$3200",Discount:"$1500", Status: "Paid"},
          {order_id: "WD02",Customer: "rdinburgh",Total:"$1500", SubTotal:"$3200",Discount:"$1500", Status: "Un Paid"},
          {order_id: "WD03",Customer: "fdinburgh",Total:"$1500", SubTotal:"$3200",Discount:"$1500", Status: "Partially Paid"},
          {order_id: "WD04",Customer: "gdinburgh",Total:"$1500", SubTotal:"$3200",Discount:"$1500", Status: "Paid"},
          {order_id: "WD05",Customer: "qhinburgh",Total:"$1500", SubTotal:"$3200",Discount:"$1500", Status: "Un Paid"},
          {order_id: "WD06",Customer: "rdinburgh",Total:"$1500", SubTotal:"$3200",Discount:"$1500", Status: "Partially Paid"},
          {order_id: "WD07",Customer: "sdinburgh",Total:"$1500", SubTotal:"$3200",Discount:"$1500", Status: "Paid"},
          {order_id: "WD08",Customer: "tdinburgh",Total:"$1500", SubTotal:"$3200",Discount:"$1500", Status: "Un Paid"},
          {order_id: "WD09",Customer: "udinburgh",Total:"$1500", SubTotal:"$3200",Discount:"$1500", Status: "Partially Paid"},
          {order_id: "WD10",Customer: "vdinburgh",Total:"$1500", SubTotal:"$3200",Discount:"$1500", Status: "Paid"},
          {order_id: "WD11",Customer: "wdinburgh",Total:"$1500", SubTotal:"$3200",Discount:"$1500", Status: "Un Paid"},
          {order_id: "WD12",Customer: "ydinburgh",Total:"$1500", SubTotal:"$3200",Discount:"$1500", Status: "Partially Paid"},
          {order_id: "WD13",Customer: "xdinburgh",Total:"$1500", SubTotal:"$3200",Discount:"$1500", Status: "Paid"},
          {order_id: "WD14",Customer: "zdinburgh",Total:"$1500", SubTotal:"$3200",Discount:"$1500", Status: "Un Paid"},
      ]
      setTableData([...table_data])
  },[]);

  const handleDetailedOrderDetails = (customer) => {
    setClientId(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <MyModal
        showModal={showModal}
        handleClose={handleCloseModal}
        clientId={clientId}
      />
    <div>
      <div className="row !flex !justify-center">
        <div className="col-md-8 col-sm-12 col-12 ">
          <p ><b>Name</b> : Sandeep</p>
          <p ><b>email</b>: sandeep@gmail.com</p>
          <p ><b>phone</b>: 7901003266</p>
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
          <div>

          </div>
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
          <div className="flex row !justify-center">
            {tableData?.length > 0 && 
          tableData?.map((val,ind)=>(
            <div className={`flex  ${tableData?.length>1 ? "col-md-4": "col-md-5"}  `}>
              <Card style={{ width: '100%' }}>
              <Card.Header>{val?.order_id}</Card.Header>
              <Card.Body>
                <Card.Text>Amount: {val?.Total}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button className="w-full !bg-[#25378b]  " style={{border:"#25378b"}} onClick={() => {
                            handleDetailedOrderDetails(val?.Customer);
                          }}>View</Button>
              </Card.Footer>
            </Card>
            </div>
          ))}
          </div>
          

            
          </div>
        </div>
        {/*summary end div */}
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4">
          <div className="flex justify-end mt-3 !pr-[55px]">
        <div>
          <p className="font-bold text-lg">Summary</p>
          <p><b>Total</b> : 000</p>
          <p><b>Subtotal</b>: 000</p>
          <p><b>Discount</b>: 000</p>
          <p><b>tax</b>: 000</p>
          <p><b>Final Price</b>: 000</p>
          </div>
          
        </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LastOrderTable;
