
//import useState hook to create menu collapse state
import React, { useState } from "react";


//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaUsers, FaUserTie, FaWalking, FaRupeeSign, FaMoneyBill, FaBars } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { GrTransaction, } from "react-icons/gr";
import { GiModernCity, } from "react-icons/gi";
import { AiFillHome, AiFillCar, AiOutlineAreaChart, AiFillSetting } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";


const SideBar = () => {
  const navigate = useNavigate();


  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false)


  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  return (
    <>
      <div id="header" className="static h-full">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse} className='h-full'>
          <SidebarHeader>
            <div className="logotext flex item-center justify-center">
              {/* small and big change using menucollapse state */}

              {menuCollapse ? <img width={60} src={require('./taxily-512.png')} alt="logo" className="cursor-pointer" onClick={() => navigate('/')} /> : <img width={80} src={require('./taxily-512.png')} alt="logo" className="cursor-pointer" onClick={() => navigate('/')}/>}
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                < FaBars />
              ) : (
                <FaBars />
              )}
            </div>
          </SidebarHeader>
          <SidebarContent className="bg-stone-700 h-screen">
            <Menu >
              <MenuItem id="dash" icon={<AiFillHome className="text-xl " />}>
                <Link to="/dashboard" className="">Dashboard</Link>
              </MenuItem>
              <MenuItem icon={<FaUsers className="text-xl" />}><Link to="/users">Users Management</Link></MenuItem>
              <MenuItem icon={<FaUserTie className="text-xl" />}><Link to="/drivers">Drivers Management</Link></MenuItem>
              <MenuItem icon={<AiFillCar className="text-xl" />}><Link to="/vehicals">Vehicals Management</Link></MenuItem>
              <MenuItem icon={<AiOutlineAreaChart className="text-xl" />}><Link to="/static">Static Management</Link></MenuItem>
              <MenuItem icon={<FaWalking className="text-xl" />}><Link to="/rides">Rides Management</Link></MenuItem>
              <MenuItem icon={<TbBrandBooking className="text-xl" />}><Link to="/booking">Booking Management</Link></MenuItem>
              <MenuItem icon={<FaRupeeSign className="text-xl" />}><Link to="/booking-payment">Booking Payment</Link></MenuItem>
              <MenuItem icon={<GrTransaction className="text-xl" />}><Link to="/transaction">Transaction Management</Link></MenuItem>
              <MenuItem icon={<FaMoneyBill className="text-xl" />}><Link to="/withdrawal">Withdrawal Management</Link></MenuItem>
              <MenuItem icon={<GiModernCity className="text-xl" />}><Link to="/state">State &#38; City</Link></MenuItem>
              <MenuItem icon={<AiFillSetting className="text-xl" />}><Link to="/setting">Setting</Link></MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </>
  );
};
export default SideBar;
