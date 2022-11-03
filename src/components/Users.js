import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DeleteUser from './DeleteUser'
import { useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { BiBlock } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TbArrowBarToLeft, TbArrowBarToRight } from "react-icons/tb";
const baseUrl = process.env.REACT_APP_API_URL;
const Users = () => {
  const [userList, setUserList] = useState();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [page, setPage] = useState(localStorage.getItem('page'));
  const [pages, setPages] = useState();
  const [limit, setLimit] = useState(localStorage.getItem('limit'));
  const userData = async (limit, page) => {
    const peginationData = {
      search: search,
      page: page,
      limit: limit
    }
    const response = await fetch(baseUrl + "api/v1/admin/userList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(peginationData),
    });
    const json = await response.json();
    if (json.responseCode === 200) {
      setUserList(json.result.docs);
      setPages(json.result.pages)
      setPage(json.result.page)
    }
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => (!row.name ? "User" : row.name),
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.mobileNumber,
    },
    {
      name: "Gender",
      selector: (row) => (!row.gende ? "----------" : row.gender),
    },
    {
      name: "Status",
      selector: (row) =>
        row.status === "DELETE" ? (
          <div className="text-red-500 font-semibold px-3 py-1">
            {row.status}
          </div>
        ) : (
          <div className="text-green-500 font-semibold px-3 py-1">
            {row.status}
          </div>
        ),
    },
    {
      name: "View",
      selector: (row) => (
        <button
          className="btn text-blue-500 px-2 py-1 text-xl"
          onClick={() => {
            const id = row._id;
            navigate("/user/view/" + id);
          }}
        >
          <AiFillEye />
        </button>
      ),
    },
    {
      name: "Delete",
      selector: (row) => (
        <button
          className="btn text-red-500 px-2 py-1 text-xl"
          onClick={() => {
            setPhone(row.mobileNumber)
            setName(row.name)
            setId(row._id)
            setIsOpen(true)
          }}
        >
          <RiDeleteBin5Line />
        </button>
      ),
    },
    {
      name: "Block/ Unblock",
      selector: (row) =>
        row.status === "BLOCK" ? (
          <button
            className="btn text-red-500 px-2 py-1 text-xl"
            onClick={() => blockUser(row._id)}
          >
            <BiBlock />
          </button>
        ) : (
          <button
            className="btn text-green-500 px-2 py-1 text-xl"
            onClick={() => blockUser(row._id)}
          >
            <BiBlock />
          </button>
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
    userData();
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
    userData();
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
    userData(limit, page);
  }, [search]);
  return (
    <>
      <h1 className="text-xl font-bold py-2 px-5">Users List</h1>
      <div className="flex items-center justify-center px-6 ">
        <div className="w-full shadow-xl bg-white mt-3">
          <DataTable
            columns={columns}
            data={userList}
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight="70vh"
            customStyles={myStyle}
            subHeader
            subHeaderComponent={

              <input
                type="text"
                placeholder="Search for Name &amp;   Mobile number"
                className="border px-2 rounded md:w-1/3 w-10/12 "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
            subHeaderAlign="left"
          />
          <div className="flex justify-between py-2 px-3 bg-gray-400">
            <div className="flex">
              <div className="pr-3">Rows</div>
              <select onChange={(e) => {
                setLimit(e.target.value)
                localStorage.setItem('limit', e.target.value)
                userData(e.target.value, page)
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
                    localStorage.setItem('page', 1)
                  }
                  userData(limit, 1)

                }
                } className='cursor-pointer'>

                  <TbArrowBarToLeft />
                </div>
                <div onClick={() => {
                  if (page > 1) {
                    setPage(page - 1)
                    localStorage.setItem('page', page - 1)
                  }
                  userData(limit, page - 1)

                }
                } className='cursor-pointer px-2'>

                  <MdOutlineKeyboardArrowLeft />
                </div>
                <div onClick={() => {
                  if (page <= pages) {
                    setPage(page + 1)
                    localStorage.setItem('page', page + 1)
                  }
                  userData(limit, page + 1)
                }
                } className='cursor-pointer'>

                  <MdOutlineKeyboardArrowRight />
                </div>
                <div onClick={() => {
                  if (page <= pages) {
                    setPage(pages)
                    localStorage.setItem('page', pages)
                  }
                  userData(limit, pages)
                }
                } className='cursor-pointer px-2'>

                  <TbArrowBarToRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <DeleteUser setIsOpen={setIsOpen} id={id} deletUser={deletUser} name={name} phone={phone} />}

    </>
  );
};

export default Users;
