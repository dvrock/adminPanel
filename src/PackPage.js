import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { EyeOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import creator_list from "./creator_list";
import "./PaginatedItems.css";
// Example items, to simulate fetching from another resources.
export default function PackPage() {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const [val, setVal] = useState(creator_list.slice(itemOffset, endOffset));
  useEffect(() => {
    // Fetch items from another resources.
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(creator_list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(creator_list.length / itemsPerPage));
    setVal(creator_list.slice(itemOffset, endOffset));
    console.log(itemsPerPage);
    console.log(val);
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    console.log(event);
    const newOffset = (event.selected * itemsPerPage) % creator_list.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(parseInt(newOffset));
  };
  if (itemOffset === 0) {
    setItemOffset(1);
  }

  return (
    <div className="App mx-2 my-4">
      <table class=" table   table-bordered" border="1px">
        <thead>
          <tr>
            <th scope="col">S.no</th>
            <th scope="col">Name</th>
            <th scope="col">Coins</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

        {
          // Fetch items from another resources.
          val.map((data, id) => {
            return (
              <tbody>
                <tr id={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.userdetail}</td>
                  <td>{data.item}</td>
                  <td>{data.callprice}</td>
                  <td>{data.allAccess}</td>
                  <td>{data.item}</td>
                  <td>{data.callprice}</td>
                </tr>
              </tbody>
            );
          })
        }
      </table>
      <Row>
        <Col>
          <ReactPaginate
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="Previous"
            previousLinkClassName="btn  previous bg-primary"
            nextLinkClassName="btn next  bg-primary"
            containerClassName="paginateButtons"
          />
        </Col>
        <Col>
          <span>
            Rows:
            <select
              id="rows"
              className="w-auto select"
              onChange={() => {
                setItemsPerPage(
                  parseInt(document.getElementById("rows").value)
                );
                setVal(creator_list.slice(itemOffset, endOffset));
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </span>
        </Col>
      </Row>
    </div>
  );
}
