import React from 'react'
import './drawer.css'
import { MdDashboard, MdOutlineRestaurantMenu } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { FaEdit, FaUserAlt } from 'react-icons/fa'
import { GrLogout } from 'react-icons/gr'
import { GiFoodTruck } from 'react-icons/gi'

function Drawer() {
  return (
    <>
    <nav className="sidebar">
        <div className="logo">Admin Panel</div>
        <div className="nav-links">
         <Link to={'/dash'}>  <a className='dash-box' href="#"><MdDashboard /> Dashboard</a></Link> 
            <Link to={"/add"}> <a className='dash-box' href="#"> <MdOutlineRestaurantMenu /> Add Food</a></Link>
            <Link to={"/editfood"}> <a className='dash-box' href="#"> <FaEdit /> Edit Food</a></Link>
            <Link to={"/userr"}> <a className='dash-box' href="#"> <FaUserAlt /> User</a></Link>
            <Link to={"/order"}> <a className='dash-box' href="#"> <GiFoodTruck /> Order Food</a></Link>
            <Link to={"/log"}> <a className='dash-box' href="#"> <GrLogout /> LogOut</a></Link>
            
        </div>
    </nav>
    </>
  )
}

export default Drawer