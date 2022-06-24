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
const XLSX = require('xlsx');
let pres = new pptxgen();

export default function Api() {
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
    const [state, setState] = useState(false)

    const ShowDetails = () => {
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

        fetch("http://localhost:8080/media/invetory", requestOptions)
            .then((res) => res.json())
            .then((res) => {

                fetchUsers(res);
            });
    };

    const Showcity = () => {
        fetch(`http://localhost:8080/media/city`)
            .then((res) => res.json())
            .then((res) => {
                setgetcity(res);
            });
    };

    let City = [];
    getCity.forEach((obj) => {
        City.push({ "label": obj.name, "value": obj.name })
    });
    const ShowCompany = () => {
        fetch(`http://localhost:8080/media/company`)
            .then((res) => res.json())
            .then((res) => {
                setcomp(res);

            });
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
                document.getElementsByClassName("all")[index].disabled = false;
            }
        }
    }, [code]);

    // useEffect(() => {
    //   if (company) {
    //     for (let index = 0; index < 6; index++) {
    //       document.getElementsByClassName("all")[index].disabled = true;
    //     }
    //   } else {
    //     for (let index = 0; index < 6; index++) {
    //       document.getElementsByClassName("all")[index].disabled = false;
    //     }
    //   }
    // }, [company]);

    // useEffect(() => {
    //   if (city || location || category || subcategory || illumination) {
    //     document.getElementById("code").disabled = true;
    //     document.getElementById("company").disabled = true;
    //   } else {
    //     document.getElementById("code").disabled = false;
    //     document.getElementById("company").disabled = false;
    //   }
    // }, [city, location, category, subcategory, illumination]);

    // useEffect(() => {
    //   if (location || category || subcategory || illumination) {
    //     document.getElementById("btn").disabled = true;
    //   } else {
    //     document.getElementById("btn").disabled = false;
    //   }
    // }, [city, location, category, subcategory, illumination]);

    // useEffect(() => {
    //   if (city) {
    //     document.getElementById("btn").disabled = false;
    //   }
    // }, [city, location, category, subcategory, illumination]);

    const columns = [
        { dataField: "code", text: "ID", },
        { dataField: "thumb", formatter: imageFormatter, text: "Image" },
        { dataField: "location", text: "Company", sort: true },
        { dataField: "city_name", text: "City", sort: true },
        { dataField: "phonenumber", text: "Phone", sort: true },
        { dataField: "email", text: "Email", sort: true },
        { dataField: "location", text: "Media", sort: true },
        { dataField: "category_name", text: "Category", sort: true },
        { dataField: "subcategory", text: "Subcategory", sort: true },
        { dataField: "illumination", text: "Illumination", sort: true },
        { dataField: "price", text: "Price", sort: true },
    ];

    const CaptionElement = (
        <h3
            style={{
                borderRadius: "0.25em",
                textAlign: "center",
                color: "black",
                border: "1px solid black",
                padding: "0.5em",
            }}
        >
            React Fetch API{" "}
        </h3>
    );

    function imageFormatter(cell) {
        return <img src={cell} style={{ width: "100px", height: "100px" }} />;
    }
    function handleOnSelect(row, isSelect) {
        if (isSelect) {
            setState(() => ({
                selected: [state.selected, row.id]
            }));
        } else if (isSelect == false) {
            return true
        }
        let data = [row]
        console.log(data);
    }

    const handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r.id);
        if (isSelect == true) {
            setState(() => ({
                selected: ids
            }));
        } else {
            return false
        }
        console.log(ids);
    }

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: abcd(handleOnSelect),
        onSelectAll: handleOnSelectAll
    };

    // _____________________________________________PPT_______________________________________________________________

    function abcd(data) {

        //  const second = function jsontoppt(){

        pres.layout = 'LAYOUT_4x3';

        let user = [data]


        // 2. Add a Slide
        let slide = pres.addSlide();
        let slide2 = pres.addSlide();
        let slide3 = pres.addSlide();

        // Image by local URL
        slide.addImage({ path: "images/headerppt.jpg", w: '100%', h: '100%' });
        slide2.addImage({ path: "images/1568263768_22699.jpg", w: '100%', h: '100%' });
        slide3.addImage({ path: "images/footerppt.jpg", w: '100%', h: '100%' });

        // Shape with text


        let textboxText = [
            { text: "Name : " + user + "", options: { fontSize: 12, color: "ffffff", breakLine: true } },
            { text: "Media Type : traditional-ooh-media", options: { fontSize: 12, color: "ffffff", breakLine: true } },
            { text: "City : Delhi", options: { fontSize: 12, color: "ffffff", breakLine: true } },
            { text: "Location : RBK Sharma,Akshardham Footover Bridge, Pandav Nagar", options: { fontSize: 12, color: "ffffff", breakLine: true } },
            { text: "GEO Location : 28.611350,77.281392", options: { fontSize: 12, color: "ffffff", breakLine: true } },
            { text: "Size : 20 X 10 feet", options: { fontSize: 12, color: "ffffff", breakLine: true } },
            { text: "Illumination : Frontlit", options: { fontSize: 12, color: "ffffff", breakLine: true } },
            { text: "Price : 110000.00", options: { fontSize: 12, color: "ffffff", breakLine: true } },
            { text: "Foot fall : 0", options: { fontSize: 12, color: "ffffff", breakLine: true } },
            { text: "Slide Reference No : 3511", options: { fontSize: 12, color: "ffffff", breakLine: true } },
        ];
        slide.addText(user, { shape: pres.ShapeType.rect, fill: { color: "FF0000" }, w: '25%', h: '40%', x: '0%', y: '60%', fontSize: 12 });
        // 4. Save the Presentation
        pres.writeFile();
        //  }
    }
    // _____________________________________________PPT_______________________________________________________________
    const pagintion = PaginationFactory({
        page: 1,
        sizePerPage: 10,
        lastPageText: ">>",
        firstPageText: "<<",
        nextPageText: ">",
        prevPageText: ">",
        showTotal: true,
        alwaysShowAllBtns: true,
    });

    return (
        <div>
            <center>
                <h1>Media Inventory</h1>

                <label>Media Code:</label>
                <input type="text" className="all" id="code" onChange={e=> setCode(e.target.value);}}/>
                <br />

                <label>City:</label>
                <MultiSelect options={City} value={cityname} onChange={setcityname} labelledBy="Select" />
                <br />

                <label>Location:</label>
                <input type="text" className="all" onChange={e => setLocation(e.target.value);}}/>
                <br />

                <label>Media Category:</label>
                <select onChange={e => setCategory(e.target.value)}}>
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
                <select onChange= { e => setIllumination(e.target.value)}>
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
                <input type="text" className="all" id="company" onChange={(e) => {setCompany(e.target.value);}}/>
                <br />

                <button className="btn btn-primary" id="btn" onClick={ShowDetails}>Show</button>
            </center>
            <br />

            <center>
                <h2>React Fetch API Example</h2>
                {(() => {
                    if (Users.status === "success") {
                        return (
                            <ToolkitProvider keyField="code" data={Users.res} columns={columns} exportCSV>
                                {
                                    props => (
                                        <div>
                                            <ExportCSVButton {...props.csvProps}>Export CSV</ExportCSVButton>
                                            <hr />

                                            <BootstrapTable   {...props.baseProps}
                                                selectRow={selectRow}
                                                pagination={pagintion}
                                                noDataIndication="Table is Empty"
                                            />

                                            <button onClick={() => abcd}>Get PPT</button>

                                        </div>
                                    )
                                }
                            </ToolkitProvider>

                        );

                    } else {
                        return <h3>Media No Found</h3>;
                    }
                })()}
            </center>
        </div>
    );
}
