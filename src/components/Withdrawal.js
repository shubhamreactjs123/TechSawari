import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SimpleDateTime from "react-simple-timestamp-to-date";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
const baseUrl = process.env.REACT_APP_API_URL;
function Withdrawal() {
  const [transactionList, setTransactionList] = useState();
  const [search, setSearch] = useState();
  const [searchFilter, setSearchFilter] = useState();
  let navigate = useNavigate();
  const transactionData = async () => {
    const response = await fetch(
      baseUrl + "api/v1/admin/withdrawRequestListforAdmin",
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

  const CustomDate = ({ row }) => (
    <div>
      <div>
        <div
          data-tag="allowRowEvents"
          style={{
            textAlign: "left",
            overflow: "hidden",
            whiteSpace: "wrap",
            textOverflow: "ellipses",
          }}
        >
          {}
          <div>
            {" "}
            <SimpleDateTime
              dateSeparator="/"
              timeSeparator=":"
              dateFormat="DMY"
              meridians="1"
            >
              {new Date(row.createdAt)}
            </SimpleDateTime>
          </div>
        </div>
      </div>
    </div>
  );
  const CustomReply = ({ row }) => (
    <div>
      <div>
        <div
          data-tag="allowRowEvents"
          style={{
            textAlign: "left",
            overflow: "hidden",
            whiteSpace: "wrap",
            textOverflow: "ellipses",
          }}
        >
          {}
          <div>{row.paymentReply ? row.paymentReply : " "}</div>
        </div>
      </div>
    </div>
  );
  const columns = [
    {
      name: "User Name",
      selector: (row) => row.userId.name,
    },
    {
      name: "Date & Time",
      cell: (row) => <CustomDate row={row} />,
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
      name: "Message",
      selector: (row) => row.message,
    },
    {
      name: "Payment Status",
      selector: (row) => row.status,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.mobileNumber,
    },
    {
      name: "Payment Method",
      selector: (row) => row.paymentMethod,
    },
    {
      name: "Transaction Type",
      selector: (row) => row.transactionType,
    },
    {
      name: "Reply",
      cell: (row) => <CustomReply row={row} />,
    },
    {
      name: "Screen Shot",
      selector: (row) =>
        row.screenShot ? <img src={row.screenShot} alt="" /> : " ",
    },
    {
      name: "Payment",
      selector: (row) => (
        <button
          className="btn   text-white  rounded-full "
          onClick={() => {
            const id = row._id;
            navigate("/withdrawal/view/" + id);
          }}
        >
          {row.status === "PENDING" ? (
            <div className="w-full px-2 shadow-xl rounded-full  py-1 bg-orange-500">
              Unpaid
            </div>
          ) : (
            <div className="bg-green-800">Paid</div>
          )}
        </button>
      ),
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
    const result = transactionList?.filter((withdraw) => {
      return(
        withdraw.userId?.name?.toLowerCase().match(search.toLocaleLowerCase()) ||
        withdraw.amount?.toLowerCase().match(search.toLocaleLowerCase())
      );
    });
    setSearchFilter(result);
  },[search])
  return (
    <div className="flex items-center justify-center">
      <div className="w-11/12 shadow-xl ">
        <h1 className="text-xl font-bold py-2">Withdrawal List</h1>
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
            placeholder='Search'
            className="border rounded px-2"
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

export default Withdrawal;
