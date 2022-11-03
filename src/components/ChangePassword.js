import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from './taxily-512.png'
const baseUrl = process.env.REACT_APP_API_URL;

function ChangePasword() {
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [errorPass, setErrorPass] = useState('none');
    const [inputType, setInputType] = useState('password');
    const navigate = useNavigate();

    const formData = {
        password: password,
        confirmPassword: confirmPassword
    }
    const resetPassword = () =>{
        axios.put(baseUrl + 'api/v1/admin/resetPassword', formData,{
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then((respo) => {
           if (respo.data.responseCode === 200) {
            localStorage.clear("token");
            navigate('/login')
           }else{
            setErrorPass('block')
           }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className='dashBoard'>
            
            <div className='w-full h-full flex justify-center items-center'>
                <div className='w-11/12 md:w-1/4'>
                <div className="full flex justify-center"><img src={logo} alt=""  className='w-40 text-center'/></div>
                <div className="bg-yellow-400 shadow-xl  p-2 rounded">
                    <div className="w-full text-center mb-5 font-bold text-xl text-gray-600">Reset Password</div>
                    <div className="p-3 ">
                        <div className="grid grid-cols-2 w-full gap-4  text-gray-800 ">
                            <label htmlFor="" className='font-semibold'>New Password</label>
                            <input
                                type={inputType}
                                name='password'
                                placeholder='New Password'
                                className='px-2 py-1 text-blue-800 rounded'
                                id='inPass'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="" className='font-semibold'>Confirm Password</label>
                            <input
                                type={inputType}
                                name='password'
                                placeholder='Confirm Password'
                                className='px-2 py-1 text-blue-800 rounded'
                                id='inPass'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <span className='text-red-500 text-sm' style={{display: errorPass}}>Password not matched!</span>
                        <div className="flex mx-5 justify-center text-gray-600 py-2"> <input onClick={() => {
                            if(inputType === 'text'){
                                setInputType('password');
                            }else{
                                setInputType('text')
                            }
                        }} type="checkBox" className='w-5 mr-5' />Show Password</div>
                        <button onClick={resetPassword} className='w-full bg-blue-800 py-1 rounded-full shadow-xl hover:bg-blue-600 text-gray-200 font-bold'>Save</button>
                    </div>
                </div>
                </div>

            </div>

        </div>
    )
}

export default ChangePasword
