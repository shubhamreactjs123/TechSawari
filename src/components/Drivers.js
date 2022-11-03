import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DeleteUser from './DeleteUser'
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { BiBlock } from "react-icons/bi";
import { TbArrowBarToLeft, TbArrowBarToRight, TbFileCheck } from "react-icons/tb";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
const baseUrl = process.env.REACT_APP_API_URL;
const Drivers = () => {
  const [driverList, setDriverList] = useState();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [page, setPage] = useState(localStorage.getItem('dpage'));
  const [pages, setPages] = useState();
  const [limit, setLimit] = useState(localStorage.getItem('dlimit'));
  const driverData = async (limit, page) => {

    const paginationData = {
      search: search,
      page: page,
      limit: limit
    }
    const response = await fetch(baseUrl + "api/v1/admin/providerList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(paginationData),
    });
    const json = await response.json();
    if (json.responseCode === 200) {
      setDriverList(json.result);
      setPages(json.result.result.pages)
      setPage(json.result.result.page)
    }
  };
  const ExpandedComponent = ({ data }) => (
    <table className="w-full">
      <tbody >
        <div className="border w-full grid grid-cols-4 gap-5">
        

          <div className="font-semibold marExpend  py-2">Wallet Balance : &#8377; {data?.walletBalance}</div>
          <div className="font-semibold marExpend px-3 py-2">Cash Balance : &#8377; 
            {driverList?.data?.map((val, i)=>{
              return(
                <>
                {val.cashWallet?.userId === data?._id ? parseFloat(val?.cashWallet?.driverCash).toFixed(2): ""}
                </>
              )
            })}
          </div>
          <div className="font-semibold marExpend px-3 py-2">Admin Cash : &#8377;
          {driverList?.data?.map((val, i)=>{
              return(
                <>
                {val.cashWallet?.userId === data?._id ? parseFloat(val?.cashWallet?.adminCash).toFixed(2): ""}
                </>
              )
            })}</div>
          <div className="font-semibold marExpend px-3 py-2">Cash Booking : 
          {driverList?.data?.map((val, i)=>{
              return(
                <>
                {val.cashWallet?.userId === data?._id ? parseFloat(val?.cashWallet?.totalCashbooking).toFixed(2): ""}
                </>
              )
            })}</div>
        </div>
        <div className="border w-full grid grid-cols-7">
          <div className="px-3 py-2 marExpend">
            <div className="text-sm font-semibold">Vehical Image</div>
            {
              data?.documentId[data?.documentId?.length - 1]?.vehicalType?.vehicalImage ?
                <img src={data?.documentId[data?.documentId?.length - 1]?.vehicalType?.vehicalImage} alt="vehicalImage" className="w-20 h-20" /> : ''
            }
          </div>
          <div className="px-3 py-2 marExpend">
            <div className="text-sm font-semibold">Vehical Name</div>
            {
              data?.documentId[data?.documentId?.length - 1]?.vehicalType?.vehicalName
            }
          </div>
          <div className="px-3 py-2 marExpend">
            <div className="text-sm font-semibold">Licence</div>
            {
              data?.documentId[data?.documentId?.length - 1]?.drivingLicence ?
                <img src={data?.documentId[data?.documentId?.length - 1]?.drivingLicence} alt="DL" className="w-20 h-20" /> : ''
            }
          </div>
          <div className="px-3 py-2 marExpend">
            <div className="text-sm font-semibold">Number Plate</div>
            {
              data?.documentId[data?.documentId?.length - 1]?.numberPlate ?
                <img src={data?.documentId[data?.documentId?.length - 1]?.numberPlate} alt="Number Plate" className="w-20 h-20" /> : ''
            }
          </div>
          <div className="px-3 py-2 marExpend">
            <div className="text-sm font-semibold">RC</div>
            {
              data?.documentId[data?.documentId?.length - 1]?.vehicalRc ?
                <img src={data?.documentId[data?.documentId?.length - 1]?.vehicalRc} alt="RC" className="w-20 h-20" /> : ''
            }
          </div>
          <div className="px-3 py-2 marExpend">
            <div className="text-sm font-semibold">Insurance</div>
            {
              data?.documentId[data?.documentId?.length - 1]?.vehicleInsurance ?
                <img src={data?.documentId[data?.documentId?.length - 1]?.vehicleInsurance} alt="Insurance" className="w-20 h-20" /> : ''
            }
          </div>
          <td className="px-3 py-2 marExpend">
            <div className="text-sm font-semibold">Status</div>
            {
              data?.documentId[data?.documentId?.length - 1]?.verified
            }
          </td>
        </div>
      </tbody>
    </table>
  );

  // columns name as a header of table
  const columns = [
    {
      name: "Name",
      selector: (row) =>
        !row?.name ? "---------------" : <div className="py-2">{row?.name}</div>,
    },
    {
      name: "Mobile",
      selector: (row) => <div className="py-2">{row?.mobileNumber}</div>,
    },
    {
      name: "Online/ Offline",
      selector: (row) => row?.online === true ? (
        <div className="text-green-500 p-1 font-semibold">Online</div>
      ) : (
        <div className="text-red-500 p-1 font-semibold">Offline</div>
      ),

    },

    {
      name: "Docs Upload",
      selector: (row) =>
        row?.documentUpload === true ? (
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
        row?.documentVerified === "APPROVE" ? (
          <div className="py-2 text-green-500 font-bold">
            {row?.documentVerified}
          </div>
        ) : (
          <div className="py-2 text-yellow-500 font-bold">
            {row?.documentVerified}
          </div>
        ),
    },
    {
      name: "Check Docs",
      selector: (row) => (
        <button
          className="btn text-yellow-500 text-xl px-2 py-1"
          onClick={() => {
            const id = row?._id;
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
        row?.bookingBlock === true ? (
          <div className="flex items-center">
            <div className="text-red-500 font-bold">Yes</div>
            <button
              className="btn text-red-500 px-2 py-1 text-xl"
              onClick={() => bookingBlock(row?._id)}
            >
              <BiBlock />
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="text-green-500 font-bold">No</div>
            <button
              className="btn text-green-500 px-2 py-1 text-xl"
              onClick={() => bookingBlock(row?._id)}
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
              const id = row?._id;
              navigate("/driver/view/" + id);
            }}
          >
            <AiFillEye />
          </button>
          {
            row?.status === "BLOCK" ? (
              <button
                className="btn text-red-500 px-2 py-1 text-xl"
                onClick={() => blockUser(row?._id)}
              >
                <BiBlock />
              </button>
            ) : (
              <button
                className="btn text-green-500 px-2 py-1 text-xl"
                onClick={() => blockUser(row?._id)}
              >
                <BiBlock />
              </button>
            )
          }
          <button
            className="btn text-xl px-2 py-1 text-red-500 shadow"
            onClick={() => {
              setPhone(row?.mobileNumber)
              setName(row?.name)
              setId(row?._id)
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
        textAlign: "center"
      },
    },
    rows: {
      style: {
        minWidth: '0.2rem',
        textAlign: 'center'
      }
    }
  };
  useEffect(() => {
    driverData(limit, page);
  }, [search]);
  return (
    <div className="px-5">
      <div className="flex justify-between py-2">
        <h1 className="text-xl font-bold ">Drivers List</h1>

      </div>
      <div className="flex items-center justify-center mt-3">
        <div className="w-full text-ellipsis overflow-hidden md:text-ellipsis md:overflow-hidden ">
          <DataTable
            columns={columns}
            data={driverList?.result?.docs}
            highlightOnHover
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            fixedHeader
            fixedHeaderScrollHeight="70vh"
            customStyles={myStyle}
            subHeader
            subHeaderComponent={
              <div className="flex w-full justify-between">
                <input
                  type="text"
                  placeholder="Search for Name, Mobile &amp; Docs status"
                  className="border px-2 rounded md:w-1/3 w-10/12"
                  // defaultValue={searchlocal ? searchlocal : search}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex">
                  <select onChange={(e) => {
                    setSearch(e.target.value)
                    // localStorage.setItem('search', e.target.value)

                  }} name="" id="" className="px-3 bg-slate-600 rounded text-white shadow-xl" >
                    <option value="">Select</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVE">Approve</option>
                  </select>
                  <button onClick={() => {
                    navigate('/blocked-booking')
                  }} className="px-3 ml-3 bg-slate-600 rounded text-white shadow-xl">Blocked Booking</button>
                </div>

              </div>

            }
            subHeaderAlign="left"
          />
          <div className="flex justify-between py-2 px-3 bg-gray-400">
            <div className="flex">
              <div className="pr-3">Rows</div>
              <select onChange={(e) => {
                setLimit(e.target.value)
                localStorage.setItem('dlimit', e.target.value)
                driverData(e.target.value, page)
              }} name="page" className="bg-gray-400 text-gray-100" >
                <option value={limit}>{limit}</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="flex items-center">
              <div>{page + ' / ' + pages}</div>
              <div className="flex pl-3">
                <div onClick={() => {
                  if (page > 1) {
                    setPage(1)
                    localStorage.setItem('dpage', 1)
                  }
                  driverData(limit, 1)

                }
                } className='cursor-pointer'>

                  <TbArrowBarToLeft />
                </div>
                <div onClick={() => {
                  if (page > 1) {
                    setPage(page - 1)
                    localStorage.setItem('dpage', page - 1)
                  }
                  driverData(limit, page - 1)

                }
                } className='cursor-pointer px-2'>

                  <MdOutlineKeyboardArrowLeft />
                </div>
                <div onClick={() => {
                  if (page <= pages) {
                    setPage(page + 1)
                    localStorage.setItem('dpage', page + 1)
                  }
                  driverData(limit, page + 1)
                }
                } className='cursor-pointer'>

                  <MdOutlineKeyboardArrowRight />
                </div>
                <div onClick={() => {
                  if (page <= pages) {
                    setPage(pages)
                    localStorage.setItem('dpage', pages)
                  }
                  driverData(limit, pages)
                }
                } className='cursor-pointer px-2'>

                  <TbArrowBarToRight />
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpen && <DeleteUser setIsOpen={setIsOpen} id={id} deletUser={deletUser} name={name} phone={phone} />}
      </div>
    </div>
  );
};

export default Drivers;
