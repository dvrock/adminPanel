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
export default function GiftPage() {
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
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
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
    <div className="App">
      <table class=" table table-bordered" border="1px">
        <thead>
          <tr>
            <th scope="col">S.no</th>
            <th scope="col">Name</th>
            <th scope="col">Types</th>
            <th scope="col">Points</th>
            <th scope="col">Image</th>
            <th scope="col">Status</th>
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
                  <td>
                    <button
                      className="btn bg-primary"
                      style={{
                        backgroundColor: "red",
                        fontSize: "100%",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Active
                    </button>
                  </td>
                  <td>
                    <Link to={`/gift?query=${data.id}`}>
                      <button
                        className="btn "
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          fontSize: "100%",
                          fontWeight: "bold",
                        }}
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn "
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        fontSize: "100%",

                        fontWeight: "bold",
                      }}
                    >
                      Delete
                    </button>
                  </td>
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
