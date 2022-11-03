import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineSend } from 'react-icons/md'
import person from './person.png'
const baseUrl = process.env.REACT_APP_API_URL;

function ViewDriver(p) {
  const [driverDtails, setDriverDetails] = useState("");
  const [cashInfo, setCashinfo] = useState();
  const [submit, setSubmit] = useState('Submit');
  const [editHide, setEditHide] = useState('none');
  const [colAmountBtn, setColAmountBtn] = useState('block');
  const [backBtn, setBackBtn] = useState('none')
  const { id } = useParams();
  const [totalCashbooking, settotalCashbooking] = useState('');
  const [amountCollect, setamountCollect] = useState('');
  const [notificationInfo, setNotificationInfo] = useState();
  const [notificationHide, setNotificationHide] = useState('none');
  const [listHide, setListHide] = useState('');
  const [title, setTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [titleErr, setTitleErr] = useState('none')
  const [messageErr, setMessageErr] = useState('none')
  const [amountErr, setamountErr] = useState('none')
  const [bookingErr, setbookingErr] = useState('none')
  const [send, setSend] = useState('Send');
  const navigate = useNavigate();
  const ref = useRef(null);

  const getCash = () => {
    fetch(baseUrl + `api/v1/admin/adminDriverCash?userId=${id}`, {
      method: 'POST',
      headers: {
        token: localStorage.getItem('token')
      }
    }).then((respo) => respo.json())
      .then((data) => {
        if (data.responseCode === 200) {
          setCashinfo(data.result)
        }
      }).catch((error) => {
        console.log(error);
      })
  }
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
  const listNotification = () => {
    axios.get(baseUrl + `api/v1/admin/listNotification?userId=${id}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then((respo) => {
      if (respo.data.responseCode === 200) {
        setNotificationInfo(respo.data.result)
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    getDriverData();
    getCash();
    listNotification();
  }, []);

  const notificationData = {
    subject: title,
    body: notificationMessage
  }
  const sendNotification = () => {
    if (title === '') {
      setTitleErr('block')
    }else if (notificationMessage === '') {
      setMessageErr('block')
    }else {
      setSend('Please wait...')
      axios.post(baseUrl + `api/v1/admin/sendNotification?userId=${id}`, notificationData, {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then((respo) => {
        if (respo.data.responseCode === 200) {
          setSend('Notification Sent')
          listNotification();
  
          setTimeout(() => {
            setNotificationHide('none')
            setListHide('block')
            setSend('Send')
  
          }, 3000);
        } else {
          setSend('Server Error!')
          setTimeout(() => {
            setSend('Try Again!')
          }, 1000);
        }
      })
    }
   
  }
  const validTitle = () => {
    setTitleErr('none')
  }
  const validMessage = () => {
    setMessageErr('none')
  }
  const validAmount = () => {
    setamountErr('none')
  }
  const validBooking = () =>{
    setbookingErr('none')
  }

  const collectData = {
    amountCollect: amountCollect,
    totalCashbooking: totalCashbooking
  }
  const submitAmount = () => {
    if (amountCollect === '') {
      setamountErr('block')
    }else if (totalCashbooking === '') {
      setbookingErr('block')
    }else{
      setSubmit('Please wait...')
      axios.put(baseUrl + `api/v1/admin/editAdminDriverCash?userId=${id}`, collectData, {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then((respo) => {
        if (respo.data.responseCode === 200) {
          setSubmit('Collected')
          getDriverData();
          getCash();
          setTimeout(() => {
            setEditHide('none')
            setListHide('block')
          }, 2000);
        } else if (respo.data.responseCode === 400) {
          setSubmit('Insufficient Balance!')
          setTimeout(() => {
            setSubmit('Try Again!')
          }, 2000);
        }
      }).catch((error) => {
        console.log(error);
      })
    }
    
  }

  return (
    <>
      <div className="flex justify-between  py-2 px-5">
        <h1 className="text-xl font-bold ">View Driver</h1>
        <button onClick={() => {
          navigate('/drivers')
        }} className="px-3 bg-black shadow-xl text-yellow-400 rounded-full">Back</button>
      </div>
      <div className='w-full flex justify-center  '>
        <div className="bg-white shadow-xl w-11/12 md:w-3/4 p-2 rounded">

          {
            driverDtails?.profilePic ? <div className='w-full flex justify-center items-center'><img src={driverDtails?.profilePic} alt="image" width={150} className='imageuserDtails ' /> </div> : <div className='w-full flex justify-center items-center'><img src={person} alt="" width={100} className='imagedriverDtails ' /></div>
          }
          <div className="w-full text-center mb-5 font-bold text-xl text-blue-800">{driverDtails?.name}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-yellow-400">
            <div className="grid grid-cols-2 w-full gap-4  text-black rounded p-3">
              <div className='w-full font-semibold'>Mobile Number</div>
              <div className=' text-right'>{driverDtails?.mobileNumber}</div>
              <div className='w-full font-semibold'>Gender</div>
              <div className=' text-right'>{driverDtails?.gender}</div>
              <div className='w-full font-semibold'>Wallet Balance</div>
              <div className=' text-right'>&#8377; {driverDtails?.walletBalance}</div>
              <div className='w-full font-semibold'>Total Cash</div>
              <div className=' text-right'>&#8377; {cashInfo ? parseFloat(cashInfo?.totalCash).toFixed(2)  : '0'}</div>
              <div className='w-full font-semibold'>Driver Cash</div>
              <div className=' text-right'>&#8377; {cashInfo ? parseFloat(cashInfo?.driverCash).toFixed(2) : '0'}</div>
              <div className='w-full font-semibold'>Admin Cash</div>
              <div className=' text-right'>&#8377; {cashInfo ? parseFloat(cashInfo?.adminCash).toFixed(2) : '0'}</div>
              <div className='w-full font-semibold'>Total Cash Booking</div>
              <div className=' text-right'>{cashInfo ? cashInfo?.totalCashbooking : '0'}</div>
              <div className='w-full font-semibold'>Booking Block</div>
              <div className=' text-right'>{driverDtails?.bookingBlock === true ? 'Yes' : 'No'}</div>
              <div className='w-full font-semibold'>Document Upload</div>
              <div className=' text-right'>{driverDtails.documentUpload ? "Yes" : "No"}</div>
              <div className='w-full font-semibold'>Document Verified</div>
              <div className=' text-right'>{driverDtails?.documentVerified}</div>
            </div>
            <div>
              <div className="grid grid-cols-2 w-full gap-2  text-black rounded p-3">
                <div className='w-full font-semibold'>Notification</div>
                <div onClick={() => {
                  setListHide('none')
                  setNotificationHide('block')
                  setTitle('')
                  setNotificationMessage('')
                }} className='flex items-center text-white text-xl cursor-pointer' style={{ justifyContent: "right" }}><div className="hover:bg-blue-900 flex bg-blue-600 rounded-full px-2 py-1 shadow-xl cursor-pointer"><span className="px-2 text-sm font-semibold">Send</span> <MdOutlineSend className="text-right" /></div> </div>
              </div>
              {/* notification area */}
              <div className="p-2">
                <div className="bg-white shadow-xl rounded" style={{ display: notificationHide }} >
                  <div className=" text-center font-bold text-xl text-blue-800">Send Notification</div>
                  <div ref={ref} className="grid grid-cols-2 gap-2 px-5 py-5">
                    <label htmlFor="">Title</label>
                    <div>
                    <input
                      type='text'
                      placeholder="Enter title of notification"
                      value={title}
                      onKeyUp={validTitle}
                      onChange={(e) => setTitle(e.target.value)}
                      className="p-2 rounded bg-gray-300"
                    />
                    <span className="text-red-700 text-sm" style={{display: titleErr}}>Please enter title.</span>
                    </div>
                    <label htmlFor="">Message</label>
                    <div>
                    <input
                      type='text'
                      placeholder="Enter notification message"
                      value={notificationMessage}
                      onKeyUp={validMessage}
                      onChange={(e) => setNotificationMessage(e.target.value)}
                      className="p-2 rounded bg-gray-300"
                    />
                     <span className="text-red-700 text-sm px-2" style={{display: messageErr}}>Please enter message.</span>
                    </div>
                  </div>
                  <div className="flex px-5">
                    <button onClick={() => {
                      setNotificationHide('none')
                      setListHide('block')
                      setEditHide('none')
                    }} className="btn p-2 mr-3 rounded bg-red-600 my-3 font-bold cursor-pointer hover:bg-gray-200 ">Cancel</button>
                    <button onClick={sendNotification} className="btn p-2 rounded bg-yellow-400 my-3 font-bold cursor-pointer hover:bg-gray-200 ">{send}</button>
                  </div>
                </div>
              </div>
              <div className="px-3" style={{ display: listHide }} >
                {
                  notificationInfo?.slice(0, 3)?.map((item, index) => {
                    return (
                      <div key={index} className="grid grid-cols-1 gap-1 p-2 bg-white mb-2 shadow-xl rounded">
                        <div className="font-semibold">{item?.title}</div>
                        <div className="text-gray-400 font-semibold text-xs">{item?.date}</div>
                        <div className="text-gray-800 text-sm">{item?.body}</div>
                      </div>
                    )
                  })
                }

              </div>
              {/* end */}
              <div className="p-2">
                {
                  cashInfo?.totalCash > 0 ?
                    <div className="flex justify-between py-2">
                      <div style={{ display: colAmountBtn }} className="font-bold text-blue-800">Already Collected Amount</div>
                      <div onClick={() => {
                        setEditHide('block')
                        setNotificationHide('none')
                        setListHide('none')
                        setColAmountBtn('none')
                        setBackBtn('block')
                        ref.current?.scrollIntoView({ behavior: 'smooth' });

                      }} className="bg-blue-600 hover:bg-blue-900 rounded-full shadow-xl px-2 py-1 font-semibold cursor-pointer  text-white" style={{ display: colAmountBtn }}>Collect Now</div>
                      <button onClick={() => {
                        setEditHide('none')
                        setListHide('block')
                        setNotificationHide('none')
                        setColAmountBtn('block')
                        setBackBtn('none')

                      }} className="px-3 bg-black shadow-xl cursor-pointer text-yellow-400 rounded-full" style={{ display: backBtn }}>Back</button>
                    </div> : ''
                }

                <div className="bg-white shadow-xl rounded " style={{ display: editHide }} >
                  <div className=" text-center font-bold text-xl text-blue-800">Collect Cash</div>
                  <div ref={ref} className="grid grid-cols-2 gap-2 px-5 py-5">
                    <label htmlFor="">Collected Amount</label>
                    <div>
                    <input
                      type='number'
                      placeholder="Enter collected amount"
                      onKeyUp={validAmount}
                      onChange={(e) => setamountCollect(e.target.value)}
                      className="p-2 rounded bg-gray-300"
                    />
                    <span className="text-red-700 text-sm" style={{display: amountErr}}>Please enter amount.</span>
                    </div>
                    <label htmlFor="">Remaining Booking</label>
                    <div>
                    <input
                      type='number'
                      placeholder="Enter remaining booking"
                      onKeyUp={validBooking}
                      onChange={(e) => settotalCashbooking(e.target.value)}
                      className="p-2 rounded bg-gray-300"
                    />
                    <span className="text-red-700 text-sm" style={{display: bookingErr}}>Please enter remaining booking.</span>
                    </div>
                  </div>
                  <div className="text-right px-5">
                    <button onClick={submitAmount} className="btn p-2 rounded bg-yellow-400 my-3 font-bold cursor-pointer hover:bg-gray-200 ">{submit}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


      </div>

    </>
  );
}

export default ViewDriver;
