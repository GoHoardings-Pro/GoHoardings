import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import PaginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import SideBar from "../../Components/Navbar/Sidebar";
import { Pagination } from "antd"
import Switch from "react-switch"

import './goUsers.css'




import Axios from "axios"


const GoUser = () => {

  const [posts, setPosts] = useState([]);
  const [gosts, setGosts] = useState([]);
  const [total, setTotal] = useState("")
  const [page, setPage] = useState(1)
  const [postPerpage, setPostPerPage] = useState(10)
  const [show, setShow] = useState(false[0])
  const [query, setQuery] = useState("")


  useEffect(() => {
    const fetchPost = async () => {
      const res = await Axios.get("http://localhost:8080/api/v1/users/goUsers")
      setPosts(res.data.data)
      setTotal(res.data.data.length)
    };
    fetchPost();
  }, []);



  const getData = async (userid) => {
    await Axios.put("http://localhost:8080/api/v1/users/goUsers", {
      userid: userid
    }).then((response) => {
      setGosts(response.data)
      console.log(response.data);
    })
  }

  const toggle = index => {
    if (show === index) {
      return setShow(null)
    }
    setShow(index)
  }

  //Get Current Posts (Pagination)
  const indexOfLastPage = page * postPerpage;
  const indexOfFirstPage = indexOfLastPage - postPerpage;
  const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPage);



  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>
    }
    if (type === "next") {
      return <a>Next</a>
    }
    return originalElement
  }

  const handel = (id) => {
    Axios.post("http://localhost:8080/api/v1/users/goUsers", {
      id: id
    }).then((res) => {
      setPosts(res.data)
    })
  }
  console.log(gosts);


  return (
    <>
      <div className="containers">

        <div className="container-sidebar">
          <SideBar />
        </div>
        <div className="container-pages">
          <div className="page-title">
            <h4>CLIENT</h4>
          </div>
          <div className="container-page-top">
            <select class="custom-select" onChange={(e) => setPostPerPage(e.target.value)}>
              <option selected value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select> <span style={{ marginLeft: '10px' }}> records per page </span>
            <div className="search-input">
              <input placeholder="Enter Post Title"
                onChange={event => setQuery(event.target.value)} />
            </div>

          </div>
          <table className="table">
            <thead className="thead-darK">
              <tr>
                <th scope="col">S.NO</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">UserID</th>
                <th scope="col">Contact NO</th>
                <th scope="col">Switch</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* putting data on table by map function */}
              {currentPosts.filter(obj => {
                if (query == '') {
                  return obj;
                } else if (obj.firstname.toLowerCase().includes(query.toLowerCase()) || obj.email.toLowerCase().includes(query.toLowerCase())) {
                  return obj;
                }
              }).map((obj, index) => (
                <>
                  <tr key={obj.id}>
                    <td>{index + 1}</td>
                    <td>{obj.firstname}{obj.lastname}</td>
                    <td>{obj.email}</td>
                    <td>{obj.userid}</td>
                    <td>{obj.phonenumber}</td>
                    <td><Switch onChange={() => handel(obj.id)} checked={obj.invoice_emails === 0 ? true : false} /> </td>
                    <td><button onClick={() => { getData(obj.userid); toggle(index) }} className="button is-small is-info" > Show</button></td>
                  </tr>
                  {show === index ?
                    <div className="modalView">
                      {gosts.length ?
                        <>
                          <div className="dataModal">
                          <div className="dataModalHead">
                            <strong>1</strong>
                            <strong>1</strong>
                            <strong>1</strong>
                            <strong>1</strong>
                            <strong>1</strong>
                          </div>
                          <div className="dataModalValue">
                            <span>aba</span>
                            <span>aba</span>
                            <span>aba</span>
                            <span>aba</span>
                            <span>aba</span>
                          </div>
                          </div>
                        </> :
                        <>
                          <div className="noDataModal">
                            <span><i class="fa-solid fa-triangle-exclamation"></i>NoData</span>
                          </div>
                        </>}
                    </div>
                    // <table className="table p-1 m-1">
                    //   <thead className="thead-darK">
                    //     <tr>
                    //       <th scope="col">Campaign Name</th>
                    //       <th scope="col">Media Detail</th>
                    //       <th scope="col">Status</th>
                    //       <th scope="col">Date</th>

                    //     </tr>
                    //   </thead>
                    //   <tbody>
                    //     {/* putting data on table by map function */}
                    //     {gosts.map(posts.id = (value, index) => (
                    //         <tr key={value.id}>

                    //         <td>{value.campaigid}</td>
                    //         <td>{value.category_name}</td>
                    //         <td>{value.status === 1 ? "Booked" : "Pending"}</td>
                    //         <td>{value.created}</td>

                    //         {/* <td>{"Campaig_Id=" + value.campaigid}</td> */}

                    //       </tr>
                    //     ))}
                    //   </tbody>
                    // </table>
                    : null}


                </>
              ))}
            </tbody>
          </table>
          <div className="conatainer-page-bottom">
            <div className="details">
              <span> Showing {page * postPerpage - postPerpage + 1} to {page * postPerpage} of {total} entries</span>
            </div>
            <div className="pagination">
              <Pagination
                onChange={(value) => setPage(value)}
                pageSize={postPerpage}
                total={total}
                current={page}
                showSizeChanger
                showQuickJumper
                itemRender={itemRender}
              />
            </div>

          </div>

        </div></div>
    </>

  )
};
export default GoUser;