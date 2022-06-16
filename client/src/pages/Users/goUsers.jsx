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
import Axios from "axios"


const GoUser = () => {

  const [posts, setPosts] = useState([]);


useEffect(() => {
  const fetchPost = async() => {
    const res =  await Axios.get("http://localhost:8080/users/goUsers")
    setPosts(res.data)
  };
  fetchPost();
}, []);

const columns = [
    { dataField: "id", text: "ID",  },
    { dataField: "profile_image", formatter: imageFormatter, text: "Image" },
    { dataField: "firstname", text: "Name", sort: true },
    { dataField: "lastname", text: "Last Name", sort: true },
    { dataField: "email", text: "Email", sort: true },
    { dataField: "phonenumber", text: "Phone_Number", sort: true },
  ];

  function imageFormatter(cell) {
    return <img src={cell} style={{ width: "100px", height: "100px" }} />;
  }

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
      <div classname="m-5 p-5">
      <BootstrapTable 
       keyField="id"
       data={posts}
       columns={columns}
          selectRow={ {mode: 'checkbox',
          clickToSelect: true} }
          pagination={ pagintion } 
         
          />
      </div>
     
      )};
export default GoUser;