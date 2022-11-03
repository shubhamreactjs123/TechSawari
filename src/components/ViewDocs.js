import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {AiOutlineUser} from 'react-icons/ai'
import {HiOutlinePhone} from 'react-icons/hi'
const baseUrl = process.env.REACT_APP_API_URL;

function ViewDocs() {
  const [docsDetails, setDocsDetails] = useState([]);
  const [driverDtails, setDriverDetails] = useState();
  const { id } = useParams();
  const docStatus = useRef(null);
  const navigate = useNavigate();
  const [docs, setDocs] = useState({
    documentId: "",
    status: "",
  });

  const getDriverData = () => {
    axios
      .get(baseUrl + `api/v1/admin/viewUser/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((resposne) => {
        if (resposne.status === 200) {
          setDriverDetails(resposne.data.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const docsApprove = () => {
    axios
      .post(baseUrl + `api/v1/admin/checkDocument/${id}`, docs, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.responseCode === 200) {
          getDocsData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDocsData = () => {
    axios
      .get(baseUrl + `api/v1/admin/viewDocument/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((resposne) => {
        if (resposne.status === 200) {
          setDocsDetails(resposne.data.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getDocsData();
    getDriverData();
  }, []);

  return (
    <>
      <div className="scroll-smooth " >
        <div className="flex justify-between items-center w-full px-3">
        <div className="text-2xl font-semibold py-3">Document list</div>
        <button onClick={() => {
          navigate('/drivers')
        }} className="bg-black text-yellow-400 rounded-full px-3 shadow-xl">Back</button>
        </div>
        <div className="w-full px-3 bg-white py-3 shadow-xl">
          <div className="flex py-2">
            <div className="flex items-center font-semibold text-lg text-gray-500"><AiOutlineUser/> <div className="px-3">{driverDtails?.name}</div> </div>
            <div className="flex items-center px-5 font-semibold text-lg text-gray-500"><HiOutlinePhone/> <div className="px-3">{driverDtails?.mobileNumber}</div> </div>
          </div>
          <table className="table-auto th-px-5 w-full">
            <thead className="md:text-sm w-auto">
              <tr className=" mb-5">
                <th>Vehical Image</th>
                <th>Vehical Name</th>
                <th>Driving Licence</th>
                <th>Number Plate</th>
                <th>Vehical Rc</th>
                <th>Vehicle Insurance</th>
                <th>Status</th>
                <th>Check Documents</th>
              </tr>
            </thead>
            <tbody className="mt-3">
              {docsDetails?.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td className="text-center">
                        <a href={item.vehicalType.vehicalImage} target="_blank">
                          <img
                            src={item.vehicalType.vehicalImage}
                            height={10}
                            width={50}
                            className="inline"
                          />
                        </a>
                      </td>
                      <td className="text-center">{item.vehicalType.vehicalName}</td>
                      <td className="text-center">
                        <a href={item.drivingLicence} target="_blank">
                          <img
                            src={item.drivingLicence}
                            height={10}
                            width={50}
                            className="inline"
                          />
                        </a>
                      </td>
                      <td className="text-center">
                        <a href={item.numberPlate} target="_blank">
                          <img
                            src={item.numberPlate}
                            height={10}
                            width={50}
                            className="inline"
                          />
                        </a>
                      </td>
                      <td className="text-center">
                        <a href={item.vehicalRc} target="_blank">
                          <img
                            src={item.vehicalRc}
                            height={10}
                            width={50}
                            className="inline"
                          />
                        </a>
                      </td>
                      <td className="text-center">
                        <a href={item.vehicleInsurance} target="_blank">
                          <img
                            src={item.vehicleInsurance}
                            height={10}
                            width={50}
                            className="inline"
                          />
                        </a>
                      </td>
                      <td className="text-center">{item.verified}</td>
                      <td className="text-center">
                        <select
                          ref={docStatus}
                          className="px-5 border"
                          name="status"
                          onChange={(e) =>
                            setDocs({
                              documentId: item._id,
                              status: e.target.value,
                            })
                          }
                        >
                          <option value="0">Select:</option>
                          <option
                            value="APPROVE"
                            className="bg-green-500 text-white"
                          >
                            APPROVE
                          </option>
                          <option
                            value="REJECT"
                            className="bg-red-500 text-white"
                          >
                            REJECT
                          </option>
                        </select>
                        <button onClick={() => docsApprove()} className='border rounded px-3 ml-3 hover:bg-yellow-200 duration-1000'>Submit</button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ViewDocs;
