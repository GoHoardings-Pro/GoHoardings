import React from 'react'
import { AiFillExclamationCircle, AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineBarChart } from 'react-icons/ai'
import SideBar from '../../helpingFiles/Navbar/Sidebar'
import './dashboard.css'
// import { Card, CardBody, CardTitle, Row, div } from 'reactstrap';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
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
const DashBoard = () => {
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
                        <div className="page-card">
                            <div className="card-details">
                                <div className="card-detail-icon">
                                    <AiOutlineBarChart />
                                </div>
                                <div className="card-detail">
                                    <p>Visitors</p>
                                    <h4>65,650</h4>
                                </div>
                            </div>
                            <div className="card-footer">
                                <p><AiFillExclamationCircle /> 81% lower growth</p>
                            </div>
                        </div>
                        <div className="page-card">
                            <div className="card-details">
                                <div className="card-detail-icon">
                                    <AiOutlineBarChart />
                                </div>
                                <div className="card-detail">
                                    <p>Visitors</p>
                                    <h4>65,650</h4>
                                </div>
                            </div>
                            <div className="card-footer">
                                <p><AiFillExclamationCircle /> 81% lower growth</p>
                            </div>
                        </div>
                        <div className="page-card">
                            <div className="card-details">
                                <div className="card-detail-icon">
                                    <AiOutlineBarChart />
                                </div>
                                <div className="card-detail">
                                    <p>Visitors</p>
                                    <h4>65,650</h4>
                                </div>
                            </div>
                            <div className="card-footer">
                                <p><AiFillExclamationCircle /> 81% lower growth</p>
                            </div>
                        </div>
                        <div className="page-card">
                            <div className="card-details">
                                <div className="card-detail-icon">
                                    <AiOutlineBarChart />
                                </div>
                                <div className="card-detail">
                                    <p>Visitors</p>
                                    <h4>65,650</h4>
                                </div>
                            </div>
                            <div className="card-footer">
                                <p><AiFillExclamationCircle /> 81% lower growth</p>
                            </div>
                        </div>
                    </div>
                    <div className="dash-charts">

                        <div className="dash-chart-left page-card">
                            <div >
                                <div className="page-cardm dash-chart-card">
                                    <div className='chart-body'>
                                        <h4>Customer Feedback</h4>
                                        <div className="chart-datas">
                                            <div>
                                                <div className="clearfix">
                                                    <p className=" float-left">Positive</p>
                                                            
                                                    <AiOutlineArrowUp />
                                                    {/* <i className="float-right fa fa-arrow-up"> </i> */}
                                                </div>
                                                <div className="progress progress-small">
                                                    <div className="skill2-bar bg-success" role="progressbar" style={{ width: '70%' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                                <h4 className="mt-10 text-success">8501</h4>
                                            </div>
                                            <div>
                                                <div className="clearfix">
                                                    <p className="mb-10 float-left">Negative</p>
                                                    <AiOutlineArrowDown />
                                                    {/* <i className="mb-10 text-danger float-right fa fa-arrow-down"> </i> */}
                                                </div>
                                                <div className="progress progress-small">
                                                    <div className="skill2-bar bg-danger" role="progressbar" style={{ width: '30%' }} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                                <h4 className="mt-10 text-danger">3251</h4>
                                            </div>
                                        </div>
                                        <div className="chart-wrapper" style={{ height: 270 }}>
                              <Doughnut data={data} options={{maintainAspectRatio: false, legend: {display: true, labels: {fontFamily: "Poppins"}}}}  width={150} />


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dash-chart-right page-card">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoard