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
import {Multiselect} from 'multiselect-react-dropdown'



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
  const [comp, setcomp] = useState([]);
  const [Users, fetchUsers] = useState([]);

  const ShowDetails = () => {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: "code",
        city: "city",
        location: "location",
        category: "category",
        subcategory: "subcategory",
        illumination: "illumination",
        company: "company",
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
   City.push({value : obj.name})
 });

  const ShowCompany = () => {
    fetch(`http://localhost:8080/media/company`)
      .then((res) => res.json())
      .then((res) => {
        setcomp(res);
  
      });
  };

  let Comp = [];
  comp.forEach((value) => {
   Comp.push({value : value.name})
 });

  

  // useEffect(() => {
  //   if (code) {
  //     for (let index = 1; index < 7; index++) {
  //       document.getElementsByClassName("all")[index].disabled = true;
  //     }
  //   } else {
  //     for (let index = 1; index < 7; index++) {
  //       document.getElementsByClassName("all")[index].disabled = false;
  //     }
  //   }
  // }, [code]);

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
    { dataField: "code", text: "ID",  },
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

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
  };


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


  useEffect(() => {
   
    Showcity();
    ShowCompany();
  }, []);


  return (
    <div>
      <center>
        <h1>Media Inventory</h1>

        <label>Media Code:</label>
        <input
          type="text"
          className="all"
          id="code"
          onChange={(event) => {
            setCode(event.target.value);
          }}
        />
        <br />
        <label>City:</label>
       
       <Multiselect
   options={City}
   displayValue="value"
   onSelect={setCity}
   labelledBy="Select"
 /> 
        <br />
        <label>Location:</label>
        <input
          type="text"
          className="all"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
        <br />
        <label>Media Category:</label>
        <select onChange={(event) => {
            setCategory(event.target.value)}}>
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
        <Multiselect 
   options={Comp}
   displayValue="value"
   onSelect={setSubcategory}
   labelledBy="Select"
 /> 
        <br />
        <label>Illimination Type:</label>
        <select  onChange={(event) => {
            setIllumination(event.target.value)}}>
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
        <input
          type="text"
          className="all"
          id="company"
          onChange={(event) => {
            setCompany(event.target.value);
          }}
        />
        <br />
        <br />
        <button className="btn btn-primary" id="btn" onClick={ShowDetails}>
          Show
        </button>
      </center>
      <br />
      <center>
        <h2>React Fetch API Example</h2>
        {(() => {
          if (Users.status === "success") {
            return (
   <ToolkitProvider
  keyField="code"
  data={Users.res}
  columns={columns}
  exportCSV
>
  {
    props => (
      <div>
        <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
        <hr />
        <BootstrapTable   { ...props.baseProps }
          selectRow={ selectRow }
          pagination={ pagintion } 
          />
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

