import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import person from './person.png'
const baseUrl = process.env.REACT_APP_API_URL;

function ViewUser(p) {
  const [userDtails, setUserDetails] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getUserData = () => {
    axios
      .get(baseUrl + `api/v1/admin/viewUser/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((resposne) => {
        if (resposne.status === 200) {
          setUserDetails(resposne.data.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center py-2 px-5">
        <h1 className="text-xl font-bold ">View User</h1>
        <button onClick={() => {
          navigate('/users')
        }} className="px-3 bg-black shadow-xl text-yellow-400 rounded-full">Back</button>
      </div>

      <div className=' flex justify-center items-center dashBoard'>

        <div className="bg-white shadow-xl w-11/12 md:w-2/4 p-2 rounded">
          {
            userDtails?.profilePic ? <div className='w-full flex justify-center items-center'><img src={userDtails?.profilePic} alt="image" width={150} height={150} className='imageuserDtails ' /> </div> : <div className='w-full flex justify-center items-center'><img src={person} alt="" width={100} className='imageuserDtails ' /></div>
          }
          <div className="w-full text-center mb-5 font-bold text-xl text-blue-800">{userDtails?.name}</div>
          <div className="grid grid-cols-2 w-full gap-4 bg-yellow-400 text-black rounded p-3">
            <div className='w-full font-semibold'>Mobile Number</div>
            <div className=' text-left text-gray-600'>{userDtails?.mobileNumber}</div>
            <div className='w-full font-semibold'>Gender</div>
            <div className=' text-left text-gray-600'>{userDtails?.gender}</div>
            <div className='w-full font-semibold'>Wallet Balence</div>
            <div className=' text-left text-gray-600'>{userDtails?.walletBalance}</div>
            <div className='w-full font-semibold'>Document Upload</div>
            <div className=' text-left text-gray-600'>{userDtails.documentUpload ? "Yes" : "No"}</div>
            <div className='w-full font-semibold'>Document Verified</div>
            <div className=' text-left text-gray-600'>{userDtails?.documentVerified}</div>
          </div>
        </div>

      </div>
    </>
  );
}

export default ViewUser;
