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
import Switch from "react-switch"
import { Pagination } from "antd"
import Axios from "axios"


const Odousers = () => {

  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState("")
  const [page, setPage] = useState(1)
  const [postPerpage, setPostPerPage] = useState(10)
  const [query, setQuery] = useState("")


  useEffect(() => {
    const fetchPost = async () => {
      const res = await Axios.get("http://localhost:8080/api/v1/users/odoUsers")
      setPosts(res.data.data)
      setTotal(res.data.data.length)

    };
    fetchPost();
  }, []);



  const handel = (id) => {
    Axios.post("http://localhost:8080/api/v1/users/odoUsers", {
      id: id
    }).then((res) => {
      setPosts(res.data)
    })
  }

  const headers = [
    { key: "id", label: "ID" },
    { key: "company", label: "Company" },
    { key: "name", label: "Name" },
    { key: "contact_firstname", label: "Contact_Firstname" },
    { key: "email", label: "Email" },
    { key: "contact_phone", label: "Phone" },
    { key: "created", label: "Created Date" },
    { key: "synced_media", label: "Synced_Media" },
    { key: "unsynced_media", label: "Unsynced_Media" },
    { key: "updates_media", label: "Updates_Media" },
    { key: "switch", label: "Toggle" },
  ]

  //Get Current Posts (Pagination)
  const indexOfLastPage = page * postPerpage;
  const indexOfFirstPage = indexOfLastPage - postPerpage;
  const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPage);


  const onShowSizeChange = (current, pageSize) => {
    setPostPerPage(pageSize)
  }

  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>
    }
    if (type === "next") {
      return <a>Next</a>
    }
    return originalElement
  }



  return (
    <>
      <div className="containers">

        <div className="container-sidebar">
          <SideBar />
        </div>
        <div className="container-pages">
        <div>
        <center className="m-1 p-1">
          <input placeholder="Enter Post Title" onChange={event => setQuery(event.target.value)} />
        </center>
      </div>
      <center>
        {/* making User tabel */}
        <table className="table table-bordered">
          <thead className="thead-dark ">
            <tr>
              {headers.map((row) => {
                return <td key={row.key}>{row.label}</td>
              })}
            </tr>
          </thead>
          <tbody>
            {/* putting data on table by map function */}
            {currentPosts.filter(obj => {
              if (query == '') {
                return obj;
              } else if (obj.name.toLowerCase().includes(query.toLowerCase()) || obj.created.toLowerCase().includes(query.toLowerCase()) || obj.contact_email.toLowerCase().includes(query.toLowerCase())) {
                return obj;
              }
            }).map((posts, index) => (
              <tr key={posts.id}>
                <td>{index + 1}</td>
                <td>{posts.name}</td>
                <td>{posts.contact_firstname}</td>
                <td>{posts.contact_email}</td>
                <td>{posts.contact_phone}</td>
                <td>{posts.created}</td>
                <td>{posts.synced_media}</td>
                <td>{posts.unsynced_media}</td>
                <td>{posts.updates_media}</td>
                <td>
                  <Switch
                    onChange={() => handel(posts.id)}
                    checked={posts.status === 0 ? true : false}
                  />

                </td>

              </tr>
            ))}
          </tbody>
        </table>
        {/* View of pagination */}

        <div className="section">
          <Pagination
            onChange={(value) => setPage(value)}
            pageSize={postPerpage}
            total={total}
            current={page}
            showSizeChanger
            showQuickJumper
            onShowSizeChange={onShowSizeChange}
            itemRender={itemRender}
          />
        </div>

      </center>
        </div>
      </div>
    </>

  )
};
export default Odousers;