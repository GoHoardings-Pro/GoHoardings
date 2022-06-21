import React from 'react'
import { Navigate, Route, Outlet } from 'react-router-dom'
import { validator } from './validator';

const AdminRoute = ({children, ...rest}) => {
    var auth = validator();
    
    return auth ? <Outlet />: <Navigate to="/login" />;
   
}

export default AdminRoute