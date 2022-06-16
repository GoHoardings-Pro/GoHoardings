import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Modal from "react-modal"

const Dashboard = () => {
  const [posts, setPosts] = useState(false);
  const [modalisopen, setmodalisopen] = useState(false)
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [role, setrole] = useState("")

  const value =  localStorage.getItem("user")
  let data = JSON.parse(value)

  const updateUser = id => e => {
    e.preventDefault()
    axios.put("http://localhost:8080/auth/update/",{
      id: id,
      email : email,
      password : password,
      role: role
    }).then((res) => {})
  }

return (
  <div>
    {
      posts? <div className="m-5 p-5">
       <h6>ID : {data.id}</h6>
       <h6>Email : {data.email}</h6>
       <h6>Password : {data.password}</h6>
       <h6>Role : {data.role}</h6>
       <h6>Token : {data.token}</h6>
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
          <form onSubmit={updateUser(data.id)}>
                <div className="field">
                    <label className="label">Email</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder={data.email}
                        value={ data.email || " " }
                        onChange={ (e) => setemail(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <label className="label">Password</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder={data.password}
                        
                        onChange={ (e) => setpassword(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Role</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder={data.role}
                        
                        onChange={ (e) => setrole(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <button   className="button is-primary">Update</button>
                </div>
            </form> 
       <button  onClick={() => setmodalisopen(false)}>Close</button>

    
          </div>
         
       </Modal>
      </div>:null
    }
<center className="m-5 p-5">
<button  onClick={() => setPosts(!posts)}>View</button>
</center>
    
  </div>
 
  )
 }
export default Dashboard


