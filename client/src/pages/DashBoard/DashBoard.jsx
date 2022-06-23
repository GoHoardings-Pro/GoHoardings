import React from 'react'
import { AiFillExclamationCircle, AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineBarChart, AiOutlineTwitter } from 'react-icons/ai'
import SideBar from '../../Components/Navbar/Sidebar'
import './dashboard.css'
// import { Card, CardBody, CardTitle, Row, div } from 'reactstrap';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import { BsBookmark } from 'react-icons/bs';
import { BiCalendar } from 'react-icons/bi';
import { MdRefresh } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
ChartJS.register(ArcElement, Tooltip, Legend);


const data = {
    labels: [
        'Red',
        'Blue',
        'Yellow',
        'Green',
        'Orange'
    ],

    datasets: [{
        data: [400, 50, 100, 80, 150],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#00cc99',
            '#ffa31a'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#00cc99',
            '#ffa31a'
        ]
    }]
};

const pageCards = [{
    pageCardIcon: <AiOutlineBarChart />,
    pageCardtitle:"Visitors",
    pageCardValue: "65,650",
    pageCardFooterIcon: <AiFillExclamationCircle />,
    pageCardFooterDes:"81% lower growth",
    iconColor:'red'
},
{
    pageCardIcon: <FaShoppingCart />,
    pageCardtitle:"Orders",
    pageCardValue: "656",
    pageCardFooterIcon: <BsBookmark/>,
    pageCardFooterDes:"Total sales",
    iconColor:'#ffc107'
},
{
    pageCardIcon: <FaDollarSign />,
    pageCardtitle:"Revenue",
    pageCardValue: "$65656",
    pageCardFooterIcon: <BiCalendar/>,
    pageCardFooterDes:" Sales Per Week",
    iconColor:'#28a745'
},
{
    pageCardIcon: <AiOutlineTwitter />,
    pageCardtitle:"Follower",
    pageCardValue: "62,500+",
    pageCardFooterIcon: <MdRefresh/>,
    pageCardFooterDes:"Just Updated",
    iconColor:'#007bff'
}

]
const DashBoard = () => {
    const navigate = useNavigate();
    const { isAuthenticate, admin } = useSelector( state => state.admin);

    console.log(isAuthenticate,admin);

    useEffect(()=>{
        console.log(isAuthenticate);
        if( isAuthenticate === true){
          navigate('/dashboard')
        }else{
          navigate('/login')
        }
      },[isAuthenticate])
    return (
        <>
            <div className="containers">
                <div className="container-sidebar">
                    <SideBar />
                </div>
                <div className="container-pages">
                    <div className="page-title">
                        <h4>DashBoard</h4>
                    </div>
                    <div className="page-cards">
                        {pageCards.map((card)=>(
                            <div className="page-card">
                            <div className="card-details">
                                <div className="card-detail-icon" style={{color:card.iconColor}}>
                                   {card.pageCardIcon}
                                </div>
                                <div className="card-detail">
                                    <p>{card.pageCardtitle}</p>
                                    <h4>{card.pageCardValue}</h4>
                                </div>
                            </div>
                            <div className="card-footers">
                                <p>{card.pageCardFooterIcon} {card.pageCardFooterDes}</p>
                            </div>
                        </div>
                        ))}
                        
                        </div>
                    <div className="page-cards dash-charts">

                        <div className="dash-chart-left dash-chart">
                            <div >
                                <div className="page-cardm dash-chart-card">
                                    <div className='chart-body'>
                                        <h4>Customer Feedback</h4>
                                        <div className="chart-datas">
                                            <div>
                                                <div className="clearfix">
                                                    <p >Positive</p>
                                                    <p  className="text-success" ><AiOutlineArrowUp /></p>
                                                </div>
                                                <div className="progress">
                                                    <div className="bg-success" 
                                                    role="progressbar" style={{ width: '70%' }} 
                                                    aria-valuenow={70}
                                                     aria-valuemin={0} 
                                                     aria-valuemax={100} 
                                                     />
                                                </div>
                                                <h4 className="text-success">8501</h4>
                                            </div>
                                            <div>
                                                <div className="clearfix">
                                                    <p>Negative</p>
                                                    <p className='text-danger'><AiOutlineArrowDown /></p>
                                                </div>
                                                <div className="progress">
                                                    <div className=" bg-danger" role="progressbar" style={{ width: '30%' }} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                                <h4 className="mt-10 text-danger">3251</h4>
                                            </div>
                                        </div>
                                        <div className="chart-wrapper" style={{ height: 270 }}>
                                            <Doughnut 
                                            data={data} 
                                            options={{
                                                maintainAspectRatio: false, 
                                                legend: {
                                                    display: true, 
                                                    labels: {fontFamily: "Poppins"}
                                                }
                                            }}  
                                            width={150} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dash-chart-right dash-chart">
                        <div >
                                        <h5 className="card-title">Social Source</h5>
                                        <h4>$50,500 </h4>
                                        <div style={{marginTop:'1.429rem'}}>
                                        <div className="clearfix">
                                            <p >Facebook</p>
                                            <p >801</p>
                                        </div>
                                        <div className="progress">
                                            <div className=" bg-info" role="progressbar" style={{width: '80%'}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        </div>
                                        <div style={{marginTop:'1.429rem'}}>
                                        <div className="clearfix">
                                            <p >Twitter</p>
                                            <p className="text-success">572</p>
                                        </div>
                                        <div className="progress">
                                            <div className=" bg-success" role="progressbar" style={{width: '57%'}} aria-valuenow={57} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        </div>
                                        <div style={{marginTop:'1.429rem',marginBottom:'1.429rem'}}>
                                        <div className="clearfix">
                                            <p>LinkedIn</p>
                                            <p className="text-secondary ">766</p>
                                        </div>
                                        <div className="progress">
                                            <div className=" bg-secondary" role="progressbar" style={{width: '76%'}} aria-valuenow={76} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        </div>
                                        <div style={{marginTop:'1.429rem'}}>
                                        <div className="clearfix">
                                            <p>Google+</p>
                                            <p className=" text-warning ">288</p>
                                        </div>
                                        <div className="progress">
                                            <div className=" bg-warning" role="progressbar" style={{width: '28%'}} aria-valuenow={28} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        </div>
                                        <div style={{marginTop:'1.429rem',marginBottom:'1.429rem'}}>
                                        <div className="clearfix">
                                            <p>Pinterest</p>
                                            <p className=" text-danger ">710</p>
                                        </div>
                                        <div className="progress">
                                            <div className=" bg-danger" role="progressbar" style={{width: '70%'}} aria-valuenow={76} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoard