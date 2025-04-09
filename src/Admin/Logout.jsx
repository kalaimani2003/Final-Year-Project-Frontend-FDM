import React from 'react'
import './logout.css'
import { GrLogout } from 'react-icons/gr'
import { Link } from 'react-router-dom'

function Logout() {
  return (
    <>
    <div className="body-wrap">
     <div className="logout-container">
     <u>   <h1 className='H'>Log Out</h1> </u>
        <p className='P'>Are you sure you want to log out?</p>
        <form action="/logout" method="POST">
          <Link to={'/'}>  <button type="submit" className="logout-button"> <GrLogout /> Log Out</button></Link>
           {/* <button type="submit" className="logout-button"> <GrLogout /> Log Out</button> */}
        </form>
    </div>
    </div>
    </>
  )
}

export default Logout