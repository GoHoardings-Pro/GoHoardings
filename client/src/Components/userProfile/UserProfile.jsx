import SideBar from '../Navbar/Sidebar'
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Modal from "react-modal"
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './UserProfile.css'
import { useRef } from 'react';

Modal.setAppElement('#root')

const UserProfile = () => {
  //   const [posts, setPosts] = useState(false);
  const [modalisopen, setmodalisopen] = useState(false)
  const [status, setstatus] = useState([])
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const [role, seterole] = useState();
  const [user, setUser] = useState({});

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }


  const { admin } = useSelector(state => state.admin);

  const updateuser = (...id) => {
    axios.post(`http://localhost:8080/auth/update/${id}`, {
      email: email,
      password: password,
      role: role
    }).then((response) => {
      console.log(response);
      setstatus(
        status.map((val) => {
          return val.id == id
            ? {
              id: val.id,
              email: val.email,
              password: val.password,
              role: val.role,
            }
            : val;
        })
      );
    }
    );
  };

  useEffect(() => {
    setUser(admin)
  }, [])
  console.log(user);

  const userRef = useRef(null);
  const settingRef = useRef(null);
  const permissionRef = useRef(null);
  const userButton = useRef(null);
  const settingButton =useRef(null);
  const permissionButton =useRef(null);


  const switchTab=(e, tab)=>{
    if(tab === 'user'){
      console.log('user');
      userButton.current.classList.add('navActive');
      settingButton.current.classList.remove('navActive');
      permissionButton.current.classList.remove('navActive');


      userRef.current.classList.remove('userProfileHidden')
      settingRef.current.classList.add('userProfileHidden')
      permissionRef.current.classList.add('userProfileHidden')
      
    }
    
    if(tab === 'setting'){
      console.log('setting');
      userButton.current.classList.remove('navActive');
      settingButton.current.classList.add('navActive');
      permissionButton.current.classList.remove('navActive');

      userRef.current.classList.add('userProfileHidden')
      settingRef.current.classList.remove('userProfileHidden')
      permissionRef.current.classList.add('userProfileHidden')

    }

    if(tab === 'permission'){
      console.log('permission');
      userButton.current.classList.remove('navActive');
      settingButton.current.classList.remove('navActive');
      permissionButton.current.classList.add('navActive');

      userRef.current.classList.add('userProfileHidden')
      settingRef.current.classList.add('userProfileHidden')
      permissionRef.current.classList.remove('userProfileHidden')
    }

  }

  const submitHandler = (e) =>{
          e.preventDefault();

  }
  return (
    <div className="containers">
      <div className="container-sidebar">
        <SideBar />
      </div>
      <div className="container-pages">
        <div className="page-title">
          <h4>User Info</h4>
        </div>
            <section className='page-container'>
              <div className="page-container-nav">
                <ul>
                  <li onClick={e=> switchTab(e,'user')} ref={userButton} className={"navActive"}><i class="fa-solid fa-bullhorn"></i> <br /> Personal Information</li>
                  <li onClick={e=> switchTab(e,'setting')} ref={settingButton}> <i class="fa-solid fa-gauge-high"></i> <br /> Account Settings</li>
                  <li onClick={e=> switchTab(e,'permission')} ref={permissionButton}> <i class="fa-solid fa-gauge-high"></i><br /> Permissions</li>
                </ul>
              </div>
              <form onSubmit={submitHandler} className="userProfileContainer" ref={userRef}>
                <div className="userProfileDetails">
                  <div>
                    <label htmlFor="name">Name :</label>
                    <input name='name' type="text" value={user.name} onChange={changeHandler} />
                  </div>
                  <div>
                    <label htmlFor="email">Email :</label>
                    <input name='email' type="email" value={user.email} onChange={changeHandler}/>
                  </div>
                  <div>
                    <label htmlFor="password">Password :</label>
                    <input name='password' type="password" value={user.password} onChange={changeHandler}/>
                  </div>
                  <div>
                    <label htmlFor="email">Role :</label>
                    <input name='role' type="text" value={user.role}  onChange={changeHandler}/>
                  </div>
                  <div>
                    <label htmlFor="email">Contect No :</label>
                    <input name='phone' type="number" value={user.phone} onChange={changeHandler}/>
                  </div>
                  <br />

                  <input type="submit" value={'Save'}/>
                  {/* <button onClick={() => setmodalisopen(true)}>Edit Profile</button> */}

                </div>
              </form>
              <form className="userProfileContainer userProfileHidden" ref={settingRef} >
                 <div className="userProfileDetails">
                  <div>
                    <label htmlFor="password">New_Password: </label>
                    <input name='password' type="password" value={user.password} onChange={changeHandler} />
                  </div>
                  <div>
                    <label htmlFor="password">Confirm_Password: </label>
                    <input name='password' type="password" value={user.password} onChange={changeHandler}/>
                  </div>
                 
                  <br />

                  <input type="submit" value={'Update Password'}/>
                  {/* <button onClick={() => setmodalisopen(true)}>Edit Profile</button> */}

                </div>
              </form>
              <form className="userProfileContainer userProfileHidden" ref={permissionRef}>
                <div className="userProfileDetails">
                  <div>
                    <label htmlFor="name">Name :</label>
                    <input name='name' type="text" value={user.name} onChange={changeHandler} />
                  </div>
                  <div>
                    <label htmlFor="email">Email :</label>
                    <input name='email' type="email" value={user.email} onChange={changeHandler}/>
                  </div>
                  <div>
                    <label htmlFor="password">Password :</label>
                    <input name='password' type="password" value={user.password} onChange={changeHandler}/>
                  </div>
                  <div>
                    <label htmlFor="email">Role :</label>
                    <input name='role' type="text" value={user.role}  onChange={changeHandler}/>
                  </div>
                  <div>
                    <label htmlFor="email">Contect No :</label>
                    <input name='phone' type="number" value={user.phone} onChange={changeHandler}/>
                  </div>
                  <br />

                  <input type="submit" value={'Save'}/>
                  {/* <button onClick={() => setmodalisopen(true)}>Edit Profile</button> */}

                </div>
              </form>
              {/* <Modal isOpen={modalisopen}
                shouldCloseOnOverlayClick={false}
                onRequestClose={() => setmodalisopen(false)}
              >
                <div className="form-group">
                  <div className="closeIcon" onClick={() => setmodalisopen(false)}><i className='fa-solid fa-xmark'></i></div>
                  <form onSubmit={updateuser} return="false">
                    <div className="field">
                      <input
                        className="input"
                        type="text"
                        placeholder="Email"
                        value={admin.id}
                        onChange={changeHandler}
                        hidden
                      />
                      <label className="label">Email</label>
                      <input
                        className="input"
                        type="text"
                        placeholder="Email"
                        name='email'
                        value={user.email}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <input
                        className="input"
                        type="text"
                        name='password'
                        placeholder="Password"
                        value={user.password}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="field">
                      <label className="label">Role</label>
                      <input
                        className="input"
                        type="text"
                        name='admin'
                        placeholder="Role"
                        value={user.role}
                        onChange={changeHandler}
                      />
                    </div>
                    <button type="show" onClick={updateuser(user.id)}>Update</button>
                  </form>

                </div>

              </Modal> */}
            </section >
    
           </div>
    </div>
  )
}

export default UserProfile



