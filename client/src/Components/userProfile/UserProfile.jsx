import SideBar from '../Navbar/Sidebar'
import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Modal from "react-modal"
import {  useParams}  from 'react-router-dom';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root')
const UserProfile = () => {
//   const [posts, setPosts] = useState(false);
  const [modalisopen, setmodalisopen] = useState(false)
  const [status, setstatus] = useState([])
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const [role, seterole] = useState()


  const { admin } = useSelector( state => state.admin);

  console.log(admin);

//   const value =  localStorage.getItem("user")
//   let admin = JSON.parse(value);
 
  const updateuser = (...id) => {
      axios.post(`http://localhost:8080/auth/update/${id}`, {
         email: email,
         password : password,
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


  return (
    <div className="containers">
    <div className="container-sidebar">
        <SideBar />
    </div>
    <div className="container-pages">
        <div className="page-title">
            <h4>User Info</h4>
        </div>
        <div>
{
 <div className="m-5 p-5">
       {/* <h6>ID : {admin.id}</h6> */}
       <h6>Email : {admin.email}</h6>
       <h6>Password : {admin.password}</h6>
       <h6>Role : {admin.role}</h6>
       {/* <h6>Token : {admin.token}</h6> */}
       <button onClick={() => setmodalisopen(true)}>Edit Profile</button> 
       <Modal isOpen={modalisopen} 
       shouldCloseOnOverlayClick={false} 
       onRequestClose={() => setmodalisopen(false)}
        style={{
          overlay: {
            background : 'gray'
          },
          content: {
            color: 'green'
          }
        }}>
          <div className="form-group">
          {/* <form onSubmit={updateuser} return="false"> */}
                <div className="field">
                    <input 
                        className="input"
                        type="text"
                        placeholder="Email"
                        value={ admin.id  }
                        hidden
                    />
                    <label className="label">Email</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Email"
                        // value={ admin.email  }
                        onChange={(e) => setemail(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Password"
                        // value={ admin.password }
                        onChange={(e) => setpassword(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Role</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Role"
                        // value={admin.roll}
                        onChange={(e) => seterole(e.target.value) }
                    />
                </div>
                {/* <button type="show" onClick={updateuser(admin.id)}>Update</button> */}
        {/* </form> */}
       <button  onClick={() => setmodalisopen(false)}>Close</button>

             </div>
         
       </Modal>
      </div>
    }

<center className="m-5 p-5">
{/* <button  onClick={() => setPosts(!posts)}>View</button> */}
</center>

  </div>
    </div>
</div>
  )
}

export default UserProfile




  




// return (
//   
 
//   )
//  }
// export default Dashboard