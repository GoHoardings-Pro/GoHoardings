import React, { useState} from 'react';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdOutlineMailOutline } from "react-icons/md";
import { BiLockOpenAlt } from "react-icons/bi";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { TiDeviceLaptop } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { BsArrowsFullscreen } from 'react-icons/bs'
import './login.css'
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../action/adminAction';
import { useEffect } from 'react';



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  
  const { loading , isAuthenticate } = useSelector( state => state.admin)

  
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(adminLogin(user))
  }
  useEffect(()=>{
    console.log(isAuthenticate);
    if( isAuthenticate === true){
      navigate('/dashboard')
    }else{
      navigate('/login')
    }
  },[isAuthenticate])




  return (
    <>
      <div className="nav-container">
        <nav className='admin-header'>
          <div className="nav-logo">
            <img src="/assests/logo.png" alt="" />
          </div>
          <div className="nav-items">
            <ul></ul>
            <ul><li className='nav-item'><BsArrowsFullscreen /></li></ul>
          </div>
        </nav>
      </div>
      <div className="container">
        <div className="row d-flex position-relative m-50 justify-content-center align-items-center  login_page">
          <div className="col-7 mx-auto">
            <div className="row">
              <div className="col-12 text-center mx-auto my-2">
                <h4>GOHOARDINGS ADMIN PANEL</h4>
              </div>
            </div>
            <div className="row d-flex border_top_red align-content-center justify-content-center  p-4 ">
              <div className="col-6  pb-5 ">
                <form onSubmit={submitHandler}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <div className="row input_border border mx-0 py-2">
                      <div className="col-2 d-flex justify-content-end align-Items-center">
                        <MdOutlineMailOutline className="icons_style" />
                      </div>
                      <div className="col-10">
                        <input
                          type="text"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          className="input_style px-0"
                          placeholder="Enter Email"
                          required
                          name='email'
                          onChange={changeHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <div className="row border mx-0 py-2">
                      <div className="col-2 d-flex justify-content-end  align-content-center">
                        <BiLockOpenAlt className="icons_style" />
                      </div>
                      <div className="col-10 d-flex ">
                        <input
                          type="password"
                          id="exampleInputPassword1"
                          className="input_style"
                          placeholder="Enter Password"
                          required
                          name='password'
                          onChange={changeHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <input type="submit" value={'submit'} />
                  {/* <button type="submit" id="sumbit" className="w-100 py-1 submit_button ">
                    Login
                  </button> */}
                </form>
                {/* <h3> {errorMessage}</h3> */}
              </div>
              <div className="col-6">
                <div className=" right_menu row d-flex justify-content-center align-content-center">
                  <div className="col-9 ">
                    <div className="row border">
                      <div className="col-2 login_icon1 d-flex justify-content-center align-items-center py-2 px-0">
                        <TiDeviceLaptop className=" z-10" />
                      </div>
                      <div className="col-10 px-0">
                        <button className=" login_button1 w-100  py-2">
                          Login With CRM
                        </button>
                      </div>
                    </div>
                    <div className="row border mt-2">
                      <div className="col-2 login_icon2 d-flex justify-content-center align-items-center py-2 px-0">
                        <AiOutlineGooglePlus />
                      </div>
                      <div className="col-10 px-0">
                        <button className="w-100 login_button2 py-2">
                          Login With Google+
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login
