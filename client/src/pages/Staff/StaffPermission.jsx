import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Permission.css'
import axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { Pagination, Result } from "antd";
import SideBar from "../../Components/Navbar/Sidebar";
Modal.setAppElement("#root");

const StaffPermission = () => {
    const [roleList, setRoleList] = useState([]);
    const [posts, setPosts] = useState([]);
    const [modalisopen, setmodalisopen] = useState(false);
    const [edit, setedit] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [mess, setMess] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [permission, setPermission] = useState([]);
    const [query, setQuery] = useState("");
    const [total, setTotal] = useState([]);
    const [page, setPage] = useState(1);
    const [postPerpage, setPostPerPage] = useState(10);




    const changehandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // make a new user
    const addStaff = async () => {
        const { data } = await axios.post("/api/v1/staff/list", {
            email: email,
            password: password,
            role: role,
        });
        if (data == true) {
            setMess(data.message);
        } else {
            setMess(data.message);
        }
    };

    // functin for hge toggle funtionality
    const toggle = async (id) => {
        const { data } = await axios.post("/api/v1/staff/toggle", {
            id: id,
        });
        setPosts(data);
    };

    // const permissions = () => {
    //     navigate("./permisssion");
    // };
    // update A user

    async function updateuser(e, id) {

        const { data } = await axios.post(`/api/v1/staff/update`, {
            id: id,
            email: user.email,
            password: user.password,
            role: user.role,
        });
        setPosts(data)
    }

    const handleClick = (event) => {
        let data = [...permission]
        data.forEach((element) => {
            if (event.currentTarget.checked) {
                if (element.permission_id == event.currentTarget.id) {
                    element[event.currentTarget.value] = 1;
                    setPermission(data)
                }
            } else {
                if (element.permission_id == event.currentTarget.id) {
                    element[event.currentTarget.value] = 0;
                    setPermission(data)
                }
            }
        });
    }
    const updatePermission = async () => {
        const { data } = await axios.post(`/api/v1/staff/updatePermission`, {
            permission: permission,
            role: user.role,
            id: user.id
        })
        if (data == true) {
            setMess(data.message);
        } else {
            setMess(data.message);
        }
    }

    const changeFunc = async (e) => {
        const { data } = await axios.post(`/api/v1/staff/rolePermission`, {
            role: e.target.value,
            id: user.id,
        });
        setPermission(data);
    }

    const indexOfLastPage = page * postPerpage;
    const indexOfFirstPage = indexOfLastPage - postPerpage;
    const currentPosts = posts.length > 0 && posts.slice(indexOfFirstPage, indexOfLastPage);

    const onShowSizeChange = (current, pageSize) => {
        setPostPerPage(pageSize);
    };

    const itemRender = (current, type, originalElement) => {
        if (type === "prev") {
            return <a>Previous</a>;
        }
        if (type === "next") {
            return <a>Next</a>;
        }
        return originalElement;
    };

    // getting data from server
    const getDATA = async () => {
        const { data } = await axios.get("/api/v1/staff/list");
        setPosts(data);
        setTotal(data.length);
    };

    const getRoles = async () => {
        const { data } = await axios.get(`/api/v1/staff/rolePermission`);
        setRoleList(data);
    };
    useEffect(() => {
        getDATA();
        getRoles();
    }, []);
    const [userData, setUserData] = useState({})

    const changeHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(userData);
        const { data } = await axios.post("/api/v1/staff/list", userData);
        console.log(data);
        if (data == true) {
            setMess(data.message);
        } else {
            setMess(data.message);
        }
        setmodalisopen(false)
    }
    const mediaRef = useRef(null);
    const mediaCompanyRef = useRef(null);
    const subcategoryRef = useRef(null);

    const mediaFormRef = useRef(null);
    const mediaCompanyFormRef = useRef(null);
    const subcategoryFormRef = useRef(null);

    const switchTab = (e, tab) => {

        if (tab === 'media') {
            mediaFormRef.current.classList.remove('userProfileHidden')
            mediaCompanyFormRef.current.classList.add('userProfileHidden')


            mediaRef.current.classList.add('navActive')
            mediaCompanyRef.current.classList.remove('navActive')
            subcategoryRef.current.classList.remove('navActive')
        }

        if (tab === 'company') {
            mediaFormRef.current.classList.add('userProfileHidden')
            mediaCompanyFormRef.current.classList.remove('userProfileHidden')


            mediaRef.current.classList.remove('navActive')
            mediaCompanyRef.current.classList.add('navActive')
            subcategoryRef.current.classList.remove('navActive')
        }

    }

    const updateChangeHandler = () => {

    }

    const updateSubmitHandler = () => {

    }
    return (

        <div className="containers">
            <div className="container-sidebar">
                <SideBar />
            </div>
            <div className="container-pages">
                <div className="page-title">
                    <h2>Staff Permission</h2>
                </div>

                <div className="container-page-top">
                    <select class="custom-select" onChange={(e) => setPostPerPage(e.target.value)}>
                        <option selected value="10">10 / pages</option>
                        <option value="20">20 / pages</option>
                        <option value="30">30 / pages</option>
                        <option value="40">40 / pages</option>
                    </select>

                    <button className="m-1 p-2" onClick={() => setmodalisopen(true)}>
                        Create Profile
                    </button>

                    <div className="search-input">
                        <div class="search-box">
                            <input placeholder="Search..." onChange={event => setQuery(event.target.value)} />
                            <i className="fas fa-search icon"></i>
                        </div>


                    </div>
                </div>
                <Modal isOpen={modalisopen} className={'form_modal'}>

                    <button className="closeToggle" onClick={() => setmodalisopen(false)}>
                        <i className="fa-solid fa-multiply"></i>
                    </button>
                    <form className="right info" onSubmit={submitHandler}>
                        <h5>Create New Profile</h5>
                        <div className="inputs">

                            <div className="infoInput">
                                <label htmlFor="password">Name</label>
                                <div className="input">
                                    <i className="fa-solid fa-user"></i><input name='email' type="email" value={userData.email} onChange={changeHandler} placeholder="User Email" required />
                                </div>
                            </div>
                            <div className="infoInput">
                                <label htmlFor="password">Password</label>

                                <div className="input">
                                    <i className="fa-solid fa-lock"></i> <input type="password" name='password' value={userData.password} onChange={changeHandler} placeholder="password" required />
                                </div>
                            </div>
                            <div className="infoInput">
                                <label>Role:</label>
                                <div className="select-input">
                                    <select id="selectBox" name="role" onChange={changeHandler}>
                                        {roleList.length > 0 && roleList.map((obj, i) => (
                                            <option value={obj.role}>{obj.role}</option>
                                        ))}
                                    </select>
                                </div></div>
                            <input type="submit" value={'Create'} />
                        </div>
                    </form>

                </Modal>
                <table className="table table-boarder table-hover table-striped table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>S.No</th>
                            <th>Email</th>
                            {/* <th>Password</th> */}
                            <th>Role</th>
                            <th>Edit</th>
                            <th>Toggle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* map funtion on all data */}
                        {currentPosts.length > 0 && currentPosts
                            .filter((obj) => {
                                if (query == "") {
                                    return obj;
                                } else if (
                                    obj.password.toLowerCase().includes(query.toLowerCase()) ||
                                    obj.email.toLowerCase().includes(query.toLowerCase()) ||
                                    obj.role.toLowerCase().includes(query.toLowerCase())
                                ) {
                                    return obj;
                                }
                            })
                            .map((obj, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{obj.email}</td>
                                    {/* <td>{obj.password}</td> */}
                                    <td>{obj.role}</td>
                                    {/* opening model for a specific user by identify te id */}
                                    <td>
                                        {" "}
                                        <button
                                            onClick={() => {
                                                setedit(true);
                                                setUser(obj);
                                                changeFunc();
                                            }}
                                        >
                                            Edit
                                        </button>{" "}
                                    </td>
                                    <td>
                                        <Switch
                                            onChange={() => toggle(obj.id)}
                                            checked={obj.toggle == 0 ? true : false}
                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div>
                    {/* Edit profile Model */}

                    <Modal isOpen={edit} className={'form_modal'}>
                        <div className="permissionFilter" style={{ justifyContent: 'center' }}>
                            <div className="existUser navActive" ref={mediaRef} onClick={(e) => switchTab(e, 'media')}>
                                <strong>Information</strong>
                            </div>
                            <div className="newPermission " ref={mediaCompanyRef} onClick={(e) => switchTab(e, 'company')}>
                                <strong>Permission</strong>

                            </div>

                        </div>
                        <button className="closeToggle" onClick={() => setedit(false)}>
                            <i className="fa-solid fa-multiply"></i>
                        </button>
                        <form className="right info infos permissionRole" style={{Top:'50%'}} onSubmit={updateSubmitHandler} ref={mediaFormRef} >
                            <div className="inputs">
                                <div className="infoInput">
                                    <label htmlFor="password">Name</label>
                                    <div className="input">
                                        <i className="fa-solid fa-user"></i><input className="input"
                                            type="text"
                                            placeholder={email}
                                            name="email"
                                            value={user.email || ""}
                                            onChange={(e) => changehandler(e)}
                                            required />
                                    </div>
                                </div>
                                <div className="infoInput">
                                    <label htmlFor="password">Password</label>
                                    <div className="input">
                                        <i className="fa-solid fa-lock"></i>
                                        <input
                                            className="input"
                                            type="password"
                                            placeholder={password}
                                            name="password"
                                            value={user?.password && user.password.slice(0, 10) || ""}
                                            onChange={(e) => changehandler(e)}
                                            required />
                                    </div>
                                </div>
                                <div className="infoInput">
                                    <label htmlFor="password">ConfirmPassword</label>
                                    <div className="input">
                                        <i className="fa-solid fa-lock"></i>
                                        <input
                                            className="input"
                                            type="password"
                                            placeholder={password}
                                            name="password"
                                            value={user?.password && user.password.slice(0, 10) || ""}
                                            onChange={(e) => changehandler(e)}
                                            required />
                                    </div>
                                </div>
                                <div className="infoInput">
                                    <label>Role:</label>
                                    <div className="select-input">
                                        <select onChange={(e) => {
                                            changehandler(e);
                                            changeFunc(e);
                                        }}
                                            className="input"
                                            name="role"
                                        >
                                            <option defaultValue={''}>Select Role</option>
                                            {roleList.map((obj, i) => (
                                                <option value={obj.role}>{obj.role}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <input type="submit" value={'Create'} />
                            </div>
                        </form>
                        <div className="container">
                            <div >
                                <div >
                                    {/* by form we try to get old values nad update them */}
                                    <form onSubmit={(e) => updateuser(e, user.id)}>
                                        {/* <div className="field m-2 p-2">
                                            <label>Email</label>
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder={email}
                                                name="email"
                                                value={user.email || ""}
                                                onChange={(e) => changehandler(e)}
                                                required
                                            />
                                        </div>
                                        <div className="field m-2 p-2">
                                            <label>Password</label>
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder={password}
                                                name="password"
                                                value={user.password || ""}
                                                onChange={(e) => changehandler(e)}
                                                required
                                            />
                                        </div>
                                        <div className="field m-2 p-2">
                                            <label>Role</label>
                                            <select
                                                id="selectBox"
                                                onChange={(e) => {
                                                    changehandler(e);
                                                    changeFunc(e);
                                                }}
                                                className="input"
                                                name="role"
                                                value={user.role || ""}>
                                                {roleList.map((obj, i) => (
                                                    <option value={obj.role}>{obj.role}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="field m-2 p-2">
                                            <h3>{user.mess}</h3>
                                        </div>
                                        <input type="submit"></input> */}
                                    </form>

                                </div>
                                <div className="permissionRole userProfileHidden" ref={mediaCompanyFormRef}>
                                    <form onSubmit={(e) => updatePermission(e, permission.permission_id)}>
                                        <table className="table table-boarder table-hover table-striped table-sm ">
                                            <thead>
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
                                                {permission.map((item, i) => (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{item.permission_id}</td>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                id={item.permission_id}
                                                                value="can_view"
                                                                checked={item.can_view || false}
                                                                onChange={handleClick} />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                id={item.permission_id}
                                                                value="can_view_own"
                                                                checked={item.can_view_own || false}
                                                                onChange={handleClick} />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                value="can_edit"
                                                                id={item.permission_id}
                                                                checked={item.can_edit || false}
                                                                onChange={handleClick}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                value="can_create"
                                                                id={item.permission_id}
                                                                checked={item.can_create || false}
                                                                onChange={handleClick}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                value="can_delete"
                                                                id={item.permission_id}
                                                                checked={item.can_delete || false}
                                                                onChange={handleClick}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                                <input className="m-5" type="submit" />
                                            </tbody>
                                        </table>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className="pagination">
                    <Pagination
                        onChange={(value) => setPage(value)}
                        pageSize={postPerpage}
                        total={total}
                        current={page}
                        showSizeChanger
                        showQuickJumper
                        onShowSizeChange={onShowSizeChange}
                        itemRender={itemRender}
                    />
                </div>
            </div>
        </div>
    );
};

export default StaffPermission;