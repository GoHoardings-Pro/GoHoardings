import React from 'react'
import './navbar.css'
import { BsBell } from 'react-icons/bs'
import { BsArrowsFullscreen } from 'react-icons/bs'
import { MdGridView } from 'react-icons/md'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiOutlineAlignRight } from 'react-icons/ai'
import { AiOutlineSearch } from 'react-icons/ai'
const NavBar = () => {
  return (
    <>
        <div className="nav-container">
            <nav className='admin-header'>
                <div className="nav-logo">
                    <img src="/assests/logo.png" alt="" />
                </div>
                <div className="nav-items">

                <ul>
                    <li className='nav-item'><AiOutlineAlignRight/></li>
                    <li className='nav-item'><AiOutlineSearch/></li>
                </ul>
                <ul>
                        <li className='nav-item'><BsArrowsFullscreen/></li>
                        <li className='nav-item'><BsBell/></li>
                        <li className='nav-item'><MdGridView/></li>
                        <li className='nav-item'><BsFillPersonFill/></li>
                </ul>
                </div>
            </nav>
        </div>
    </>
    )
}

export default NavBar