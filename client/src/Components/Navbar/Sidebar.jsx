import { useState } from "react";
import "./Sidebar.css"
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineUser, AiOutlineAlignRight, AiOutlineSync, AiOutlineLock, AiOutlineFileText } from "react-icons/ai";
import { RiUserShared2Line, RiLogoutBoxLine, RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { BiAnalyse, BiCog } from "react-icons/bi";
import { FiEdit, FiLock, FiRefreshCcw, FiSettings, FiTruck, FiUser, FiUsers } from "react-icons/fi"
import { BsCartCheck, BsEnvelope } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { GoFileMedia } from "react-icons/go"
import { FaRegMoneyBillAlt } from "react-icons/fa";
import SidebarMenu from "./SidebarMenu";
// import '.navbar.css'
import { BsBell } from 'react-icons/bs'
import { BsArrowsFullscreen } from 'react-icons/bs'
import { MdGridView, MdOutlineTaskAlt } from 'react-icons/md'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux";
import { logout } from './../../action/adminAction'

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <AiOutlineHome />,
  },
  {
    
    // name: "Media Managment",
    // icon: <GoFileMedia />,
    // subRoutes:[
    //   {
        path: "/media",
        name:"Media Inventry",
        icon: <RiUserShared2Line />,
    //   },
     
    // ]
  },
  {
    
    // name: "Vender Managment",
    // icon: <GoFileMedia />,
    // subRoutes:[
      // {
        path: "/vanders",
        name: "Venders",
        icon: <RiUserShared2Line />,
      // },
     
    // ]
  },
  {
    
    // name: "User Managment",
    // icon: <GoFileMedia />,
    // subRoutes:[
    //   {
        path: "/client",
        name: "Clients",
        icon: <AiOutlineUser />,
    //   },
     
    // ]
  },
  {
    
    name: "Staff Managment",
    icon: <GoFileMedia />,
    subRoutes:[
      {
        path: "/permission",
        name:"Permission ",
        icon: <RiUserShared2Line />,
      },
      {
        path: "/staffPermission",
        name:"Staff Permission",
        icon: <RiUserShared2Line />,
      },
     
    ]
  },
  // {
  //   name: "Users",
  //   icon: <FiUsers />,
  //   subRoutes: [
  //     {
  //       path: "/client",
  //       name: "Clients",
  //       icon: <AiOutlineUser />,
  //     },
  //     {
  //       path: "/vanders",
  //       name: "Venders",
  //       icon: <RiUserShared2Line />,
  //     },
  //   ],
  // },
  
 
  {
    path: "/analytics",
    name: "Analytics",
    icon: <BiAnalyse />,
  },
  {
    path: "/odoads_data_manage",
    name: "Unsynced Media",
    icon: <AiOutlineSync />,
    subRoutes: [
      {
        // RiUserShared2Line
        path: "/accept",
        name: "UnSync ",
        icon: <AiOutlineUser />,
      },
      {
        path: "/reject",
        name: "Rejected Media",
        icon: <AiOutlineLock />,
      },
    ],
  },
  // {
  //   path: "/order",
  //   name: "Order",
  //   icon: <BsCartCheck />,
  // },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/userProfile",
        name: "Profile ",
        icon: <AiOutlineUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <AiOutlineLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaRegMoneyBillAlt />,
      },
    ],
  },
  
];

// const navItem = [
//   {
//     navItemIcon:<BsArrowsFullscreen />,
//     navItemHeader:"notification",
//     navItemHeaderValue: '06',
//     navListTitile:"New registration",
//     navListTitileIcon:'',
//     navListTitileValue:"just now"

//   }
// ]
const navGridItem = [
  {
  navGridItemIcon:<AiOutlineFileText/>,
  navGridItemtitle:"New Tast",
  color:'green'
},
  {
  navGridItemIcon:<MdOutlineTaskAlt/>,
  navGridItemtitle:"Assign Task",
  color:'yello'
},
  {
  navGridItemIcon:<FiEdit/>,
  navGridItemtitle:"Add Orders",
  color:'blue'
},
  {
  navGridItemIcon:<FiTruck/>,
  navGridItemtitle:"New Order",
  color:'red'
},
]


