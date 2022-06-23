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
import SideBar from "../../Components/Navbar/Sidebar";
import Axios from "axios"


const Odousers = () => {

  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPost = async () => {
      const res = await Axios.get("http://localhost:8080/api/v1/users/odoUsers")
      setPosts(res.data.data)
    };
    fetchPost();
  }, []);
  console.log(posts);

  const columns = [
    { dataField: "id", text: "ID", },
    // { dataField: "profile_image", formatter: editButton, text: "Image" },
    { dataField: "name", text: "Name", sort: true },
    { dataField: "contact_firstname", text: "Contact First Name", sort: true },
    { dataField: "contact_email", text: "Email", sort: true },
    { dataField: "contact_phone", text: "Phone_Number", sort: true },
    { dataField: "created", text: "Date", sort: true },
    { dataField: "synced_media", text: "Sync Media", sort: true },
    { dataField: "unsynced_media", text: "UnSync Media", sort: true },
    { dataField: "updates_media", text: "Update Media", sort: true },
    { dataField: "", formatter: editButton,text: "action"},
  ];

  function editButton() {
    return <button>Edit</button> 
  }
  function toggleButton() {
    return <button>Toggle</button> 
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
    <>
      <div className="containers">

        <div className="container-sidebar">
          <SideBar />
        </div>
        <div className="container-pages">
          <div classname="m-5 p-5">
            <BootstrapTable
              keyField="id"
              data={posts}
              columns={columns}
              selectRow={{
                mode: 'checkbox',
                clickToSelect: true
              }}
              pagination={pagintion}

            />
          </div>
        </div></div>
    </>

  )
};
export default Odousers;