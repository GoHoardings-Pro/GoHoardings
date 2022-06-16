import React from 'react'
import SideBar from '../../helpingFiles/Navbar/Sidebar'
import './dashboard.css'

const DashBoard = () => {
  return (
    <>
    <div className="containers">
        <div className="container-sidebar">
            <SideBar/>
        </div>
        <div className="container-pages">
            {/* <h1>Lorem ipsum dolor Lorem Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum praesentium iusto cumque hic quaerat porro neque ducimus officiis ab harum, dolores consectetur numquam rem molestias ullam accusantium libero necessitatibus qui? ipsum dolor sit amet consectetur adipisicing elit. Ipsum itaque ipsam asperiores error! Illum nam dolorum exercitationem repellendus placeat libero? Veritatis suscipit incidunt eum voluptates eos quisquam perferendis doloribus fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae rem facere repellendus temporibus dolor soluta, nulla tempore eveniet nobis corporis quia voluptates culpa minus non eligendi nisi autem, voluptas quas? sit amet consectetur adipisicing elit. Sapiente quaerat ex natus quis esse voluptates, perferendis dolorem neque itaque et corrupti cupiditate nemo beatae a voluptate, ad maxime facere eius!</h1> */}
            <div className="page-title">
                <strong>DashBoard</strong>
            </div>
            <div className="page-cards">
                <div className="page-card">
                    <div className="card-details">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default DashBoard