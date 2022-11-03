import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
const baseUrl = process.env.REACT_APP_API_URL;
function BookingPayment() {
  const [bookingPaymentList, setBookingPaymentList] = useState();
  const [search, setSearch] = useState();
  const [searchFilter, setSearchFilter] = useState();
  const bookingPaymentData = async () => {
    const response = await fetch(
      baseUrl + "api/v1/admin/bookingPaymentforAdmin",
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
      setBookingPaymentList(json.result);
      setSearchFilter(json.result);
    }
  };

  const ExpandedComponent = ({ data }) => (
    <table className="w-full">
     <tbody >
       <tr className="border w-full">
         <td className="font-semibold marExpend  py-2">Start Location</td>
         <td className="px-3 py-2">{data?.bookingId?.startLocation}</td>
       </tr>
       <tr className="border w-full">
         <td className="font-semibold marExpend px-3 py-2">End Location</td>
         <td className="px-3 py-2">{data?.bookingId?.endLocation}</td>
       </tr>
       <tr className="border w-full">
         <td className="font-semibold marExpend px-3 py-2">Description</td>
         <td className="px-3 py-2">{data?.bookingId?.description}</td>
       </tr>
     </tbody>
    </table>
   );
  // columns name as a header of table
  const columns = [
    {
      name: "Booking Id",
      selector: (row) => row.id,
    },
    {
      name: "User Name",
      selector: (row) => row.user.name,
    },
    {
      name: "Driver Name",
      selector: (row) =>
        row.driverId === null ? "Not Available" : row.driverId.name,
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
      name: "Payment Mode",
      selector: (row) => row.paymentMode,
    },
    {
      name: "Transaction Status",
      selector: (row) => row.transactionStatus,
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
    bookingPaymentData();
  }, []);

  useEffect(() => {
    const result = bookingPaymentList?.filter((bookingPayment) => {
      return(
        bookingPayment.user?.name?.toLowerCase().match(search?.toLocaleLowerCase()) ||
        bookingPayment.driverId?.name?.toLowerCase().match(search?.toLocaleLowerCase()) ||
        bookingPayment.id?.toLowerCase().match(search?.toLocaleLowerCase())
      );
    });
    setSearchFilter(result);
  }, [search])
  return (
    <div className="flex items-center justify-center">
      <div className="w-11/12 ">
        <h1 className="text-xl font-bold py-2">Booking Payment List</h1>
        <DataTable
          columns={columns}
          data={searchFilter}
          pagination
          fixedHeader
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          fixedHeaderScrollHeight="70vh"
          customStyles={myStyle}
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
            type='text'
            placeholder="Search for id, driver name & user name "
            className="border px-2 rounded md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}            
            />
          }
          subHeaderAlign='left'
        />
      </div>
    </div>
  );
}

export default BookingPayment;
