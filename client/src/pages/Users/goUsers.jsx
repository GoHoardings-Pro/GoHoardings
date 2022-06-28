import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import PaginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import SideBar from "../../Components/Navbar/Sidebar";
import {Pagination} from "antd"
import Switch from "react-switch"




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
 

  // const columns = [
  //   { dataField: "id", text: "ID", },
  //   { dataField: "profile_image", formatter: imageFormatter, text: "Image" },
  //   { dataField: "firstname", text: "Name", sort: true },
  //   { dataField: "lastname", text: "Last Name", sort: true },
  //   { dataField: "email", text: "Email", sort: true },
  //   { dataField: "phonenumber", text: "Phone_Number", sort: true },
  // ];

  // function imageFormatter(cell) {
  //   return <img src={cell} style={{ width: "100px", height: "100px" }} />;
  // }

  // const pagintion = PaginationFactory({
  //   page: 1,
  //   sizePerPage: 10,
  //   lastPageText: ">>",
  //   firstPageText: "<<",
  //   nextPageText: ">",
  //   prevPageText: ">",
  //   showTotal: true,
  //   alwaysShowAllBtns: true,
  // });


  const getData = async(userid) => {
    await Axios.put("http://localhost:8080/api/v1/users/goUsers",{
      userid:userid
  }).then((response) => {
      setGosts(response.data)
      console.log(response.data);
    })
  }
  
  const toggle = index => {
    if(show === index){
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
    if (type === "prev"){
      return <a>Previous</a>
    }
    if(type === "next"){
      return <a>Next</a>
    }
    return originalElement
  }
  
  const handel = (id) => {
    Axios.post("http://localhost:8080/api/v1/users/goUsers",{
     id : id
    }).then((res) => {
      setPosts(res.data)
      console.log(res.data);
     })
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
      <table className="table table-bordered">
        <thead className="thead-darK">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">UserID</th>
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
            <tr key={obj.id}>
              <td>{index + 1}</td>
              <td>{obj.firstname}{obj.lastname}</td>
              <td>{obj.email}</td>
              <td>{obj.userid}</td>
              <td>
                <Switch
                  onChange={() => handel(obj.id)}
                  checked={obj.invoice_emails === 0 ? true : false}
                />
              </td>
              <td>
                <button
                  onClick={() => { getData(obj.userid); toggle(index) }}
                  className="button is-small is-info" >
                  Show
                </button>
              </td>
              <div>
                {show === index ? [
                  <table className="table p-1 m-1">
                    <thead className="thead-darK">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Code</th>
                        <th scope="col">Media Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Media Detail</th>
                        <th scope="col">keyword</th>
                        <th scope="col">Meta_Title</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Campaig Id</th>
                        <th scope="col">Switch</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* putting data on table by map function */}
                      {gosts.map(posts.id = (value, index) => (
                        <tr key={value.id}>
                          <td>{index + 1}</td>
                          <td>{value.category_name}</td>
                          <td>{value.code}</td>
                          <td>{value.medianame}</td>
                          <td>{value.location}</td>
                          <td>{value.keyword}</td>
                          <td>{value.ftf}</td>
                          <td>{value.email}</td>
                          <td>{value.status}</td>
                          <td>{value.created}</td>
                          <td>{"Campaig_Id=" + value.campaigid}</td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                ] : null}
              </div>
            </tr>
          ))}
        </tbody>
      </table>
      <center className="m-5 p-5">
        <div >
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
        </div></div>
    </>

  )
};
export default GoUser;