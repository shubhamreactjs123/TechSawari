import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
const baseUrl = process.env.REACT_APP_API_URL;
function CancelBooking() {
  const [bookingList, setBookingList] = useState();
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState([]);
  const navigate = useNavigate();
  const bookingData = async () => {
    const response = await fetch(baseUrl + "api/v1/admin/cancelBookinglistforAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    if (json.responseCode === 200) {
      setBookingList(json.result.docs);
      setSearchFilter(json.result.docs);
    }
  };
  const ExpandedComponent = ({ data }) => (
    <table className="w-full">
     <tbody >
     <tr className="border w-full">
        <td className="font-semibold marExpend  py-2">Booking Status</td>
        <td className="px-3 py-2">{data.bookingStatus}</td>
      </tr>
      <tr className="border w-full">
        <td className="font-semibold marExpend  py-2">Payment Status</td>
        <td className="px-3 py-2">{data.paymentStatus}</td>
      </tr>
      <tr className="border w-full">
        <td className="font-semibold marExpend  py-2">Payment Mode</td>
        <td className="px-3 py-2">{data.paymentMode ? data.paymentMode : 'No Payment!'}</td>
      </tr>
       <tr className="border w-full">
         <td className="font-semibold marExpend  py-2">Start Location</td>
         <td className="px-3 py-2">{data.startLocation}</td>
       </tr>
       <tr className="border w-full">
         <td className="font-semibold marExpend px-3 py-2">End Location</td>
         <td className="px-3 py-2">{data.endLocation}</td>
       </tr>
       <tr className="border w-full">
         <td className="font-semibold marExpend px-3 py-2">Description</td>
         <td className="px-3 py-2">{data.description}</td>
       </tr>
     </tbody>
    </table>
   );
  // columns name as a header of table

  const columns = [
    {
      name: "Booking Id",
      selector: (row) => <div className="fontSize">{row.bookingId}</div>,
    },
    {
      name: "Vehical Image",
      selector: (row) => <img width={50} height={50} src={row?.vehicalType?.vehicalImage} />,
    },
    {
      name: "Vehical Name",
      selector: (row) => row?.vehicalType?.vehicalName,
    },
    {
      name: "Customer Name",
      selector: (row) => row.userId.name,
    },
    {
      name: "Driver Name",
      selector: (row) =>
        row.drivers === null ? "Not Available" : row.drivers.name,
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
      name: "Date & Time",
      selector: (row) => row.dateTime,
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
    bookingData();
  }, []);

  useEffect(() => {
    const result = bookingList?.filter((book) => {
      return (
        book.userId.name?.toLowerCase().match(search.toLocaleLowerCase()) ||
        book.drivers.name?.toLowerCase().match(search.toLocaleLowerCase()) ||
        book.bookingId?.toLowerCase().match(search.toLocaleLowerCase())
      );
    });

    setSearchFilter(result);
  }, [search]);
  return (
    <div className="flex items-center justify-center">
      <div className="w-11/12 shadow-xl">
      <div className="flex justify-between items-center boton">
       <Link to='/booking' className="bg-gray-200 w-full text-center cursor-pointer  hover:border hover:border-gray-300 font-bold py-2">All Booking </Link>
       <Link to='/complete-booking' className="bg-gray-200 w-full text-center cursor-pointer  hover:border hover:border-gray-300 font-bold py-2">Complete Booking </Link>
       <Link to='/pending-booking' className="bg-gray-200 w-full text-center cursor-pointer  hover:border  hover:border-gray-300 font-bold py-2">Pending Booking </Link>
       <Link to='/cancel-booking' className="bg-gray-200 w-full text-center cursor-pointer border border-gray-300 hover:border hover:border-gray-300 font-bold py-2">Cancel Booking </Link>
       </div>
        <DataTable
          columns={columns}
          data={searchFilter}
          pagination
          highlightOnHover
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          fixedHeader
          fixedHeaderScrollHeight="70vh"
          customStyles={myStyle}
          subHeader
          subHeaderComponent={
            <div className="w-full flex justify-between items-center">
                <input
              type="text"
              placeholder="Search for id, driver name, user name & date-time"
              className="border px-2 rounded md:w-1/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => {
                navigate('/cancel-booking/datewise')
            }} className="border rounded px-2 ml-2 bg-gray-200 shadow-xl text-blue-800">Search Date-Wise</button>

            </div>
          }
          subHeaderAlign="left"
        />
      </div>
    </div>
  );
}

export default CancelBooking;
