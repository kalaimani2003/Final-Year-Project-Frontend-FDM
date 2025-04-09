import React from 'react'
import './forgot.css'
import { Link } from 'react-router-dom'

function ForgotPass() {
  return (
    <>
    <div className="bod">
    <div className="hero">
        <div className="hero-content">
            <h1 className='hhh'>Delicious Eats</h1>
            <p className='pa'>Discover amazing recipes and culinary experiences</p>
            <div className="btn-container">

                <Link to={"/admin"}><button className="btn btn-primary">Admin Login</button></Link>
                <Link to={"/user"}><button className="btn btn-secondary">User Login</button></Link>
               
            </div>
        </div></div>
    </div>
    </>
  )
}

export default ForgotPass

