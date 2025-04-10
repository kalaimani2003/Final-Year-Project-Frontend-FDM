import React, { useState } from 'react'
import './drawer.css'
import { MdDashboard, MdOutlineRestaurantMenu } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import { FaEdit, FaUserAlt } from 'react-icons/fa'
import { GrLogout } from 'react-icons/gr'
import { GiFoodTruck } from 'react-icons/gi'

function Drawer() {
  const {pathname} = useLocation();  

  return (
    <>
      <nav className="sidebar">
        <div className="logo">Admin Panel</div>
        <div className="nav-links">
          <Link to={'/dash'} className={(pathname == "/dash")?"click-dash-box":""}>  <a href="#"><MdDashboard /> Dashboard</a></Link>
          <Link to={"/add"} className={(pathname == "/add")?"click-dash-box":""}> <a href="#"> <MdOutlineRestaurantMenu /> Add Food</a> </Link>
          <Link to={"/editfood"} className={(pathname == "/editfood")?"click-dash-box":""}> <a href="#"> <FaEdit /> Edit Food</a></Link>
          <Link to={"/userr"} className={(pathname == "/userr")?"click-dash-box":""}> <a href="#"> <FaUserAlt /> User</a></Link>
          <Link to={"/order"} className={(pathname == "/order")?"click-dash-box":""}> <a href="#"> <GiFoodTruck /> Order Food</a></Link>
          <Link to={"/log"} className={(pathname == "/log")?"click-dash-box":""}> <a href="#"> <GrLogout /> LogOut</a></Link>

        </div>
      </nav>
    </>
  )
}

export default Drawer