const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthentication, admin } = useSelector(state => state.admin);


  const [isOpen, setIsOpen] = useState(true);
   const toggle = () => {setIsOpen(!isOpen)};
  // const inputAnimation = {
  //   hidden: {
  //     width: 0,
  //     padding: 0,
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  //   show: {
  //     width: "140px",
  //     padding: "5px 15px",
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  // };
  
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  const navPeronalItem = [
    // {
    //   navGridItemIcon:<FiRefreshCcw/>,
    // navGridItemtitle:"Activity",
    // color:'green',
   
    // },
    {
      navGridItemIcon:<BsEnvelope/>,
    navGridItemtitle:"Message",
    color:'green',
    active:'notActive'
    },
    {
      navGridItemIcon:<FiUser/>,
    navGridItemtitle:"Profile",
    color:'green',
    fun:profile
    },
    {
      navGridItemIcon:<RiCheckboxMultipleBlankLine/>,
    navGridItemtitle:"Project",
    color:'green',
    active:'notActive'

    },
    // {
    //   navGridItemIcon:<FiSettings/>,
    // navGridItemtitle:"settigns",
    // color:'green'
    // },
    {
      navGridItemIcon:<FiLock/>,
    navGridItemtitle:"logOut",
    color:'green',
    fun:dashLogout
    },
  ]
  function dashLogout(){
    navigate('/')
    dispatch(logout())
      
  }
 function profile(){
    navigate('/userProfile')
  }
  const dashUser =()=>{
    navigate('/userProfile')
  }
  
  return (
    <>
      <div className="nav-container">
        <nav className='admin-header'>
          <div className="nav-logo">
            <img src="/assests/logo.png" alt="" />
          </div>
        <div className="nav-items ">
            <ul>
              <li className='nav-item'><AiOutlineAlignRight onClick={toggle} /></li>
              {/* <li className='nav-item'></li> */}
              <form className="search">
                <input type="text" placeholder="search" className="search__input" />
                <button type="button" className="search__btn">
                <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </ul>
            <ul>
              {/* <li className='nav-item nav-item-res'><BsArrowsFullscreen /></li> */}
             
              <li className='nav-item'><BsBell />
              <div className="nav-dropdown-container">
                  <div className="dropdown-header">
                    <strong>Notification</strong>
                    <span style={{padding:'2px 6px'}}>06</span>
                  </div>
                  <div className="dropdownItem">
                    <ul>
                      <li>
                        <span>new register user</span>
                        <span>just now</span>
                      </li>
                      <li>
                        <span>new invoice receive</span>
                        <span>22 mints</span>
                      </li>
                      <li>
                        <span>server error report</span>
                        <span>7 hrs</span>
                      </li>
                      <li>
                        <span>data base report</span>
                        <span>6</span>
                      </li>
                      <li>
                        <span>other Information</span>
                        <span>6</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              {/* <li className='nav-item'><MdGridView />
              <div className="nav-dropdown-container grid-view">
                  <div className="dropdown-header">
                    <strong>Quick Links</strong>
                  </div>
                  <div className="dropdownItem grid-view">
                    <ul>
                      {
                        navGridItem.map((list)=>(
                        <li>
                         <span style={{ color: list.color}}>{list.navGridItemIcon}</span>
                         <span>{list.navGridItemtitle}</span>
                      </li>))
                      }
                    </ul>
                  </div>
                </div>
              </li> */}
              <li className='nav-item'><BsFillPersonFill />
              <div className="nav-dropdown-container personal-view">
                   <div className="dropdown-header">
                    <strong>{admin && admin.name}</strong>
                    <span>{admin && admin.email}</span>
                  </div>
                  <div className="dropdownItem">
                  <ul>
                      {
                        navPeronalItem.map((list)=>(
                        <li onClick={list.fun} className={list.active}>
                         <span style={{ color: list.color}}>{list.navGridItemIcon}</span>
                         <span>{list.navGridItemtitle}</span>
                        </li>
                      ))
                      }
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <aside className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "220px" : "45px",
            
            transition: {
              duration: .5,
              type: "spring",
              damping: 20,
            },
          }}
          className={`sidebar `}
          >
          <div>
          <div className="nav-logo-res">
           {isOpen ?<> <img src="/assests/logo.png" alt="" />
            <i className="fa-solid fa-xmark" style={{fontSize:'28px'}} onClick={toggle}></i></>:<><AiOutlineAlignRight onClick={toggle} style={{fontSize:'28px',margin:'5px auto'}}/></>}
          </div>
          <hr className="hr"/>
            <div className="bars">
            </div>
          </div>

          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    // showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        // variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

      </aside>
    </>
  );
};

export default SideBar;
