import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DeleteUser from './DeleteUser'
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
const baseUrl = process.env.REACT_APP_API_URL;

const Vehicals = () => {
  const [vehicalList, setVehicalList] = useState();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState();

  const vehicalData = async () => {
    const response = await fetch(baseUrl + "api/v1/user/vehicalList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    if (json.responseCode === 200) {
      setVehicalList(json.result);
    }
  };
  // columns name as a header of table
  const columns = [
    {
      name: "Vehical Name",
      selector: (row) => row.vehicalName,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Vehical Image",
      selector: (row) => <img width={50} height={50} src={row.vehicalImage} />,
    },
    {
      name: "View",
      selector: (row) => (
        <button
          className="btn text-xl px-2 py-1 text-blue-600 shadow-xl"
          onClick={() => {
            let id = row._id;
            navigate("/view-vehical/" + id);
          }}
        >
          <AiFillEye />
        </button>
      ),
    },
    {
      name: "Edit",
      selector: (row) => (
        <button
          className="btn text-xl px-2 py-1 text-cyan-600 shadow-xl"
          onClick={() => {
            let id = row._id;
            navigate("/editvehical/" + id);
          }}
        >
          <BiEdit />
        </button>
      ),
    },
    {
      name: "Delete",
      selector: (row) => (
        <button
          className="btn text-xl px-2 py-1 text-red-500 shadow-xl"
          onClick={() => {
            setName(row.vehicalName)
            setId(row._id)
            setIsOpen(true)
          }}
        >
          <RiDeleteBin5Line />
        </button>
      ),
    },
  ];

  const formData = {
    _id: id
  }
  const deletUser = async () => {
    const url = baseUrl + "api/v1/admin/deleteVehicaltype";
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
      vehicalData();
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
    vehicalData();
   
  }, []);
  return (
    <div className="flex items-center justify-center">
      <div className="w-11/12 text-ellipsis overflow-hidden md:text-ellipsis md:overflow-hidden md:text-xs text-xl font-bold py-2 shadow-xl ">
        <h1 className="text-xl font-bold py-2">Vehicals List</h1>
        <DataTable
          columns={columns}
          data={vehicalList}
          pagination
          actions={
            <Link to="/add-vehical">
              <button className="bg-blue-500 hover:bg-blue-900 px-3 py-1 rounded mr-5 text-sm font-bold text-white">
                Add Vehical
              </button>
            </Link>
          }
          fixedHeader
          fixedHeaderScrollHeight="70vh"
          customStyles={myStyle}
          highlightOnHover
        />
      </div>
      {isOpen && <DeleteUser setIsOpen={setIsOpen} id = {id} deletUser = {deletUser}  name={name}/>}
    </div>
  );
};

export default Vehicals;
