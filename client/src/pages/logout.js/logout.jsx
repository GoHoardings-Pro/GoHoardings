import React from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    localStorage.clear('user');
    sessionStorage.clear()
    removeCookie('token');
    navigate('../');
   
  return (
    <div>logout</div>,
    <div>WKHRCUHRIWNGB</div>
  )
}

export default Logout