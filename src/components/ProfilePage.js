import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";

function ProfilePage(props) {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_URL;
  const [adminDtails, setAdminDetails] = useState("");
  const [adminCash, setAdminCash] = useState("");

  const getAdminData = () => {
    axios
      .get(baseUrl + "api/v1/admin/viewProfile", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((resposne) => {
        if (resposne.status === 200) {
          setAdminDetails(resposne.data.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAdminCash = () => {
    axios
      .get(baseUrl + "api/v1/admin/viewAdminCash", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((resposne) => {
        if (resposne.status === 200) {
          setAdminCash(resposne.data.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAdminData();
      getAdminCash();
    }
  }, []);

  return (
    <div className="">
      <div className="font-bold text-2xl p-5">Admin Profile</div>
      <div className="w-full h-full flex justify-center items-center">
        <div className=" bg-white rounded shadow-xl p-5 w-2/4  ">
          <div className="w-full p-5 relative">
            <Link to="/profile/edit">
              <FontAwesomeIcon
                icon={faPenSquare}
                className="absolute duration-500 hover:text-blue-800 text-blue-600 right-0 top-0 h-5 w-5 shadow-xl"
              />
            </Link>
          </div>
          <div className="w-full   items-center">
            <div className="">
            <div className="w-full flex justify-center py-5"><img
              src={adminDtails?.profilePic}
              alt="profile"
              className="w-40 h-40 rounded"
            /></div>
            <div className="bg-yellow-400 rounded p-3 w-full">
            <div className="grid grid-cols-2 gap-5">
              <div className="font-semibold text-left">Name</div>
              <div className="text-gray-600 text-left">{adminDtails?.name}</div>
              <div className="font-semibold text-left">Mobile Number</div>
              <div className="text-gray-600 text-left">{adminDtails?.countryCode + " " + adminDtails?.mobileNumber}</div>
              <div className="font-semibold text-left">Gender</div>
              <div className="text-gray-600 text-left">{!adminDtails?.gender ? "---------------" : adminDtails?.gender}</div>
              <div className="font-semibold text-left">Cash</div>
              <div className="text-gray-600 text-left">&#8377; {parseFloat(adminCash).toFixed(2)}</div>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;