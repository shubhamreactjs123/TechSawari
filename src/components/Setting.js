import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_API_URL;

function Setting() {
    const [oldPassword, setOldPassword] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [errorPass, setErrorPass] = useState('none');
    const [inputType, setInputType] = useState('password');
    const navigate = useNavigate();    
    const formData = {
        oldPassword: oldPassword,
        newPassword: password,
        confirmPassword: confirmPassword
    }
    const resetPassword = () =>{
        axios.put(baseUrl + 'api/v1/admin/changePassword', formData,{
            headers: {
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
            <div className="flex justify-between items-center  w-full py-5">
                <div className="text-3xl text-gray-600 px-5 font-semibold">Setting</div>
            </div>
            <div className='w-full flex justify-center '>
                <div className="bg-yellow-400 shadow-xl w-11/12 md:w-2/4 p-2 rounded">
                    <div className="w-full text-center mb-5 font-bold text-xl text-gray-600">Change Password</div>
                    <div className="p-3">
                        <div className="grid grid-cols-2 w-full gap-4  text-gray-800 ">
                            <label htmlFor="" className='font-semibold'>Old Password</label>
                            <input
                                type={inputType}
                                name='oldPassword'
                                placeholder='Old Password'
                                className='px-2 py-1 text-blue-800 rounded'
                                id='inPass'
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
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
                        <span className='text-red-500 text-sm text-center' style={{display: errorPass}}>Please check your old password or Password not matched!</span>
                        <div className="flex mx-5 justify-center text-gray-800 py-2"> <input onClick={() => {
                            if(inputType === 'text'){
                                setInputType('password');
                            }else{
                                setInputType('text')
                            }
                        }} type="checkBox" className='w-5 mr-5' />Show Password</div>
                        <button onClick={resetPassword} className='w-full bg-blue-900 py-1 rounded-full shadow-xl hover:bg-blue-600 text-gray-200 font-bold'>Save</button>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Setting
