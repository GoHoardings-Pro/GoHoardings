import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import PaginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { MultiSelect } from "react-multi-select-component";
import pptxgen from "pptxgenjs";
import SideBar from '../../Components/Navbar/Sidebar'
import axios from "axios";

const XLSX = require('xlsx');
let pres = new pptxgen();


const Media = () => {
    const { ExportCSVButton } = CSVExport;

    const [code, setCode] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [illumination, setIllumination] = useState("");
    const [company, setCompany] = useState("");
    const [getCity, setgetcity] = useState([]);
    const [getcomp, setcomp] = useState([]);
    const [Users, fetchUsers] = useState([]);
    const [cityname, setcityname] = useState([])
    const [compname, setcompname] = useState([])
    const [state, setState] = useState(false);

    const ShowDetails = async() => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: code,
                city: city,
                location: location,
                category: category,
                subcategory: subcategory,
                illumination: illumination,
                company: company,
            }),
        };
        const { data } = await axios.post('http://localhost:8080/api/v1/media/inventory', requestOptions)

        fetchUsers(data)
        console.log(data);
        // fetch("http://localhost:8080/api/v1/media/inventory", requestOptions)
        //     .then((res) => res.json())
        //     .then((res) => {

        //         fetchUsers(res);
        //     });
    };

    const Showcity = async() => {
        const { data } = await axios.get(`http://localhost:8080/api/v1/media/city`) 
            setCity(data)
    };

    let City = [];
    getCity.forEach((obj) => {
        City.push({ "label": obj.name, "value": obj.name })
    });
    const ShowCompany = async() => {
        const { data } = await axios.get(`http://localhost:8080/api/v1/media/company`) 
        setCompany(data)
    };

    let Comp = [];
    getcomp.forEach((value) => {
        Comp.push({ "label": value.name, "value": value.name })
    });

    useEffect(() => {
        ShowDetails();
        Showcity();
        ShowCompany();
    }, []);

    useEffect(() => {
        if (code) {
            for (let index = 1; index < 7; index++) {
                document.getElementsByClassName("all")[index].disabled = true;
            }
        } else {
            for (let index = 1; index < 7; index++) {
                // document.getElementsByClassName("all")[index].disabled = false;
            }
        }
    }, [code]);

    console.log(getCity);

    return (
        <>
            <div className="containers">

                <div className="container-sidebar">
                    <SideBar />
                </div>
                <div className="container-pages">
                    <div className="page-title">
                        <h4>Media Inventory</h4>
                    </div>
                    <form style={{ width: '90%', margin: 'auto' }}>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Media Code</label>
                            <input type="text" onChange={e => setCode(e.target.value)} />
                            {/* <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/> */}
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">City</label>
                            <select class="form-control" id="exampleFormControlSelect1">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <center>
                          
                            <label>City:</label>
                            <MultiSelect options={City} value={cityname} onChange={setcityname} labelledBy="Select" />
                            <br />

                            <label>Location:</label>
                            <input type="text" className="all" onChange={e => setLocation(e.target.value)} />
                            <br />

                            <label>Media Category:</label>
                            <select onChange={e => setCategory(e.target.value)}>
                                <option value="None" >None</option>
                                <option value="traditional-ooh-media" >traditional-ooh-media</option>
                                <option value="digital-media" >digital-media</option>
                                <option value="transit-media" >transit-media</option>
                                <option value="mall-media" >mall-media</option>
                                <option value="airport-media" >airport-media</option>
                                <option value="inflight_media" >inflight_media</option>
                                <option value="office-media" >office-media</option>

                            </select>
                            <br />

                            <label>Media Subcategory:</label>
                            <MultiSelect options={Comp} value={compname} onChange={setcompname} labelledBy="Select" />
                            <br />


                            <label>Illimination Type:</label>
                            <select onChange={e => setIllumination(e.target.value)}>
                                <option>None</option>
                                <option>Airport LED</option>
                                <option>Airport Media</option>
                                <option>Auto Advertising</option>
                                <option>Backlit Mupi</option>
                                <option>Backlit Totems</option>
                                <option>Bench</option>
                                <option>Billboard</option>
                                <option>Boom Panel</option>
                                <option>Bridge Panel</option>
                                <option>Bridge Pillar</option>
                                <option>Building Facade</option>
                                <option>Bus Branding</option>
                                <option>Bus LED Screen</option>
                                <option>Bus Shelter</option>
                                <option>Cantilever</option>
                                <option>Cab Branding</option>
                                <option>Cinema LED Screen</option>
                                <option>Cycle Shelter</option>
                                <option>Departmental Store LED Screen</option>
                                <option>Digital OOH</option>
                                <option>Digital Screen</option>
                                <option>Dustbin</option>
                                <option>Flag Sign</option>
                                <option>Flight Media</option>
                                <option>Foot Over Bridge</option>
                                <option>Front Facade</option>
                                <option>Gantry</option>
                                <option>Hoarding</option>
                                <option>Hoarding LED</option>
                                <option>In Flight Branding</option>
                                <option>Led</option>
                                <option>Lolipops</option>
                                <option>Mall LED</option>
                                <option>Mall Media</option>
                                <option>Metro Bridge Panel</option>
                                <option>Metro LED</option>
                                <option>Metro Panel</option>
                                <option>Metro Pillars</option>
                                <option>Metro Signage</option>
                                <option>Metro Station Facade</option>
                                <option>Metro Train</option>
                                <option>Mini Unipole</option>
                                <option>Offices</option>
                                <option>Mobile Van</option>
                                <option>Neon Billboard</option>
                                <option>Piller Wrap</option>
                                <option>Pole Kiosks</option>
                                <option>Police Booth</option>
                                <option>Public Utility</option>
                                <option>Railway Station LED</option>
                                <option>Side Panel</option>
                                <option>Signages</option>
                                <option>Smart Boards</option>
                                <option>Smart Bus Shelter</option>
                                <option>Standee Unit</option>
                                <option>Subway Panel</option>
                                <option>Traditional OOH Media</option>
                                <option>Traffic Booth</option>
                                <option>Traffic Junction</option>
                                <option>Traffic media</option>
                                <option>Train LED Screen</option>
                                <option>Train Wrap</option>
                                <option>Transit Media</option>
                                <option>Tripod</option>
                                <option>Unipole</option>
                                <option>Unipole LED</option>
                                <option>Vending Kiosk</option>
                                <option>Wall Wrap</option>
                                <option>Water ATM</option>
                            </select>
                            <br />

                            <label>Media Owner Company Name:</label>
                            <input type="text" className="all" id="company" onChange={(e) => { setCompany(e.target.value); }} />
                            <br />
                            <button type="submit" class="btn btn-primary">Sign in</button>

                        </center>

                    </form>
                </div></div>
        </>
    )
}

export default Media