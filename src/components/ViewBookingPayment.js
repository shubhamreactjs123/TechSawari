import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_URL;

function ViewBookingPayment() {
    const [booking, setBooking] = useState();
    const {id} = useParams();
    const formData = {
      _id: id
    }
    const bookinComplete = () =>{
        axios.post(baseUrl + 'api/v1/admin/bookingDetails', formData,{
          headers:{
            token: localStorage.getItem('token')
          }
        })
        .then((respo) => {
              if (respo.data.responseCode === 200) {
                setBooking(respo.data.result)
              }
        }).catch((error) =>{
            console.log(error);
        })
    }
    useEffect(() => {
        bookinComplete();
    },[])
  return (
    <div className='w-full h-full flex justify-center items-center dashBoard'>
    <div className="bg-white shadow-xl w-11/12 md:w-2/4 p-2 rounded">
        <div className="w-full text-center mb-5 font-bold text-xl text-blue-800">Complete Booking Details</div>
        <div className="grid grid-cols-2 gap-4 bg-gray-400 py-2 my-2 px-3">
        <div className='w-full font-semibold'>Description</div>
        <div className='text-white text-left'>{booking?.bookingDetails?.description}</div>
        </div>
        <div className="grid grid-cols-2 w-full gap-4 bg-yellow-400 text-black rounded p-3">
        <div className='w-full font-semibold'>User name</div>
            <div className=' text-left'>{booking?.bookingDetails?.userId?.name}</div>
            <div className='w-full font-semibold'>Driver name</div>
            <div className=' text-left'>{booking?.bookingDetails?.drivers?.name}</div>
            <div className='w-full font-semibold'>Vehical name</div>
            <div className=' text-left'>{booking?.vehicalDetails?.vehicalType?.vehicalName}</div>
            <div className='w-full font-semibold'>Date &#38; Time</div>
            <div className=' text-left'>{booking?.bookingDetails?.dateTime}</div>
            <div className='w-full font-semibold'>Amount</div>
            <div className=' text-left'>{booking?.bookingDetails?.amount}</div>
            <div className='w-full font-semibold'>Payment </div>
            <div className=' text-left'>{booking?.bookingDetails?.paymentStatus}</div>
            <div className='w-full font-semibold'>Booking  </div>
            <div className=' text-left'>{booking?.bookingDetails?.bookingStatus}</div>
            <div className='w-full font-semibold'>Start Location</div>
            <div className=' text-left'>{booking?.bookingDetails?.startLocation}</div>
            <div className='w-full font-semibold'>End Location</div>
            <div className=' text-left'>{booking?.bookingDetails?.endLocation}</div>
        </div>
    </div>
  
</div>
  )
}

export default ViewBookingPayment
