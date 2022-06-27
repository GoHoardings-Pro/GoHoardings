import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Go_Users from '../src/pages/Users/goUsers'
import Odo_Users from '../src/pages/Users/odoUsers'
import Accept from '../src/pages/odoads_data_manage/accepteduser/Accept'
import AdminRoute from '../src/helpingFiles/AdminRoute/AdminRoute'
import Media from "./pages/media_manage/Media";

// import Dash from '../src/pages/authortication/dashboard'
// import Cart from '../src/pages/vendor_manage/Cart'
// import Rejected from '../src/pages/odoads_data_manage/rejecteduser/Rejected'
// import LogOut from "../src/pages/logout.js/logout"

import DashBoard from "./pages/DashBoard/DashBoard";
import Login from "./pages/authortication/Login";
import UserProfile from "./Components/userProfile/UserProfile";
import Rejected from "./pages/odoads_data_manage/rejecteduser/Rejected";
import { useSelector } from "react-redux";
import { loadeUser } from "./action/adminAction";
import store from './store'
function App() {

  const { isAuthenticate, user} = useSelector(state => state.admin);

  React.useEffect(()=>{
    store.dispatch(loadeUser())
    console.log(isAuthenticate);
  },[])
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route exact path='/' element={<AdminRoute />}></Route> */}
          <Route path="/dashboard" element={<DashBoard/>} ></Route>
          <Route path="/updateSync" element={<Accept />} ></Route>
          <Route path="/dashboard/user" element={<UserProfile/>}></Route>
          <Route path="/dashboard/client" element={<Go_Users />} ></Route>
          <Route path="/dashboard/vanders" element={<Odo_Users />} ></Route>
          <Route path="/dashboard/accept" element={<Accept />} ></Route>
          <Route path="/dashboard/reject" element={<Rejected />} ></Route>
          <Route path="/dashboard/media" element={<Media />} ></Route>

          {/* <Route path="/rejectedSync" element={<Rejected />} ></Route> */}
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
