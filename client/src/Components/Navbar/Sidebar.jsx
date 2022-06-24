import { useState } from "react";
import "./Sidebar.css"
import { NavLink } from "react-router-dom";
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
import { useSelector } from "react-redux";


const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <AiOutlineHome />,
  },
  {
    name: "Users",
    icon: <FiUsers />,
    subRoutes: [
      {
        path: "/dashboard/client",
        name: "Clients",
        icon: <AiOutlineUser />,
      },
      {
        path: "/dashboard/vanders",
        name: "Venders",
        icon: <RiUserShared2Line />,
      },
    ],
  },
  {
    
    name: "Media Managment",
    icon: <GoFileMedia />,
    subRoutes:[
      {
        path: "/dashboard/media",
        name:"media Inventry",
        icon: <RiUserShared2Line />,
      },
     
    ]
  },
  {
    path: "/cart",
    name: "Cart",
    icon: <BsCartCheck />,

  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: <BiAnalyse />,
  },
  {
    path: "/odoads_data_manage",
    name: "Sync & Unsync",
    icon: <AiOutlineSync />,
    subRoutes: [
      {
        // RiUserShared2Line
        path: "/dashboard/accept",
        name: "UnSync ",
        icon: <AiOutlineUser />,
      },
      {
        path: "/dashboard/reject",
        name: "Rejected Media",
        icon: <AiOutlineLock />,
      },
    ],
  },
  {
    path: "/order",
    name: "Order",
    icon: <BsCartCheck />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
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
  {
    path: "/logout",
    name: "Logout",
    icon: <RiLogoutBoxLine />,
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
const navPeronalItem = [
  {
    navGridItemIcon:<FiRefreshCcw/>,
  navGridItemtitle:"Activity",
  color:'green'
  },
  {
    navGridItemIcon:<BsEnvelope/>,
  navGridItemtitle:"Message",
  color:'green'
  },
  {
    navGridItemIcon:<FiUser/>,
  navGridItemtitle:"Profile",
  color:'green'
  },
  {
    navGridItemIcon:<RiCheckboxMultipleBlankLine/>,
  navGridItemtitle:"Project",
  color:'green'
  },
  {
    navGridItemIcon:<FiSettings/>,
  navGridItemtitle:"settigns",
  color:'green'
  },
  {
    navGridItemIcon:<FiLock/>,
  navGridItemtitle:"logOut",
  color:'green'
  },
]
const SideBar = () => {

  const { isAuthentication, admin } = useSelector(state => state.admin);

  console.log(admin);

  const [isOpen, setIsOpen] = useState(true);
  // const [ containerStyle, setContainerStyle ] = useState()
   const toggle = () => {
    setIsOpen(!isOpen)
    
  };
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


  return (
    <>
      <div className="nav-container">
        <nav className='admin-header'>
          <div className="nav-logo">
            <img src="/assests/logo.png" alt="" />
          </div>
        <div className="nav-items">
            <ul>
              <li className='nav-item'><AiOutlineAlignRight onClick={toggle} /></li>
              <li className='nav-item'><AiOutlineSearch /></li>
            </ul>
            <ul>
              <li className='nav-item'><BsArrowsFullscreen />
                
              </li>
              <li className='nav-item'><BsBell />
              <div className="dropdown-container">
                  <div className="dropdown-header">
                    <strong>Notification</strong>
                    <span>06</span>
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
              <li className='nav-item'><MdGridView />
              <div className="dropdown-container grid-view">
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
              </li>
              <li className='nav-item'><BsFillPersonFill />
              <div className="dropdown-container personal-view">
                 <NavLink to={'/dashboard/user'}>
                   <div className="dropdown-header">
                    <strong>{admin && admin.name}</strong>
                    <span>{admin && admin.email}</span>
                  </div></NavLink>
                  <div className="dropdownItem">
                  <ul>
                      {
                        navPeronalItem.map((list)=>(
                        <li>
                         <span style={{ color: list.color}}>{list.navGridItemIcon}</span>
                         <span>{list.navGridItemtitle}</span>
                      </li>))
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
              duration: 1,
              type: "spring",
              damping: 20,
            },
          }}
          className={`sidebar `}
        >
          <div>
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                </motion.h1>
              )}
            </AnimatePresence>

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
                    showAnimation={showAnimation}
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
                        variants={showAnimation}
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
