import { useState } from "react";
import "./Sidebar.css"
import { NavLink } from "react-router-dom";
import { AiOutlineHome, AiOutlineUser,AiOutlineAlignRight,AiOutlineSync,AiOutlineLock } from "react-icons/ai";
import { RiUserShared2Line, RiLogoutBoxLine } from "react-icons/ri";
import { BiAnalyse, BiCog } from "react-icons/bi";
import {FiUsers} from "react-icons/fi"
import { BsCartCheck } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import {GoFileMedia} from "react-icons/go"
import { FaRegMoneyBillAlt } from "react-icons/fa";
import SidebarMenu from "./SidebarMenu";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <AiOutlineHome />,
  },
  {
    name: "Users",
    icon: <FiUsers/>,
    subRoutes: [
      {
        path: "/go_user",
        name: "Clients",
        icon: <AiOutlineUser />,
      },
      {
        path: "/odo_users",
        name: "Venders",
        icon: <RiUserShared2Line />,
      },
    ],
  },
  {
    path: "/media",
    name: "Media",
    icon: <GoFileMedia />,
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
        path: "/updateSync",
        name: "UnSync ",
        icon: <AiOutlineUser />,
      },
      {
        path: "/rejectedSync",
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

const SideBar = ({ children }) => {
  // console.log(children);
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
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
      <div className="main-container">
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
              <AiOutlineAlignRight onClick={toggle} />
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

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
