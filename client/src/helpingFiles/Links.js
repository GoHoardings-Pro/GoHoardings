import React from 'react'
import Dash from '../pages/authortication/dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Media from '../pages/media_manage/Media_Inventory'
import Cart from '../pages/vendor_manage/Cart'
import Go_Users from '../pages/Users/goUsers'
import Odo_Users from '../pages/Users/odoUsers'
import Sidebar from './Navbar/Sidebar'
import Accept from '../pages/odoads_data_manage/accepteduser/Accept'
import Rejected from '../pages/odoads_data_manage/rejecteduser/Rejected'
const Links = () => {
  return (
    <Router>
    <Sidebar>
      <Routes>
        <Route path="/media" element={<Media />} />
        <Route path="/dashboard" element={<Dash />} />
        <Route path="/updateSync" element={<Accept />} />
        <Route path="/rejectedSync" element={<Rejected />} />
        <Route path="/go_user" element={<Go_Users />} />
        <Route path="/odo_users" element={<Odo_Users />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="*" element={<>Not Found</>} />
      </Routes>
    </Sidebar>
  </Router>
  )
}

export default Links
