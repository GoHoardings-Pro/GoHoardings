import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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

 


  const fetchPost = async () => {
    const {data} = await Axios.get("/api/v1/users/odoUsers")
    setPosts(data)
    setTotal(data.length)
  };
console.log(posts);
  useEffect(() => {
    
    fetchPost();
  }, []);



  const handel = async (id) => {
    console.log(id);
    const {data} = await Axios.post("/api/v1/users/odoUsers", {id:id})
    setPosts(data)
  }
 
  const headers = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "code", label: "Code" },
    { key: "email", label: "Email" },
    { key: "contact_phone", label: "Phone" },
    { key: "created", label: "Date" },
    // { key: "unsynced_media", label: "Unsynced_Media" },
    { key: "synced_media", label: "Synced_Media" },
    // { key: "updates_media", label: "Updates_Media" },
    { key: "switch", label: "Toggle" },
  ]

  // Get Current Posts (Pagination)
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
      <div className="containers">

        <div className="container-sidebar">
          <SideBar />
        </div>
        <div className="container-pages">
          <div className="page-title">
            <h2>VENDERS</h2>
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
            {/* making User tabel */}
            <table className="table table-boarder table-hover table-striped table-sm">
                    <thead className="thead-dark">
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
                  } else if (obj.name.toLowerCase().includes(query.toLowerCase()) || obj.code.toLowerCase().includes(query.toLowerCase())) {
                    return obj;
                  }
                }).map((posts, index) => (
                  <tr key={posts.id}>
                    <td>{index + 1}</td>
                    <td>{posts.name}</td>
                    <td>{posts.code}</td>
                    <td>{posts.contact_email ? posts.contact_email : '**N/A**'}</td>
                    <td>{posts.contact_phone ? posts.contact_phone : '**N/A**'}</td>
                    <td>{posts.created.slice(0,10)}</td>
                    {/* <td>  posts.unsynced.unsynced : "NoData" }</td> */}
                    <td>{posts.synced}</td>
                    {/* <td>   posts.updated.updated : "NoData" }</td> */}
                    <td>
                      <Switch
                        onChange={() => handel(posts.id)}
                        checked={posts.status == 0 }
                      />

                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
            {/* View of pagination */}

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
     </div>
  )
};
export default Odousers;