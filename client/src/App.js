import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
// import Dash from '../src/pages/authortication/dashboard'
import Media from '../src/pages/media_manage/Media_Inventory'
// import Cart from '../src/pages/vendor_manage/Cart'
import Go_Users from '../src/pages/Users/goUsers'
import Odo_Users from '../src/pages/Users/odoUsers'
import Sidebar from './Components/Navbar/Sidebar'
import Accept from '../src/pages/odoads_data_manage/accepteduser/Accept'
// import Rejected from '../src/pages/odoads_data_manage/rejecteduser/Rejected'
import AdminRoute from '../src/helpingFiles/AdminRoute/AdminRoute'
// import LogOut from "../src/pages/logout.js/logout"

import DashBoard from "./pages/DashBoard/DashBoard";
import Login from "./pages/authortication/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<AdminRoute />}></Route>
          <Route path="/dashboard" element={<DashBoard/>} ></Route>
          <Route path="/media" element={<Media />} ></Route>
          <Route path="/updateSync" element={<Accept />} ></Route>
          {/* <Route path="/rejectedSync" element={<Rejected />} ></Route> */}
          <Route path="/go_user" element={<Go_Users />} ></Route>
          <Route path="/odo_users" element={<Odo_Users />} ></Route>
          {/* <Route path="/cart" element={<Cart />} ></Route> */}
          {/* <Route path="*" element={<>Not Found</>} ></Route> */}
          {/* <Route path='/logout' element={<LogOut />}></Route> */}
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
