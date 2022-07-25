import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
// import PaginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import SideBar from "../../Components/Navbar/Sidebar";
import { Pagination } from "antd"
// import {Multiselect} from 'multiselect-react-dropdown'
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
  const [query, setQuery] = useState("");
  const [button, setButton] = useState('Show')



  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await Axios.get("/api/v1/users/goUsers")
      setPosts(data.data)
      setTotal(data.data.length)
    };
    fetchPost();

  }, []);



  const getData = async (userid) => {
    const { data } = await Axios.put("/api/v1/users/goUsers", { userid: userid })
    console.log(data);
    setGosts(data)
    // console.log(data);

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

  const handel = async (id) => {
    const { data } = await Axios.post("/api/v1/users/goUsers", { id: id })
    setPosts(data)
  }


  return (
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
            <option selected value="10">10 / pages</option>
            <option value="20">20 / pages</option>
            <option value="30">30 / pages</option>
            <option value="40">40 / pages</option>
          </select>



          <div className="search-input">
            <div class="search-box">
              <input placeholder="Search..." onChange={event => setQuery(event.target.value)} />
              <i className="fas fa-search icon"></i>
            </div>


          </div>
        </div>
        <div>
          <table className="table table-boarder table-hover table-striped table-sm">
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

              {currentPosts.filter(obj => {
                if (query == '') {
                  return obj;
                } else if (obj.firstname.toLowerCase().includes(query.toLowerCase()) || obj.email.toLowerCase().includes(query.toLowerCase())) {
                  return obj;
                }
              }).map((obj, index) => (
                <>
                  <tr key={obj.id} >
                    <td style={{justifyContent:'center'}}>{index + 1}</td>
                    <td>{obj.firstname}{obj.lastname}</td>
                    <td>{obj.email ? obj.email : '**N/A**'}</td>
                    <td>{obj.userid }</td>
                    <td>{obj.phonenumber || '**N/A**'}</td>
                    <td><Switch onChange={() => handel(obj.id)} checked={obj.invoice_emails === 0 ? true : false} /> </td>
                    <td><button onClick={() => { getData(obj.userid); toggle(index) }} className="button is-small is-info" >{button}</button></td>
                  </tr>
                  <tr className="modalView">
                    {show === index ?
                      <td colSpan={7}>
                        {gosts.length > 0 ?
                          <>
                            <div >

                              <div className="dataModal">
                                <table className="table table-boarder table-hover table-striped  table-sm">
                                  <thead>
                                    <tr>
                                      <th scope="col">S.No</th>
                                      <th scope="col">Campaign Name</th>
                                      <th scope="col">Categories</th>
                                      <th scope="col">Status</th>
                                      <th scope="col">Date</th>
                                      <th scope="col">Media Details</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {gosts.map(posts.id = (value, index) => (
                                      <tr key={value.id}>
                                        <td>{index + 1}</td>
                                        <td>{value.campaigid}</td>
                                        <td>{value.category_name}</td>
                                        <td>{value.status === 1 ? "Booked" : "Pending"}</td>
                                        <td>{(value.created.slice(0,10))}</td>
                                        <td>{<a href={`https://gohoardings.com/services/${value.category_name}/${value.meta_title}`} target='_blanck'>{value.meta_title}</a>}</td>
                                        {/* <td>{ <a href={`https://gohoardings.com/services/mall-media/facade-dlf-promenade-delhi`} target='_blanck'>{value.meta_title}</a> }</td> */}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </>
                          :
                          <>
                            <div className="noDataModal">
                              <span><i class="fa-solid fa-triangle-exclamation"></i>NoData</span>
                            </div>
                          </>
                        }
                      </td> : null}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
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
              onShowSizeChange={onShowSizeChange}
              itemRender={itemRender}
            />
          </div>
        </div>
      </div>
    </div>
  )
};
export default GoUser;