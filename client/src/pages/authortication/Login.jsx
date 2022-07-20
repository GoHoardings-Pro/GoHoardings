import React, { useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowsFullscreen } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../action/adminAction';

import './login.css'


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [checked, setChecked] = useState(false);
  
  const {isAuthenticated } = useSelector( state => state.admin)

  
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const { email, password} = user;
   
    if (checked === true && email !== "") {
      localStorage.email = email;
      localStorage.password = password;
      localStorage.checkbox = checked;
    }
    dispatch(adminLogin(user))
  }

  useEffect(()=>{
    if( isAuthenticated === true){
      navigate('/dashboard')
    }else{
      navigate('/login')
    }
    if (localStorage.checkbox && localStorage.email !== "") {
      setUser({
       email: localStorage.email,
        password: localStorage.password
      });
      setChecked(true)
    }
  },[isAuthenticated])

console.log(checked);
  return (
    <><div className="nav-container">
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
        <div className="box-form">
            <div className="left">
                <img src="/assests/pic.jpg" alt="" />
            </div>
            <form className="right" onSubmit={submitHandler}>
                <h5>Login</h5>
                <div className="inputs">
                    <div className="input">
                        <i className="fa-solid fa-user"></i><input name='email' type="email" value={user.email} onChange={changeHandler} placeholder="User Email"  required/>
                    </div><br />
                    <div className="input">
                        <i className="fa-solid fa-lock"></i> <input type="password" name='password' value={user.password} onChange={changeHandler} placeholder="password"  required/>
                    </div>
                </div>

                <div className="remember-me--forget-password">
                    <label>
                        <input type="checkbox" name="lsRememberMe"  checked={checked}   onChange={(e)=>setChecked(e.target.checked)}/>
                        <span className="text-checkbox">Remember me</span>
                    </label>
                    <p>Forget password?</p>
                </div>

                <br />
                {/* <br /><br /> */}
                {/* <hr /> */}
                <div className="social_icon">
                    <input id='sumitIcon' type="Submit" value={'Login'}/>
                     <span>
                        <Link to="#"><i className="fa fa-google" aria-hidden="true"></i></Link>
                        <Link to="#"><i className="fa fa-facebook" aria-hidden="true"></i></Link>
                    </span>
                </div>
            </form>

        </div>
    </>
)

  // return (
  //   <>
  //     <div className="nav-container">
  //       <nav className='admin-header'>
  //         <div className="nav-logo">
  //           <img src="/assests/logo.png" alt="" />
  //         </div>
  //         <div className="nav-items">
  //           <ul></ul>
  //           <ul><li className='nav-item'><BsArrowsFullscreen /></li></ul>
  //         </div>
  //       </nav>
  //     </div>
  //     <div className="container">
  //       <div className="row d-flex position-relative m-50 justify-content-center align-items-center  login_page">
  //         <div className="col-7 mx-auto">
  //           <div className="row">
  //             <div className="col-12 text-center mx-auto my-2">
  //               <h4>GOHOARDINGS ADMIN PANEL</h4>
  //             </div>
  //           </div>
  //           <div className="row d-flex border_top_red align-content-center justify-content-center  p-4 ">
  //             <div className="col-6  pb-5 ">
  //               <form onSubmit={submitHandler}>
  //                 <div className="mb-3">
  //                   <label htmlFor="exampleInputEmail1" className="form-label">
  //                     Email address
  //                   </label>
  //                   <div className="row input_border border mx-0 py-2">
  //                     <div className="col-2 d-flex justify-content-end align-Items-center">
  //                       <MdOutlineMailOutline className="icons_style" />
  //                     </div>
  //                     <div className="col-10">
  //                       <input
  //                         type="text"
  //                         id="exampleInputEmail1"
  //                         aria-describedby="emailHelp"
  //                         className="input_style px-0"
  //                         placeholder="Enter Email"
  //                         required
  //                         name='email'
  //                         onChange={changeHandler}
  //                       />
  //                     </div>
  //                   </div>
  //                 </div>
  //                 <div className="mb-3">
  //                   <label htmlFor="exampleInputPassword1" className="form-label">
  //                     Password
  //                   </label>
  //                   <div className="row border mx-0 py-2">
  //                     <div className="col-2 d-flex justify-content-end  align-content-center">
  //                       <BiLockOpenAlt className="icons_style" />
  //                     </div>
  //                     <div className="col-10 d-flex ">
  //                       <input
  //                         type="password"
  //                         id="exampleInputPassword1"
  //                         className="input_style"
  //                         placeholder="Enter Password"
  //                         required
  //                         name='password'
  //                         onChange={changeHandler}
  //                       />
  //                     </div>
  //                   </div>
  //                 </div>
  //                 <input type="submit" value={'submit'} />
  //                 {/* <button type="submit" id="sumbit" className="w-100 py-1 submit_button ">
  //                   Login
  //                 </button> */}
  //               </form>
  //               {/* <h3> {errorMessage}</h3> */}
  //             </div>
  //             <div className="col-6">
  //               <div className=" right_menu row d-flex justify-content-center align-content-center">
  //                 <div className="col-9 ">
  //                   <div className="row border">
  //                     <div className="col-2 login_icon1 d-flex justify-content-center align-items-center py-2 px-0">
  //                       <TiDeviceLaptop className=" z-10" />
  //                     </div>
  //                     <div className="col-10 px-0">
  //                       <button className=" login_button1 w-100  py-2">
  //                         Login With CRM
  //                       </button>
  //                     </div>
  //                   </div>
  //                   <div className="row border mt-2">
  //                     <div className="col-2 login_icon2 d-flex justify-content-center align-items-center py-2 px-0">
  //                       <AiOutlineGooglePlus />
  //                     </div>
  //                     <div className="col-10 px-0">
  //                       <button className="w-100 login_button2 py-2">
  //                         Login With Google+
  //                       </button>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}

export default Login
