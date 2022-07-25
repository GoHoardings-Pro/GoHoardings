import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../../Components/Navbar/Sidebar";
import './Permission.css'
import { useRef } from "react";

const Permission = () => {
    const [roleList, setRoleList] = useState([]);
    const [newRole, setNewRole] = useState([]);
    const [permission, setPermission] = useState([]);
    const [user, setUser] = useState([]);
    const [hrole, setHrole] = useState('')

   
    const handleClick = (event) => {
        let data = [...permission];
        data.forEach((element) => {
            if (event.currentTarget.checked) {
                if (element.permission_id == event.currentTarget.id) {
                    element[event.currentTarget.value] = 1;
                    setPermission(data);
                    console.log(data);
                }
            } else {
                if (element.permission_id == event.currentTarget.id) {
                    element[event.currentTarget.value] = 0;
                    setPermission(data);
                }
            }
        });
    };


    const addrole = async (e) => {
        e.preventDefault();
        const { data } = await axios
            .post(`/api/v1/permission/createPermission`, {
                role: newRole,
            }).then(data)
    };

    async function changeFunc(e) {

        if(e === 'admin'){
            console.log("admin");
            const res = await axios.post(`/api/v1/permission/getPermissions`, {
                role:  'Admin'
            });
            setPermission(res.data)

            }else{

            const { data } = await axios.post(`/api/v1/permission/getPermissions`, {
                role: e.target.value
            });
            setPermission(data);
        }

    }

    let selectUser = []
    const handleUser = (e) => {
        selectUser.push(e.target.value)
    }

    async function getUsers(e) {
        const { data } = await axios.post(`/api/v1/permission/getUser`, {
            role: e.target.value,
        });
        setUser(data);
        setHrole(e.target.value)
    }
    const updateRole = async (e) => {
        const {data} = await axios.post(`/api/v1/permission/updateStaffPermission`, {
            permission: permission,
            role: hrole,
            user_id: selectUser
        })
    }

    const getRoles = async () => {
        const { data } = await axios.get(`/api/v1/staff/rolePermission`);
        setRoleList(data);
        console.log(data);
    };

    const setPer = async() =>{
        const { data } = await axios.get(`/api/v1/permission/makePermission`)
        setPermission(data);
        console.log(data);
    }

    useEffect(() => {
        getRoles();
        changeFunc('admin')
      
    }, []);


 const existRef = useRef(null);
 const newRef = useRef(null);

 const selectRole = useRef(null);
 const newRoleRef = useRef(null);


 const switchTab = (e,tab)=>{
     console.log(tab);

     if(tab === 'new'){
        selectRole.current.classList.add('userProfileHidden')
        newRoleRef.current.classList.remove('userProfileHidden')

        newRef.current.classList.add('navActive')
        existRef.current.classList.remove('navActive')
        // notPerm(e);
        // console.log(permission);
        // refreshPage()
       setPer();

        

     }

     if(tab === 'exist'){
        selectRole.current.classList.remove('userProfileHidden')
        newRoleRef.current.classList.add('userProfileHidden')

        newRef.current.classList.remove('navActive')
        existRef.current.classList.add('navActive')

        changeFunc('admin');

     }



 }


    return (

        <div className="containers">
            <div className="container-sidebar">
                <SideBar />
            </div>
            <div className="container-pages">
                <div className="page-title"><h2>Permission</h2></div>
                <div className="permissionFilters">
                    <div className="permissionFilter">
                        <div className="existUser navActive" ref={existRef} onClick={(e)=>switchTab(e,'exist')}>
                            <strong>Existance Role/Permission</strong>
                        </div>
                        <div className="newPermission " ref={newRef}  onClick={(e)=>switchTab(e,'new')}>
                            <strong>New Role/Permissin</strong>

                        </div>
                    </div>
                    <div className="permissionRole" ref={selectRole}>
                        Select Existance User From List
                        <select onChange={(e) => {
                            changeFunc(e);
                            getUsers(e);
                        }}>
                            {roleList.length > 0 && roleList.map((obj, i) => (
                                <option value={obj.role}>{obj.role}</option>
                            ))}
                        </select>
                    </div>
                    <div className="newRole userProfileHidden" ref={newRoleRef}>
                    <form onSubmit={addrole}>
                        <label htmlFor="">Role Name :</label>
                        <input className="input" type="text" name="text" placeholder="Create A NEW ROLE" onChange={(e) => setNewRole(e.target.value)} style={{width:'30%', border:'1px solid rgba(0,0,0,0.1)',padding:'10px'}}/>
                        {/* <input type="submit" text="sumbit" /> */}
                    </form>
                    </div>
                </div>


                <div>
                    <form onSubmit={updateRole}>
                    <table className="table table-boarder table-hover table-striped  table-sm">
                    <thead className="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Permissionid</th>
                                    <th>Can_View</th>
                                    <th>Can_View_Own</th>
                                    <th>Can_Edit</th>
                                    <th>Can_Create</th>
                                    <th>Can_Delete</th>
                                </tr>
                            </thead>
                            <tbody>

                                {permission.length>0 && permission.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.permission_id}</td>
                                        <td><input type="checkbox" id={item.permission_id} value="can_view" checked={item.can_view == 1 ? true : false} onChange={handleClick} /></td>
                                        <td><input type="checkbox" id={item.permission_id} value="can_view_own" checked={item.can_view_own == 1 ? true : false} onChange={handleClick} /></td>
                                        <td><input type="checkbox" id={item.permission_id} value="can_edit" checked={item.can_edit == 1 ? true : false} onChange={handleClick} /></td>
                                        <td><input type="checkbox" value="can_create" id={item.permission_id} checked={item.can_create == 1 ? true : false} onChange={handleClick} /> </td>
                                        <td><input type="checkbox" value="can_delete" id={item.permission_id} checked={item.can_delete == 1 ? true : false} onChange={handleClick} /></td>
                                    </tr>
                                ))}
                                <input type="submit" style={{padding:'10px', margin:'30px 0 0 0'}} />
                            </tbody>
                        </table>
                        <div>

                            {user.map((obj, i) => (
                                <>
                                    <label >{obj.email}</label>
                                    <input
                                        type="checkbox"
                                        value={obj.id}
                                        name={obj.id}
                                        onChange={handleUser}
                                    />
                                </>
                            ))}

                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Permission;