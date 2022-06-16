import React from 'react'
import { Navigate, Route, Outlet } from 'react-router-dom'
import { validator } from './validator';

const AdminRoute = ({children, ...rest}) => {
    var auth = validator();
    
    // return auth ? <Outlet />: <Navigate to="/login" />;
    return(
        <>
        <div>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis minima quam ex, voluptates hic vitae animi accusantium, quo quod laudantium placeat, quae quidem inventore culpa maiores est illum deserunt fugit.
            </div>
        </>
    )
}

export default AdminRoute