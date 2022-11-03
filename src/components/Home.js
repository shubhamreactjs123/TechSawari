import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_URL;
  const [userDetails, setUserDetails] = useState("");

  const getUserData = () => {
    axios
      .get(baseUrl + "api/v1/admin/viewProfile", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((resposne) => {
        if (resposne.data.responseCode === 200) {
          setUserDetails(resposne.data.result);
        } else if (resposne.data.responseCode === 500) {
          navigate('/login')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    getUserData();
  }, []);
  return (
    <div className="flex w-full h-full">
      <div className="sidebar ">
        <SideBar />
      </div>
      <div className="w-screen page">
        <div className="nav">
          <NavBar name={userDetails?.name} image={userDetails?.profilePic} />
        </div>
        <Outlet className='outlet' />
      </div>
    </div>
  );
}
export default Home;