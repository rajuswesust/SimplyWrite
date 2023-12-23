import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isLoggedIn } from '../auth';
const PrivateRoute = () => {
    return  isLoggedIn() ? <Outlet /> : <Navigate to={"/login"}  />
    // return (
    //     <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, quam.</h2>
    // );
}

export default PrivateRoute