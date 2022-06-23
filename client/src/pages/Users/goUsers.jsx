import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import PaginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import SideBar from "../../Components/Navbar/Sidebar";

import Axios from "axios"


const GoUser = () => {

  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPost = async () => {
      const res = await Axios.get("http://localhost:8080/api/v1/users/goUsers")
      setPosts(res.data.data)
      console.log(res.data.data);
    };
    fetchPost();
  }, []);
 

  const columns = [
    { dataField: "id", text: "ID", },
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
export default GoUser;