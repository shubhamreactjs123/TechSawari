import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
const baseUrl = process.env.REACT_APP_API_URL;

const PendingDriver = () => {
  const [driverList, setDriverList] = useState();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState([]);

  const driverData = async () => {
    const response = await fetch(baseUrl + "api/v1/admin/providerList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    if (json.responseCode === 200) {
      setDriverList(json.result);
      setSearchFilter(json.result);
    }
  };
  // columns name as a header of table
  const columns = [
    {
      name: "Driver Name",
      selector: (row) =>
        !row.name ? "---------------" : <div className="py-2">{row.name}</div>,
    },
    {
      name: "Online/ Offline",
      selector: (row) =>
        row.online === true ? (
          <div className="bg-green-500 p-1 rounded text-white">Online</div>
        ) : (
          <div className="bg-red-500 p-1 rounded text-white">Offline</div>
        ),
    },
    {
      name: "Mobile Number",
      selector: (row) => <div className="py-2">{row.mobileNumber}</div>,
    },
    {
      name: "Status",
      selector: (row) =>
        row.status === "DELETE" ? (
          <div className="bg-red-500 text-white rounded px-3 py-1">
            {row.status}
          </div>
        ) : (
          <div className="bg-green-500 text-white rounded px-3 py-1">
            {row.status}
          </div>
        ),
    },
    {
      name: "Wallet Balance",
      selector: (row) => <div className="py-2">{row.walletBalance}</div>,
    },
    {
      name: "Document Status",
      selector: (row) =>
        row.documentVerified === "PENDING" ? (
          <div className="py-2">{row.documentVerified}</div>
        ) : null,
    },
    {
      name: "View",
      selector: (row) => (
        <button
          className="btn bg-blue-500 px-2 py-1 text-white hover:bg-blue-800 rounded-full shadow"
          onClick={() => {
            const id = row._id;
            navigate("/driver/view/" + id);
          }}
        >
          View
        </button>
      ),
    },
    {
      name: "Delete",
      selector: (row) => (
        <button
          className="btn bg-red-500 px-2 py-1 text-white hover:bg-red-800 rounded-full shadow"
          onClick={() => deletUser(row._id)}
        >
          Delete
        </button>
      ),
    },
    {
      name: "Block/ Unblock",
      selector: (row) =>
        row.status === "BLOCK" ? (
          <button
            className="btn bg-orange-500 px-2 py-1 text-white hover:bg-red-800 rounded-full shadow"
            onClick={() => blockUser(row._id)}
          >
            Unblock
          </button>
        ) : (
          <button
            className="btn bg-red-500 px-2 py-1 text-white hover:bg-red-800 rounded-full shadow"
            onClick={() => blockUser(row._id)}
          >
            Block
          </button>
        ),
    },
    {
      name: "Check Documents",
      selector: (row) => (
        <button
          className="btn bg-yellow-500 px-2 md:w-50 py-1 text-white hover:bg-yellow-800 rounded-full"
          onClick={() => {
            const id = row._id;
            navigate("/docs/view/" + id);
          }}
        >
          Check Docs
        </button>
      ),
    },
  ];
  const deletUser = async (id) => {
    const url = baseUrl + "api/v1/admin/deleteUser";
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ _id: id }),
    });
    const json = await response.json();
    if (json.responseCode === 200) {
      driverData();
    }
  };
  const blockUser = async (id) => {
    const url = baseUrl + "api/v1/admin/blockUnblockUser";
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ _id: id }),
    });
    const json = await response.json();
    driverData();
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
    driverData();
    deletUser();
  }, []);

  useEffect(() => {
    const result = driverList?.filter((driver) => {
      return (
        driver.name?.toLowerCase().match(search.toLocaleLowerCase()) ||
        driver.mobileNumber?.toLowerCase().match(search.toLocaleLowerCase())
      );
    });

    setSearchFilter(result);
  }, [search]);
  return (
    <div className="flex items-center justify-center">
      <div className="w-11/12 text-ellipsis overflow-hidden md:text-ellipsis md:overflow-hidden ">
        <h1 className="text-xl font-bold py-2">Drivers List</h1>
        <DataTable
          columns={columns}
          data={searchFilter}
          pagination
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="75vh"
          customStyles={myStyle}
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search"
              className="border px-2 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
          subHeaderAlign="left"
        />
      </div>
    </div>
  );
};

export default PendingDriver;
