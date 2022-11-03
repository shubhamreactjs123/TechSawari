import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DeleteUser from './DeleteUser'
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
const baseUrl = process.env.REACT_APP_API_URL;

const Static = () => {
  const [staticList, setStaticList] = useState();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState();

  const staticData = async () => {
    const response = await fetch(baseUrl + "api/v1/static/getstaticList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    if (json.responseCode === 200) {
      setStaticList(json.result);
    }
  };

  const ExpandedComponent = ({ data }) => (
    <table className="w-full">
      <tbody className="w-full">
        <tr>
          <td className="font-semibold marExpend  py-2">Description</td>
          <td className="px-3 py-2" dangerouslySetInnerHTML={{ __html: data.description }}></td>
        </tr>
      </tbody>
    </table>
  );
  const myStyle = {
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        backgroundColor: "gray",
        color: "white",
      },
    },
    row: {
      style: {
        overflow: "hidden",
        width: "80rem",
      },
    },
  };

  // columns name as a header of table
  const columns = [
    {
      name: "Type",
      selector: (row) => <div className="text-black-500 ">{row.Type}</div>,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Edit",
      selector: (row) => (
        <button
          className="btn text-cyan-600 px-2 py-1 text-xl"
          onClick={() => {
            const id = row._id;
            navigate("/static/edit/" + id);
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
          className="btn text-red-500 px-2 py-1 text-xl "
          onClick={() => {
            setName(row.title)
            setIsOpen(true)
          }}
        >
          <RiDeleteBin5Line />
        </button>
      ),
    },
  ];
  const formData = {
    title: name
  }
  const deletUser = async () => {
    const url = baseUrl + "api/v1/static/deleteStaticData";
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
      staticData();
    }
  };
  useEffect(() => {
    staticData();
  }, []);
  return (
    <div className="flex items-center justify-center">
      <div className="w-11/12 shadow-xl  text-ellipsis overflow-hidden md:text-ellipsis md:overflow-hidden">
        <h1 className="text-xl font-bold py-2">Static List</h1>
        <DataTable
          columns={columns}
          data={staticList}
          pagination
          actions={
            <Link to="/add-static">
              <button className="bg-blue-500 hover:bg-blue-900 px-3 py-1 rounded mr-5 text-sm font-bold text-white">
                Add
              </button>
            </Link>
          }
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          highlightOnHover
          dense
          fixedHeader
          fixedHeaderScrollHeight="75vh"
          customStyles={myStyle}
        />
      </div>
      {isOpen && <DeleteUser setIsOpen={setIsOpen} deletUser = {deletUser}  name={name}/>}
    </div>
  );
};

export default Static;
