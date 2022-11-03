import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_API_URL;

function AddCommision() {
    const {
        handleSubmit
    } = useForm();

    const [tax, setTax] = useState('');
    const [commission, setCommission] = useState('');
    const [addBtn, setAddBtn] = useState('Add tax & Commission');
    const [blankErr, setBlankErr] = useState('none')

    const taxForm = {
        tax: tax,
        Commission: commission

    }
    const navigate = useNavigate();
    const addCommission = () => {
       
        setAddBtn('Please wait...')
        axios.post(baseUrl + 'api/v1/static/addCommission', taxForm, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((resp) => {
            if (resp.status === 200) {
                setAddBtn('Tax & commission added !')
                setTimeout(() => {
                    navigate('/commision')
                }, 2000);
            }
        })
    }

    return (
        <>
            <div className="flex items-center justify-between opacity-50 bg-slate-100 w-full p-3">
                <div className='text-3xl text-slate-900'>Tax &#38; Commission</div>
            </div>
            <div className='flex justify-center items-center' style={{ height: '80vh' }}>
                <div className='p-2 w-3/4 md:w-2/4 h-auto bg-slate-900 rounded shadow-xl'>
                    <div className="text-center text-xl text-slate-400 font-bold">Add Tax &#38; Commission</div>
                    <hr className="w-full px-3 h-1 my-2" />
                    <form onSubmit={handleSubmit(addCommission)}>
                        <div className="flex justify-between py-2">
                            <label htmlFor="" className='text-slate-300 py-2'>Tax</label>
                            <input
                                type="text"
                                className='bg-slate-700 text-slate-300 rounded px-3 w-3/4'
                                placeholder='Enter tax '
                                name='tax'
                                onChange={(e) => setTax(e.target.value)}
                                style={{border: '1px solid red'}} />
                        </div>
                        <div className="flex justify-between py-2">
                            <label htmlFor="" className='text-slate-300 py-2'>Commission</label>
                            <input
                                type="text"
                                className='bg-slate-700 text-slate-300 rounded px-3 w-3/4'
                                placeholder='Enter commission '
                                name='Commission'
                                onChange={(e) => setCommission(e.target.value)} />
                        </div>
                        <button className='text-slate-300 py-2 w-full bg-slate-700 rounded hover:bg-slate-800 mt-5'>{addBtn}</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddCommision