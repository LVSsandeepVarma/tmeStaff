import { useEffect, useState } from "react";
import MyModal from "./orderDetailsModal";

export default function CanceledOrderTable() {
  const [tableData, setTableData] = useState([]);
  const [itemsInPage, setItemsInPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTable, setFilteredTable] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clientId, setClientId] = useState("");
  useEffect(() => {
    const table_data = [
      {
        order_id: "WD01",
        Customer: "Edinburgh",
        Total: "$1500",
        SubTotal: "$3200",
        Discount: "$1500",
        Status: "Paid",
      },
      {
        order_id: "WD02",
        Customer: "rdinburgh",
        Total: "$1500",
        SubTotal: "$3200",
        Discount: "$1500",
        Status: "Un Paid",
      },
      {
        order_id: "WD03",
        Customer: "fdinburgh",
        Total: "$1500",
        SubTotal: "$3200",
        Discount: "$1500",
        Status: "Partially Paid",
      },
      {
        order_id: "WD04",
        Customer: "gdinburgh",
        Total: "$1500",
        SubTotal: "$3200",
        Discount: "$1500",
        Status: "Paid",
      },
      {
        order_id: "WD05",
        Customer: "qhinburgh",
        Total: "$1500",
        SubTotal: "$3200",
        Discount: "$1500",
        Status: "Un Paid",
      },
      {
        order_id: "WD06",
        Customer: "rdinburgh",
        Total: "$1500",
        SubTotal: "$3200",
        Discount: "$1500",
        Status: "Partially Paid",
      },
      {
        order_id: "WD07",
        Customer: "sdinburgh",
        Total: "$1500",
        SubTotal: "$3200",
        Discount: "$1500",
        Status: "Paid",
      },
      {
        order_id: "WD08",
        Customer: "tdinburgh",
        Total: "$1500",
        SubTotal: "$3200",
        Discount: "$1500",
        Status: "Un Paid",
      },
      {
        order_id: "WD09",
        Customer: "udinburgh",
        Total: "$1500",
        SubTotal: "$3200",
        Discount: "$1500",
        Status: "Partially Paid",
      },
      {
        order_id: "WD10",
        Customer: "vdinburgh",
        Total: "$1500",
        SubTotal: "$3200",
        Discount: "$1500",
        Status: "Paid",
      },
      {
        order_id: "WD11",
        Customer: "wdinburgh",
        Total: "$1500",
        SubTotal: "$3200",
        Discount: "$1500",
        Status: "Un Paid",
      },
      {
        order_id: "WD12",
        Customer: "ydinburgh",
        Total: "$1500",
        SubTotal: "$3200",
        Discount: "$1500",
        Status: "Partially Paid",
      },
      {
        order_id: "WD13",
        Customer: "xdinburgh",
        Total: "$1500",
        SubTotal: "$3200",
        Discount: "$1500",
        Status: "Paid",
      },
      {
        order_id: "WD14",
        Customer: "zdinburgh",
        Total: "$1500",
        SubTotal: "$3200",
        Discount: "$1500",
        Status: "Un Paid",
      },
    ];
    setTableData([...table_data]);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Filter the table data based on the search query
    const filteredData = tableData.filter((item) =>
      // console.log(item)
      item?.Customer?.toLowerCase().startsWith(event.target.value.toLowerCase())
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
  const startIndex = (currentPage - 1) * itemsInPage;
  const endIndex = startIndex + itemsInPage;
  let currentData = tableData.slice(startIndex, endIndex);
  if (searchQuery != "") {
    currentData = filteredTable.slice(startIndex, endIndex);
  }

  const handleItemsPerPageChange = (event) => {
    console.log("limit", event.target.value);
    setItemsInPage(event.target.value);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDetailedOrderDetails = (customer) => {
    setClientId(customer);
    setShowModal(true);
  };

  return (
    <>
      <MyModal
        showModal={showModal}
        handleClose={handleCloseModal}
        clientId={clientId}
      />
      <div
        id="order-listing_wrapper"
        className="dataTables_wrapper dt-bootstrap4 no-footer"
      >
        <div className="!flex">
          <div className="!flex justify-start w-[20%] items-center ">
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
        <div className="row">
          <div className="col-sm-12">
            <table
              id="order-listing"
              className="table dataTable table-responsive no-footer table-bordered"
              role="grid"
              aria-describedby="order-listing_info"
            >
              <thead>
                <tr className="bg-primary text-white" role="row">
                  <th
                    className="sorting sorting_asc"
                    tabindex="0"
                    aria-controls="order-listing"
                    rowspan="1"
                    colspan="1"
                    aria-sort="ascending"
                    aria-label="Order #: activate to sort column descending"
                    style={{ width: "72.1719px" }}
                  >
                    Order id
                  </th>
                  <th
                    className="sorting"
                    tabindex="0"
                    aria-controls="order-listing"
                    rowspan="1"
                    colspan="1"
                    aria-label="Customer: activate to sort column ascending"
                    style={{ width: "89.4688px" }}
                  >
                    Products
                  </th>
                  <th
                    className="sorting"
                    tabindex="0"
                    aria-controls="order-listing"
                    rowspan="1"
                    colspan="1"
                    aria-label="Ship to: activate to sort column ascending"
                    style={{ width: "67.1562px" }}
                  >
                    Total
                  </th>
                  <th
                    className="sorting"
                    tabindex="0"
                    aria-controls="order-listing"
                    rowspan="1"
                    colspan="1"
                    aria-label="Base Price: activate to sort column ascending"
                    style={{ width: "91.5312px" }}
                  >
                    Sub Total
                  </th>
                  <th
                    className="sorting"
                    tabindex="0"
                    aria-controls="order-listing"
                    rowspan="1"
                    colspan="1"
                    aria-label="Purchased Price: activate to sort column ascending"
                    style={{ width: "139.031px" }}
                  >
                    Discount
                  </th>
                  <th
                    className="sorting"
                    tabindex="0"
                    aria-controls="order-listing"
                    rowspan="1"
                    colspan="1"
                    aria-label="Status: activate to sort column ascending"
                    style={{ width: "66.5469px" }}
                  >
                    Status
                  </th>
                  <th
                    className="sorting"
                    tabindex="0"
                    aria-controls="order-listing"
                    rowspan="1"
                    colspan="1"
                    aria-label="Actions: activate to sort column ascending"
                    style={{ width: "213.094px" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              {currentData.length > 0 ? (
                <tbody>
                  {currentData?.map((obj, ind) => (
                    <tr className="odd">
                      <td className="sorting_1">{obj?.order_id}</td>
                      <td>{obj?.Customer}</td>
                      <td>{obj?.Total}</td>
                      <td>{obj?.SubTotal}</td>
                      <td>{obj?.Discount}</td>
                      <td>
                        <label
                          className={`badge ${
                            obj?.Status == "Paid"
                              ? "badge-success"
                              : obj?.Status == "Un Paid"
                              ? "badge-danger"
                              : "badge-warning"
                          }`}
                        >
                          {obj?.Status}
                        </label>
                      </td>
                      <td className="text-start">
                        <button
                          className="btn btn-light"
                          onClick={() => {
                            handleDetailedOrderDetails(obj?.Customer);
                          }}
                        >
                          <i className="mdi mdi-eye text-primary"></i>View{" "}
                        </button>
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
            </table>
          </div>
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
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button className="page-link" onClick={handleNextPage}>
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
