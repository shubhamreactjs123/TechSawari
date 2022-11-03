import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import car from './car.png'

const baseUrl = process.env.REACT_APP_API_URL;

function ViewVehical() {
  const [vehical, setVehical] = useState();
  const {id} = useParams();
  const navigate = useNavigate();
  const formData = {
    _id: id
  }
  const getVehical = () =>{
    axios.post(baseUrl + 'api/v1/user/viewVehical', formData, {
      headers:{
        token: localStorage.getItem('token')
      }
    }).then((respo) => {
      if (respo.data.responseCode === 200) {
        setVehical(respo.data.result)
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getVehical();
  },[])


  return (
    <>
      <div className="flex justify-between items-center py-2 px-5">
        <h1 className="text-xl font-bold ">View Vehical</h1>
        <button onClick={() => {
          navigate('/vehicals')
        }} className="px-3 bg-black shadow-xl text-yellow-400 rounded-full">Back</button>
      </div>
    <div className='dashBoard flex justify-center items-center'>
        <div className="bg-white shadow-xl w-11/12 md:w-2/4 p-2 rounded">
           {
            vehical?.vehicalImage ?  <div className='w-full flex justify-center items-center'><img src={vehical?.vehicalImage} alt="image" width={150} className='imageVehical ' /> </div> :  <div className='w-full flex justify-center items-center'><img src={car} alt="" width={100} className='imageVehical ' /></div>
           }
            <div className="w-full text-center mb-5 font-bold text-xl text-blue-800">{vehical?.vehicalName}</div>
            <div className="grid grid-cols-2 w-full gap-4 bg-yellow-400 text-black rounded p-3">
                <div className='w-full font-semibold'>Type</div>
                <div className=' text-right'>{vehical?.disCountType}</div>
            </div>
            <div className="grid grid-cols-2 w-full gap-4 bg-yellow-400 text-black rounded p-3">
                <div className='w-full font-semibold'>Tax</div>
                <div className=' text-right'>{vehical?.tax}</div>
            </div>
            <div className="grid grid-cols-2 w-full gap-4 bg-yellow-400 text-black rounded p-3">
                <div className='w-full font-semibold'>Commission</div>
                <div className=' text-right'>{vehical?.Commission}</div>
            </div>
            <div className="grid grid-cols-2 w-full gap-4 bg-yellow-400 text-black rounded p-3">
                <div className='w-full font-semibold'>Total Commission</div>
                <div className=' text-right'>{vehical?.totalCommission}</div>
            </div>
            {
              vehical?.disCountType === 'FLAT' ? '' : 
              <div className="grid grid-cols-2 w-full gap-4 bg-yellow-400 text-black rounded p-3">
                <div className='w-full font-semibold'>Driver Commission</div>
                <div className=' text-right'>{vehical?.driverCommission}</div>
              </div>
               }
        </div>
      
    </div>
    </>
  )
}

export default ViewVehical
