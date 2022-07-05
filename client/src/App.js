import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Go_Users from '../src/pages/Users/goUsers'
import Odo_Users from '../src/pages/Users/odoUsers'
import Accept from '../src/pages/odoads_data_manage/accepteduser/Accept'
import AdminRoute from '../src/helpingFiles/AdminRoute/AdminRoute'
import Media from "./pages/media_manage/Media";
import DashBoard from "./pages/DashBoard/DashBoard";
import Login from "./pages/authortication/Login";
import UserProfile from "./Components/userProfile/UserProfile";
import Rejected from "./pages/odoads_data_manage/rejecteduser/Rejected";
import { loadeUser } from "./action/adminAction";
import store from './store'
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import ProtectRoute from "./Components/Route/ProtectRoute";

import "./App.css"

function App() {

  React.useEffect(() => {
    store.dispatch(loadeUser())
  }, [])


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<AdminRoute />}></Route>
          <Route path="/login"  element={<Login />}></Route>

          <Route path="/dashboard"  element={<ProtectRoute Component={DashBoard}/>}>   </Route>
          <Route path="/userProfile"  element={<ProtectRoute Component={UserProfile}/>}> </Route>
          <Route path="/client"  element={<ProtectRoute Component={Go_Users}/>}>    </Route>
          <Route path="/vanders" element={<ProtectRoute Component={Odo_Users}/>}>   </Route>
          <Route path="/accept"  element={<ProtectRoute Component={Accept}/>}>      </Route>
          <Route path="/reject"  element={<ProtectRoute Component={Rejected}/>}>    </Route>
          <Route path="/media"   element={<ProtectRoute Component={Media}/>}>       </Route>


          <Route path='*' element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
