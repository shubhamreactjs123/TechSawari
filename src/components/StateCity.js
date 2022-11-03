import axios from 'axios';
import DeleteUser from './DeleteUser'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import {RiDeleteBin5Line} from 'react-icons/ri'
const baseUrl = process.env.REACT_APP_API_URL;

function StateCity() {
    const navigate = useNavigate();
    
    const addCity = () =>{
        navigate('/addcity')
    }
    const [selectCity, setSelectedCity] = useState();
    const [cityId, setCityId] = useState();
    const [stateId, setStateId] = useState();
    const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState();
    const selectedCityList = () =>{
      axios.get(baseUrl + 'api/v1/admin/selectedcityList')
      .then((response)=>{
        if (response.data.responseCode === 200) {
          setSelectedCity(response.data.result)
        }
      })
    }

    const deletUser = async() =>{
      await fetch(baseUrl + `api/v1/admin/removeSelectedCity?stateId=${stateId}&cityId=${cityId}`, {
        method:'PUT',
        headers: {
          token: localStorage.getItem('token')
        },
      })
      .then((resp)=>{
        if (resp.responseCode === 200) {
          selectedCityList();
        }
      })
    
    }
    useEffect(()=>{
      selectedCityList();
    },[])
    
  return (
    <>
    <div className="flex items-center justify-between  bg-slate-100 w-full p-3">
        <div className='text-3xl text-slate-900'>State &#38; City</div>
        <button onClick={addCity} className='bg-indigo-900 text-white py-1 px-3 rounded-full shadow-xl hover:bg-cyan-900'>Add City</button>
    </div>
    <table className='w-full'>
      <thead>
        <tr className='bg-slate-400'>
        <th className='text-left px-5 text-white py-3'>State</th>
        <th className='text-left px-5 text-white py-3'>City</th>
        </tr>
      </thead>
      <tbody>
        {selectCity?.map((item, index)=>{
          return(
            <tr key={index} className='bg-slate-300 text-cyan-900 border hover:bg-transparent duration-1000 '>
          <td className='px-3 py-3 text-left' >{item.stateName}</td>
          <td className='px-3 py-3 text-left '>
         <div className='city-box'>
         {
          item.city?.map((cty, i)=>{
            return(
              <div key={i} className='grid grid-cols-2 gap-2 hover:bg-slate-400 duration-1000'>
                <div className=''>{cty.cityName}</div>
                <div onClick={()=> {
                  setName(cty.cityName)
                  setCityId(cty._id)
                  setStateId(item.state)
                  setIsOpen(true)
                  
                }
                } name={cty._id} className='text-red-500 hover:text-red-800 duration-1000 text-xl cursor-pointer '><RiDeleteBin5Line/></div>
              </div>
            )
          })
         }
         </div>
          </td>
        </tr>
          )
        })  
        }
      </tbody>
    </table>
    {isOpen && <DeleteUser setIsOpen={setIsOpen} deletUser = {deletUser}  name={name}/>}
    </>
  )
}

export default StateCity