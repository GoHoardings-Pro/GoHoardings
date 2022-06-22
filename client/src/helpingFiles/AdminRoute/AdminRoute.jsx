// import React from 'react'
// import { Navigate, Route, Outlet } from 'react-router-dom'
import { Validator } from './Validator';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
    const { isAuthenticate } = useSelector(state=> state.admin);

    const navigate = useNavigate();
    useEffect(()=>{
        isAuthenticate === true ?   navigate('/dashboard'):navigate('/login')

    })

    
    
   
}

export default AdminRoute