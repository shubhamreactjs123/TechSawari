import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
const baseUrl = process.env.REACT_APP_API_URL;

const Rides = () => {
  const [rideList, setRideList] = useState();
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState([]);

  const ridesData = async () => {
    const response = await fetch(baseUrl + "api/v1/admin/ridelListforAdmin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    if (json.responseCode === 200) {
      setRideList(json.result);
      setSearchFilter(json.result);
    }
  };

  const ExpandedComponent = ({ data }) => (
    <table className="w-full">
     <tbody >
       <tr className="border w-full">
         <td className="font-semibold marExpend  py-2">Start Location</td>
         <td className="px-3 py-2">{data?.startLocation}</td>
       </tr>
       <tr className="border w-full">
         <td className="font-semibold marExpend px-3 py-2">End Location</td>
         <td className="px-3 py-2">{data?.endLocation}</td>
       </tr>
       <tr className="border w-full">
         <td className="font-semibold marExpend px-3 py-2">Description</td>
         <td className="px-3 py-2">{data?.description}</td>
       </tr>
     </tbody>
    </table>
   );
 
  // columns name as a header of table
  const columns = [
    {
      name: "User Name",
      selector: (row) => (
        <div>
          {row?.userId === null || !row?.userId?.name || row?.userId === ""
            ? "------------"
            : row?.userId?.name}
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => <div>{row?.auctionStaus}</div>,
    },
    {
      name: "Vehical Name",
      selector: (row) =>
        row?.vehicalType === null ? (
          "Not available"
        ) : (
          <div>{row?.vehicalType?.vehicalName}</div>
        ),
    },
    {
      name: "Vehical Image",
      selector: (row) =>
        row?.vehicalType === null ? (
          "Not available"
        ) : (
          <img width={50} src={row?.vehicalType?.vehicalImage} />
        ),
    },
    {
      name: "Date & Time",
      selector: (row) => <div>{row.dateTime}</div>,
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
    ridesData();
  }, []);
  useEffect(() => {
    const result = rideList?.filter((ride) => {
      return (
        ride?.vehicalType?.vehicalName?.toLowerCase().match(search.toLocaleLowerCase()) ||
        ride?.userId?.name?.toLowerCase().match(search.toLocaleLowerCase())
      );
    });
    setSearchFilter(result);
  }, [search]);
  return (
    <div className="flex items-center justify-center">
      <div className="w-11/12 shadow-xl">
        <h1 className="text-xl font-bold py-2 scroll-auto">Rides List</h1>
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
            <input
              type="text"
              placeholder="Search for Vehical name & user name"
              className="border px-2 rounded w-10/12 md:w-1/3"
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
export default Rides;