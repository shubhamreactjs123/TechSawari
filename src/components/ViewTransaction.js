import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_URL;

function ViewTransaction() {
    const [transaction, settransaction] = useState();
    const {id} = useParams();
    const bookinComplete = () =>{
        axios.get(baseUrl + `api/v1/user/viewTransaction/${id}`)
        .then((respo) => {
              if (respo.data.responseCode === 200) {
                settransaction(respo.data.result)
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
        <div className="w-full text-center mb-5 font-bold text-xl text-blue-800">Transaction Details</div>
        <div className="grid grid-cols-2 w-full gap-4 bg-yellow-400 text-black rounded p-3">
            <div className='w-full font-semibold'>User name</div>
            <div className=' text-right'>{transaction?.userId?.name}</div>
            <div className='w-full font-semibold'>Date &#38; Time</div>
            <div className=' text-right'>{transaction?.dateTime}</div>
            <div className='w-full font-semibold'>Amount</div>
            <div className=' text-right'>{transaction?.amount}</div>
            <div className='w-full font-semibold'>Payment Type</div>
            <div className=' text-right'>{transaction?.transactionType}</div>
            <div className='w-full font-semibold'>Transaction</div>
            <div className=' text-right'>{transaction?.status}</div>
        </div>
    </div>
  
</div>
  )
}

export default ViewTransaction
