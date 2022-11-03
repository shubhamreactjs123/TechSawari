import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserTie,
  faCar,
  faWalking,
  faLaptop
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const baseUrl = process.env.REACT_APP_API_URL;
function Dashboard() {
  const [dashboard, setDashboard] = useState({});
  const [driver, setDriver] = useState();
  const [user, setUser] = useState();
  const [booking, setBooking] = useState();
  const [bookingComplete, setBookingComplete] = useState();
  const [cancelBooking, setCancelBooking] = useState();
  const [transaction, setTransaction] = useState();
  const [vehical, setVehical] = useState();
  const navigate = useNavigate();
  const getDashboard = async () => {
    axios
      .get(baseUrl + "api/v1/admin/dashboard", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setDashboard(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const formData = {
    search: 'APPROVE'
  }
  const getDriver = () => {
    axios.post(baseUrl + "api/v1/admin/providerList", formData, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then((respo) => {
      if (respo.data.responseCode === 200) {
        setDriver(respo.data.result.result.docs)
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  const getUser = async () => {
    const response = await fetch(baseUrl + "api/v1/admin/userList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    if (json.responseCode === 200) {
      setUser(json.result.docs);
    }
  };

  const getBookingComplete = async () => {
    const response = await fetch(baseUrl + "api/v1/admin/completeBookinglistforAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
   
    if (json.responseCode === 200) {
      setBookingComplete(json.result.docs);
    }
  };

  // pending booking list
  const getBooking = async () => {
    const response = await fetch(baseUrl + "api/v1/admin/pendingBookinglistforAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    });
    const json = await response.json();

    if (json.responseCode === 200) {
      setBooking(json.result.docs);
    }
  };
 
// Cancel booking list
const getCancelBooking = async () => {
  const response = await fetch(baseUrl + "api/v1/admin/cancelBookinglistforAdmin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify(),
  });
  const json = await response.json();

  if (json.responseCode === 200) {
    setCancelBooking(json.result.docs);
  }
}; 

  const getTransaction = () => {
    axios.get(baseUrl + "api/v1/admin/transactionListforAdmin", {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then((respo) => {
 
      if (respo.data.responseCode === 200) {
        setTransaction(respo.data.result)

      }
    }).catch((error) => {
      console.log(error);
    })
  }
  const getVehical = () =>{
    axios.post(baseUrl + '/api/v1/user/vehicalList')
    .then((respo) => {
      if (respo.data.responseCode === 200) {
        setVehical(respo.data.result)
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getVehical();
      getTransaction();
      getBookingComplete();
      getBooking();
      getCancelBooking();
      getUser();
      getDriver();
      getDashboard();
 
     setInterval(() => {
      getVehical();
      getTransaction();
      getBookingComplete();
      getBooking();
      getCancelBooking();
      getUser();
      getDriver();
      getDashboard();
      
     }, 60000);
 
  }, []);
  return (
    <div className="dashBoard">
      <div className="grid px-2 md:grid-cols-4 md:gap-2 xs:grid-cols-1 gap-4 py-10 justify-items-center">
        <div onClick={() => {
          navigate('/users')
        }} className="card w-full cursor-pointer hover:bg-indigo-700 duration-1000 text-right sm:px-6 flex bg-indigo-400 items-center justify-between ">
          <FontAwesomeIcon
            icon={faUsers}
            className="text-3xl text-indigo-600 "
          />
          <div>
            <div className=" text-3xl  text-white font-semibold">
              {dashboard.totalUsers}
            </div>
            <div className="text-white text-2xl">Total Users</div>
          </div>
        </div>
        <div onClick={() => {
          navigate('/drivers')
        }} className="card w-full cursor-pointer hover:bg-cyan-700 duration-1000 text-right sm:px-6 flex bg-cyan-400 items-center justify-between ">
          <FontAwesomeIcon
            icon={faUserTie}
            className="text-3xl text-cyan-600 "
          />
          <div>
            <div className=" text-3xl  text-white font-semibold">
              {dashboard.totalDrivers}
            </div>
            <div className="text-white text-2xl">Total Drivers</div>
          </div>
        </div>
        <div onClick={() => {
          navigate('/vehicals')
        }} className="card w-full cursor-pointer hover:bg-orange-700 duration-1000 text-right sm:px-6 flex bg-orange-400 items-center justify-between ">
          <FontAwesomeIcon
            icon={faCar}
            className="text-3xl text-orange-600 " />
          <div>
            <div className=" text-3xl  text-white font-semibold">
              {dashboard.totalVehicals}
            </div>
            <div className="text-white text-2xl">Total Vehicals</div>
          </div>
        </div>
        <div onClick={() => {
          navigate('/rides')
        }} className="card w-full cursor-pointer hover:bg-violet-700 duration-1000 text-right sm:px-6 flex bg-violet-500 items-center justify-between ">
          <FontAwesomeIcon
            icon={faWalking}
            className="text-3xl text-violet-800 "
          />
          <div>
            <div className=" text-3xl  text-white font-semibold">
              {dashboard.totalRides}
            </div>
            <div className="text-white text-2xl">Total Rides</div>
          </div>
        </div>
        <div onClick={() => {
          navigate('/booking')
        }} className="card w-full cursor-pointer hover:bg-blue-700 duration-1000 text-right sm:px-6 flex bg-blue-500 items-center justify-between ">
          <FontAwesomeIcon
            icon={faLaptop}
            className="text-3xl text-blue-800 "
          />
          <div>
            <div className=" text-3xl  text-white font-semibold">
              {dashboard.totalBooking}
            </div>
            <div className="text-white text-2xl">Total Booking</div>
          </div>
        </div>
        <div onClick={() => {
          navigate('/complete-booking')
        }} className="card w-full cursor-pointer hover:bg-green-700 duration-1000 text-right sm:px-6 flex bg-green-500 items-center justify-between ">
          <FontAwesomeIcon
            icon={faLaptop}
            className="text-3xl text-green-800 "
          />
          <div>
            <div className=" text-3xl  text-white font-semibold">
              {dashboard.completeBooking}
            </div>
            <div className="text-white text-2xl">Total Complete Booking</div>
          </div>
        </div>
        <div onClick={() => {
          navigate('/pending-booking')
        }} className="card w-full cursor-pointer hover:bg-yellow-700 duration-1000 text-right sm:px-6 flex bg-yellow-500 items-center justify-between ">
          <FontAwesomeIcon
            icon={faLaptop}
            className="text-3xl text-yellow-800 "
          />
          <div>
            <div className=" text-3xl  text-white font-semibold">
              {dashboard.pendingBooking}
            </div>
            <div className="text-white text-2xl">Total Pending Booking</div>
          </div>
        </div>
        <div onClick={() => {
          navigate('/cancel-booking')
        }} className="card w-full cursor-pointer hover:bg-red-700 duration-1000 text-right sm:px-6 flex bg-red-500 items-center justify-between ">
          <FontAwesomeIcon
            icon={faLaptop}
            className="text-3xl text-red-800 "
          />
          <div>
            <div className=" text-3xl  text-white font-semibold">
              {dashboard.cancelBooking}
            </div>
            <div className="text-white text-2xl">Total Cancel Booking</div>
          </div>
        </div>
       
      </div>
      {/* Booking section */}
      <div className="text-center text-xl font-bold text-gray-600">Today's Total Booking Count</div>
      <div className="grid px-2 md:grid-cols-4 md:gap-2 xs:grid-cols-1 gap-4 py-10 justify-items-center">
      <div onClick={() => {
          navigate('/booking')
        }} className="card w-full cursor-pointer hover:bg-gray-100 duration-1000 text-right sm:px-6 flex bg-white-500 items-center justify-between ">
          <FontAwesomeIcon
            icon={faLaptop}
            className="text-3xl text-indigo-800 "
          />
          <div>
            <div className=" text-3xl  text-indigo-800 font-semibold">
              { dashboard?.totaltodayBooking}
            </div>
            <div className="text-indigo-800 text-2xl">Total</div>
          </div>
        </div>
      <div onClick={() => {
          navigate('/complete-booking')
        }} className="card w-full cursor-pointer hover:bg-gray-100 duration-1000 text-right sm:px-6 flex bg-white-500 items-center justify-between ">
          <FontAwesomeIcon
            icon={faLaptop}
            className="text-3xl text-green-800 "
          />
          <div>
            <div className=" text-3xl  text-green-800 font-semibold">
              { dashboard?.totalCompleteBooking}
            </div>
            <div className="text-green-800 text-2xl">Complete </div>
          </div>
        </div>
        <div onClick={() => {
          navigate('/pending-booking')
        }} className="card w-full cursor-pointer hover:bg-gray-100 duration-1000 text-right sm:px-6 flex bg-white-500 items-center justify-between ">
          <FontAwesomeIcon
            icon={faLaptop}
            className="text-3xl text-orange-600 "
          />
          <div>
            <div className=" text-3xl  text-orange-600 font-semibold">
            { dashboard?.totalPendingBooking}
            </div>
            <div className="text-orange-600 text-2xl">Pending </div>
          </div>
        </div>
        <div onClick={() => {
          navigate('/cancel-booking')
        }} className="card w-full cursor-pointer hover:bg-gray-100 duration-1000 text-right sm:px-6 flex bg-white-500 items-center justify-between ">
          <FontAwesomeIcon
            icon={faLaptop}
            className="text-3xl text-red-800 "
          />
          <div>
            <div className=" text-3xl  text-red-800 font-semibold">
            { dashboard?.totalCancelBooking}
            </div>
            <div className="text-red-800 text-2xl">Cancel </div>
          </div>
        </div>
       
      </div>
      <div className="text-center text-xl font-bold pb-10 text-gray-600">Recent Updated Data (Last 4)</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full px-2 justify-items-center">
        <div className="w-full text-center bg-white shadow-xl">
          <div className="text-green-800 text-xl py-2 font-bold w-full bg-white  ">Complete Booking</div>
          <table className="w-full  text-left bg-white">
            <thead>
              <tr className="bg-green-300 text-green-700">
                <th className="py-2 px-2">User Name</th>
                <th className="py-2 px-2">Driver Name</th>
                <th className="py-2 px-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {
                bookingComplete?.slice(0, 4)?.map((item) => {
                  return (
                    <tr onClick={() => {
                      const id = item._id;
                      navigate("/view-complete-booking/" + id);
                    }} className="hover:bg-green-200 border border-green-300 text-green-600 duration-1000 cursor-pointer">
                      <td className="py-2 px-2">{item?.userId?.name}</td>
                      <td className="py-2 px-2">{item?.drivers?.name}</td>
                      <td className="py-2 px-2 font-semibold">&#8377; {item?.amount}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div className="w-full text-center bg-white shadow-xl">
          <div className="text-orange-600 text-xl py-2 font-bold w-full bg-white  ">Pending Booking</div>
          <table className="w-full  text-left bg-white ">
            <thead>
              <tr className="bg-orange-300 text-orange-700">
                <th className="py-2 px-2">User Name</th>
                <th className="py-2 px-2">Driver Name</th>
              </tr>
            </thead>
            <tbody>
              {
                booking?.slice(0, 4)?.map((item) => {
                  return (
                    <tr onClick={() => {
                      const id = item._id;
                      navigate("/view-booking-details/" + id);
                    }} className="hover:bg-orange-200 border text-orange-600 border-orange-300 duration-1000 cursor-pointer">
                      <td className="py-2 px-2">{item?.userId?.name}</td>
                      <td className="py-2 px-2">{item?.drivers?.name}</td>

                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div className="w-full text-center bg-white shadow-xl">
          <div className="text-red-800 text-xl py-2 font-bold w-full bg-white  ">Cancel Booking</div>
          <table className="w-full  text-left bg-white ">
            <thead>
              <tr className="bg-red-300 text-red-700">
                <th className="py-2 px-2">User Name</th>
                <th className="py-2 px-2">Driver Name</th>
              </tr>
            </thead>
            <tbody>
              {
                cancelBooking?.slice(0, 4)?.map((item) => {
                  return (
                    <tr onClick={() => {
                      const id = item._id;
                      navigate("/view-booking-details/" + id);
                    }} className="hover:bg-red-200 bordertext-red-600 border-red-300 duration-1000 cursor-pointer">
                      <td className="py-2 px-2">{item?.userId?.name}</td>
                      <td className="py-2 px-2">{item?.drivers?.name}</td>

                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div className="w-full text-center bg-white shadow-xl">
          <div className="text-blue-800 text-xl py-2 font-bold w-full bg-white  "> Approved Drivers</div>
          <table className="w-full  text-left bg-white ">
            <thead>
              <tr className="bg-blue-300 text-blue-700 ">
                <th className="py-2 px-2">Driver Name</th>
                <th className="py-2 px-2">Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {
                driver?.slice(driver?.length - 4, driver?.length)?.map((item) => {
                  return (
                    <tr onClick={() => {
                      const id = item?._id;
                      navigate("/driver/view/" + id);
                    }}  className="hover:bg-blue-200 border text-blue-600 border-blue-300 duration-1000 cursor-pointer">
                      <td className="py-2 px-2">{item?.name}</td>
                      <td className="py-2 px-2">{item?.mobileNumber}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div className="w-full text-center bg-white shadow-xl">
          <div className="text-indigo-800 text-xl py-2 font-bold w-full bg-white  "> Users</div>
          <table className="w-full  text-left bg-white ">
            <thead>
              <tr className="bg-indigo-300 text-indigo-700">
                <th className="py-2 px-2">User Name</th>
                <th className="py-2 px-2">Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {
                user?.slice(user?.length - 4, user?.length)?.map((item) => {
                  return (
                    <tr  onClick={() => {
                      const id = item?._id;
                      navigate("/user/view/" + id);
                    }} className="hover:bg-indigo-200 border text-indigo-600 border-indigo-300 duration-1000 cursor-pointer">
                      <td className="py-2 px-2">{item?.name}</td>
                      <td className="py-2 px-2">{item?.mobileNumber}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div className="w-full text-center bg-white shadow-xl">
          <div className="text-green-800 text-xl py-2 font-bold w-full bg-white  "> Transactions</div>
          <table className="w-full  text-left bg-white ">
            <thead>
              <tr className="bg-green-300 text-green-700">
                <th className="py-2 px-2">User Name</th>
                <th className="py-2 px-2">Amount</th>
                <th className="py-2 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {
                transaction?.slice(transaction?.length - 4, transaction?.length)?.map((item) => {
                  return (
                    <tr onClick={() => {
                      const id = item?._id;
                      navigate("/view-transaction/" + id);
                    }} className="hover:bg-green-200 border text-green-600 border-green-300 duration-1000 cursor-pointer">
                      <td className="py-2 px-2">{item?.userId?.name}</td>
                      <td className="py-2 px-2 font-bold">&#8377; {item?.amount}</td>
                      <td className="py-2 px-2 font-semibold">{item?.status}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div className="w-full text-center bg-white shadow-xl">
          <div className="text-gray-800 text-xl py-2 font-bold w-full bg-white  "> Vehicals</div>
          <table className="w-full  text-left bg-white ">
            <thead>
              <tr className="bg-gray-300 text-gray-700">
                <th className="py-2 px-2">Vehical name</th>
                <th className="py-2 px-2">Vehical Image</th>
              </tr>
            </thead>
            <tbody>
              {
                vehical?.slice(0, 4)?.map((item) => {
                  return (
                    <tr onClick={() => {
                      let id = item?._id
                      navigate('/view-vehical/' + id)
                    }} className="hover:bg-gray-200 border border-gray-300 duration-1000 cursor-pointer">
                      <td className="py-2 px-2">{item?.vehicalName}</td>
                      <td className="py-2 px-2 font-bold"><img src={item?.vehicalImage} alt="image"  width={50}/></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;