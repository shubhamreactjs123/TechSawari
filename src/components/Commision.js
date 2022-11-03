import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit, BiBlock } from "react-icons/bi";
const baseUrl = process.env.REACT_APP_API_URL;

const Commision = () => {
  const [commisionList, setCommisionList] = useState();

  const navigate = useNavigate();

  const commisionData = async () => {
    const response = await fetch(baseUrl + "api/v1/static/listCommission", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    if (json.responseCode === 200) {
      setCommisionList(json.result);
    }
  };

  const blockTax = async (_id) => {
    const response = await fetch(
      baseUrl + "api/v1/static/activeBlockCommission/" + _id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(),
      }
    );
    const json = await response.json();
    if (json.responseCode === 200) {
      setCommisionList(json.result);
    }
  };
  // columns name as a header of table
  const columns = [
    {
      name: "Tax",
      selector: (row) => row.tax,
    },
    {
      name: "Commission",
      selector: (row) => row.Commission,
    },
    {
      name: "Total Commission",
      selector: (row) => row.totalCommission,
    },
    {
      name: "Driver Commission",
      selector: (row) => row.driverCommission,
    },
    {
      name: "Edit",
      selector: (row) => (
        <button
          className="btn text-xl px-2 py-1 text-cyan-600 shadow-xl"
          onClick={() => {
            let id = row._id;
            navigate("/edit-commision/" + id);
          }}
        >
          <BiEdit />
        </button>
      ),
    },
    {
      name: "Block/Unblock",
      selector: (row) => (
        <button
          className="btn text-xl px-2 py-1  shadow-xl"
          onClick={() => blockTax(row._id)}
        >
          {row.status === "BLOCKED" ? (
            <BiBlock className="text-red-600" />
          ) : (
            <BiBlock className="text-green-600" />
          )}
        </button>
      ),
    },
    {
      name: "Delete",
      selector: (row) => (
        <button
          className="btn text-xl px-2 py-1 text-red-500 shadow-xl"
          onClick={() => deleteCommission(row._id)}
        >
          <RiDeleteBin5Line />
        </button>
      ),
    },
  ];

  const deleteCommission = async (_id) => {
    const url = baseUrl + "api/v1/static/deleteCommission";
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ _id: _id }),
    });
    const json = await response.json();
    if (json.responseCode === 200) {
      commisionData();
    }
  };
  const myStyle = {
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        backgroundColor: "gray",
        color: "white",
        minWidth: "50rem",
      },
    },
  };
  useEffect(() => {
    commisionData();
    deleteCommission();
  }, []);
  return (
    <div className="flex items-center justify-center">
      <div className="w-11/12 text-ellipsis overflow-hidden md:text-ellipsis md:overflow-hidden md:text-xs text-xl font-bold py-2 shadow-xl ">
        <h1 className="text-xl font-bold py-2">Tax &#38; Commission Details</h1>
        <DataTable
          columns={columns}
          data={commisionList}
          pagination
          actions={
            <Link to="/add-commision">
              <button className="bg-blue-500 hover:bg-blue-900 px-3 py-1 rounded mr-5 text-sm font-bold text-white">
                Add Commission
              </button>
            </Link>
          }
          fixedHeader
          fixedHeaderScrollHeight="70vh"
          customStyles={myStyle}
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default Commision;
