import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DeleteUser from './DeleteUser'
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { BiBlock } from "react-icons/bi";
import { TbFileCheck } from "react-icons/tb";
const baseUrl = process.env.REACT_APP_API_URL;

const BlockedBooking = () => {
  const [driverList, setDriverList] = useState();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();

  const driverData = async () => {
    const response = await fetch(baseUrl + "api/v1/admin/providerBookingBlockList", {
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

  const ExpandedComponent = ({ data }) => (
    <table className="w-full">
      <tbody >
        <tr className="border w-full">
          <td className="font-semibold marExpend  py-2">Wallet Balance : &#8377; {data.driver?.walletBalance}</td>
          <td className="font-semibold marExpend px-3 py-2">Cash Balance : &#8377; {data.cashWallet?.driverCash ? data.cashWallet?.driverCash : '0'}</td>
          <td className="font-semibold marExpend px-3 py-2">Admin Cash : &#8377; {data.cashWallet?.adminCash ? parseFloat(data.cashWallet?.adminCash).toFixed(2) : '0'}</td>
          <td className="font-semibold marExpend px-3 py-2">Cash Booking : {data.cashWallet?.totalCashbooking ? data.cashWallet?.totalCashbooking : '0'}</td>        </tr>
      </tbody>
    </table>
  );

  // columns name as a header of table
  const columns = [
    {
      name: "Name",
      selector: (row) =>
        !row.driver?.name ? "---------------" : <div className="py-2">{row.driver?.name}</div>,
    },
    {
      name: "Mobile Number",
      selector: (row) => <div className="py-2">{row.driver?.mobileNumber}</div>,
    },
    {
      name: "Online/ Offline",
      selector: (row) =>
        row.driver?.online === true ? (
          <div className="text-green-500 p-1 font-semibold">Online</div>
        ) : (
          <div className="text-red-500 p-1 font-semibold">Offline</div>
        ),
    },
    {
      name: "Docs Upload",
      selector: (row) =>
        row.driver?.documentUpload === true ? (
          <div className="py-2 text-center text-green-500 font-bold">
            Yes
          </div>
        ) : (
          <div className="py-2 text-center text-red-500 font-bold">
            No
          </div>
        ),
    },
    {
      name: "Docs Status",
      selector: (row) =>
        row.driver?.documentVerified === "APPROVE" ? (
          <div className="py-2 text-green-500 font-bold">
            {row.driver?.documentVerified}
          </div>
        ) : (
          <div className="py-2 text-yellow-500 font-bold">
            {row.driver?.documentVerified}
          </div>
        ),
    },


    {
      name: "Check Docs",
      selector: (row) => (
        <button
          className="btn text-yellow-500 text-xl px-2 py-1"
          onClick={() => {
            const id = row.driver?._id;
            navigate("/docs/view/" + id);
          }}
        >
          <TbFileCheck />
        </button>
      ),
    },

    {
      name: "Booking Block",
      selector: (row) =>
        row.driver?.bookingBlock === true ? (
          <div className="flex items-center">
            <div className="text-red-500 font-bold">Yes</div>
            <button
              className="btn text-red-500 px-2 py-1 text-xl"
              onClick={() => bookingBlock(row.driver?._id)}
            >
              <BiBlock />
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="text-green-500 font-bold">No</div>
            <button
              className="btn text-green-500 px-2 py-1 text-xl"
              onClick={() => bookingBlock(row.driver?._id)}
            >
              <BiBlock />
            </button>
          </div>
        ),
    },

    {
      name: "Action",
      selector: (row) => (
        <div className="flex justi-between">
          <button
            className="btn text-blue-500 text-xl px-2 py-1"
            onClick={() => {
              const id = row.driver?._id;
              navigate("/driver/view/" + id);
            }}
          >
            <AiFillEye />
          </button>
          {
            row.driver?.status === "BLOCK" ? (
              <button
                className="btn text-red-500 px-2 py-1 text-xl"
                onClick={() => blockUser(row.driver?._id)}
              >
                <BiBlock />
              </button>
            ) : (
              <button
                className="btn text-green-500 px-2 py-1 text-xl"
                onClick={() => blockUser(row.driver?._id)}
              >
                <BiBlock />
              </button>
            )
          }
          <button
            className="btn text-xl px-2 py-1 text-red-500 shadow"
            onClick={() => {
              setPhone(row.driver?.mobileNumber)
              setName(row.driver?.name)
              setId(row.driver?._id)
              setIsOpen(true)
            }}
          >
            <RiDeleteBin5Line />
          </button>
        </div>
      ),
    },
  ];
  const formData = {
    _id: id
  }
  const deletUser = async () => {
    const url = baseUrl + "api/v1/admin/deleteUser";
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    if (json.responseCode === 200) {
      driverData();
    }
  };
  const blockUser = async (id) => {
    const url = baseUrl + "api/v1/admin/blockUnblockUser";
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ _id: id }),
    });
    driverData();
  };
  const bookingBlock = async (id) => {
    const url = baseUrl + "api/v1/admin/activeBlockBooking";
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ _id: id }),
    });
    driverData();
  };
  const myStyle = {
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        backgroundColor: "gray",
        color: "white",
        minWidth: "0.2rem",
      },
    },
    row: {
      style: {
        minWidth: '0.2rem'
      }
    }
  };

  useEffect(() => {
    driverData();
  }, []);

  useEffect(() => {
    const result = driverList?.filter((driver) => {
      return (
        driver?.driver?.documentVerified
          ?.toLocaleLowerCase()
          .match(search.toLocaleLowerCase()) ||
        driver.driver?.name?.toLowerCase().match(search.toLocaleLowerCase()) ||
        driver.driver?.mobileNumber?.toLowerCase().match(search.toLocaleLowerCase())
      );
    });

    setSearchFilter(result);
  }, [search]);
  return (
    <div className="px-5">
      <h1 className="text-xl font-bold py-2 ">Drivers List (Booking Blocked)</h1>
      <div className="flex items-center justify-center mt-3">
        <div className="w-full text-ellipsis overflow-hidden md:text-ellipsis md:overflow-hidden ">
          <DataTable
            columns={columns}
            data={searchFilter}
            pagination
            highlightOnHover
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            fixedHeader
            fixedHeaderScrollHeight="65vh"
            customStyles={myStyle}
            subHeader
            subHeaderComponent={
              <div className="flex w-full justify-between">


                <input
                  type="text"
                  placeholder="Search for Name, Mobile & Docs status"
                  className="border px-2 rounded md:w-1/3 w-10/12"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex">
                  <select onChange={(e) => {
                    setSearch(e.target.value)
                    localStorage.setItem('search', e.target.value)

                  }} name="" id="" className="px-3 bg-slate-600 rounded text-white shadow-xl" >
                    <option value="">Select</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVE">Approve</option>
                  </select>
                  <button onClick={() => {
                    navigate('/drivers')
                  }} className="px-3 ml-3 bg-slate-600 rounded text-white shadow-xl">Return</button>
                </div>
              </div>

            }
            subHeaderAlign="left"
          />
        </div>
        {isOpen && <DeleteUser setIsOpen={setIsOpen} id={id} deletUser={deletUser} name={name} phone={phone} />}
      </div>
    </div>
  );
};

export default BlockedBooking;
