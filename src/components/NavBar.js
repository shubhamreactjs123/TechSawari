import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from 'react-router-dom';

function NavBar(props) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear("token");
    navigate('/login')
  }
  return (
    <>
      <div className="flex justify-between px-5 text-indigo-800 bg-yellow-400 py-2 font-semibold">
        <Link to='/admin-profile'><div className="flex navImageBack bg-white items-center px-3 rounded-full drop-shadow-lg cursor-pointer">
          <img className="w-6 my-1 h-6 navImage rounded-full" src={props.image} alt={<FontAwesomeIcon icon={faUser} className="my-2" />} />
          <div className="bg-white px-1 py-1 navName">{props.name}</div>
        </div></Link>
        <div className="flex w-auto pl-5">
          <div onClickCapture={logout} className="flex bg-white items-center px-3 drop-shadow-lg rounded-full mr-6 cursor-pointer">
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="" />
            <div className="bg-white px-1 rounded-full">Logout</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default NavBar;