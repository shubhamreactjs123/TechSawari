import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
const baseUrl = process.env.REACT_APP_API_URL;
function Transaction() {
  const [transactionList, setTransactionList] = useState();
  const [search, setSearch] = useState();
  const [searchFilter, setSearchFilter] = useState();

  const transactionData = async () => {
    const response = await fetch(
      baseUrl + "api/v1/admin/transactionListforAdmin",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(),
      }
    );
    const json = await response.json();
    if (json.responseCode === 200) {
      setTransactionList(json.result);
      setSearchFilter(json.result);
    }
  };
  // columns name as a header of table
  const columns = [
    {
      name: "User Name",
      selector: (row) => row.userId.name,
    },
    {
      name: "Date & Time",
      selector: (row) => row.dateTime,
    },
    {
      name: "Amount",
      selector: (row) => (
        <div className="flex">
          <FontAwesomeIcon
            icon={faIndianRupeeSign}
            className="my-1 mr-1 text-gray-600"
          />
          {row.amount}
        </div>
      ),
    },
    {
      name: "Transaction Id",
      selector: (row) => (row.status === "PAID" ? row.transactionId : "Not paid "),
    },
    {
      name: "Payment Status",
      selector: (row) =>
        row.status === "PAID" ? (
          <div className="px-3 py-1 rounded bg-green-500 text-white">
            {row.status}
          </div>
        ) : (
          <div className=" px-3 py-1 font-bold text-red-600">
            {row.status}
          </div>
        ),
    },
    {
      name: "Transaction Type",
      selector: (row) => row.transactionType,
    },
  ];
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
    transactionData();
  }, []);

  useEffect(() => {
    const result = transactionList?.filter((transact) => {
     return(
      transact.userId?.name?.toLowerCase().match(search.toLocaleLowerCase()) ||
      transact.transactionId?.toLowerCase().match(search.toLocaleLowerCase())
     );
    });
    setSearchFilter(result);
  }, [search])
  return (
    <div className="flex items-center justify-center">
      <div className="w-11/12  text-ellipsis overflow-hidden md:text-ellipsis md:overflow-hidden">
        <h1 className="text-xl font-bold py-2">Transaction List</h1>
        <DataTable
          columns={columns}
          data={searchFilter}
          pagination
          highlightOnHover
          dense
          fixedHeader
          fixedHeaderScrollHeight="75vh"
          customStyles={myStyle}
          subHeader
          subHeaderComponent={
            <input
            type='text'
            placeholder='search'
            className='border px-2 rounded'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            />
          }
          subHeaderAlign='left'
        />
      </div>
    </div>
  );
}

export default Transaction;
