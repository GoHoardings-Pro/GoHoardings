import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "antd"
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../../../Components/Navbar/Sidebar";

const Accept = () => {

  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState("")
  const [page, setPage] = useState(1)
  const [postPerpage, setPostPerPage] = useState(10)
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fatchData = async () => {
      const { data } = await axios.get("http://localhost:8080/api/v1/syncMedia/accepts")
      setPosts(data);
      setTotal(data);
console.log(data);
    };
    fatchData();
  }, [setPosts])


  const updateStatus = async (id, e) => {
    //      e.preventDefault();
    // const { data } = await axios.put("http://localhost:8080/api/v1/syncMedia/accepts", {
    //         id: id,
    //     })
  }



  const getpost = (
    allocate_end_date,
    allocate_start_date,
    areadescription,
    available_date,
    block_limit,
    category_id,
    city,
    client,
    clientCode,
    code,
    created_date,
    district,
    foot_fall,
    ftf,
    geolocation,
    height,
    heightunit,
    id,
    illumination,
    isBlocked,
    isBooked,
    isDelete,
    is_goh_update,
    lhs_rhs,
    location,
    medianame,
    modify_date,
    owner,
    price,
    pricetype,
    saleasbunch,
    searchingkeywords,
    slot_duration,
    slot_per_day,
    state,
    status,
    sub_category_id,
    syncdescription,
    syncstatus,
    thumbnail,
    totalno,
    width,
    widthunit) => {
    axios.put("/api/v1/syncMedia/accepts/", {
      allocate_end_date: allocate_end_date,
      allocate_start_date: allocate_start_date,
      areadescription: areadescription,
      available_date: available_date,
      block_limit: block_limit,
      category_id: category_id,
      city: city,
      client: client,
      clientCode: clientCode,
      code: code,
      created: created_date,
      district: district,
      foot_fall: foot_fall,
      ftf: ftf,
      geolocation: geolocation,
      height: height,
      heightunit: heightunit,
      id: id,
      illumination: illumination,
      isBlocked: isBlocked,
      isBooked: isBooked,
      isDelete: isDelete,
      is_goh_update: is_goh_update,
      lhs_rhs: lhs_rhs,
      location: location,
      medianame: medianame,
      modify_date: modify_date,
      owner: owner,
      price: price,
      pricetype: pricetype,
      saleasbunch: saleasbunch,
      searchingkeywords: searchingkeywords,
      slot_duration: slot_duration,
      slot_per_day: slot_per_day,
      state: state,
      status: status,
      sub_category_id: sub_category_id,
      syncstatus: syncstatus,
      syncdescription: syncdescription,
      thumbnail: thumbnail,
      totalno: totalno,
      width: width,
      widthunit: widthunit
    }).then((res) => {
      setPosts(
        posts.map((val) => {
          return val.id != id;
        })
      );
    })
  }


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

console.log(posts);
  return (
    <>         
    {posts &&
      <div>
        <div className="containers">

          <div className="container-sidebar">
            <SideBar />
          </div>
          <div className="container-pages">
          <div className="page-title"><h2>UnSync</h2></div>
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
              <table className="table table-boarder table-hover table-striped  table-sm">
                    <thead className="thead-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Image</th>
                    <th scope="col">Media Code</th>
                    <th scope="col">Media Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">clientCode</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Action Reject</th>
                    <th scope="col">Action Accept</th>
                  </tr>
                </thead>
                <tbody>
                  {/* putting data on table by map function */}
                  { currentPosts.filter(obj => {
                if (query == '') {
                  return obj;
                } else if (obj.code.toLowerCase().includes(query.toLowerCase()) || obj.medianame.toLowerCase().includes(query.toLowerCase()) 
                || obj.syncstatus.toLowerCase().includes(query.toLowerCase()) || obj.clientCode.toLowerCase().includes(query.toLowerCase()) ) {
                  return obj;
                }
              }).map((pos, index) => (
                    <tr key={pos.id}>
                      <td>{index + 1}</td>
                      <td style={{width:'20%'}} >{pos.thumbnail ? <img src={pos.thumbnail} alt={pos.medianame}  style={{width:'50%'}}  />: "No Image Found" } </td>
                      <td>{pos.code}</td>
                      <td>{pos.medianame}</td>
                      <td>{pos.syncstatus}</td>
                      <td>{pos.clientCode}</td>
                      <td>{pos.created_date.slice(0,10)}</td>
                      <td><button onClick={(e) => updateStatus(pos.id, e)} className="button is-small is-danger">Reject</button></td>
                      <td>
                        <button
                          // onClick={() => getpost(pos.clientCode,pos.id,pos.allocate_end_date,pos.city)}
                          onClick={() => getpost(
                            pos.allocate_end_date,
                            pos.allocate_start_date,
                            pos.areadescription,
                            pos.available_date,
                            pos.block_limit,
                            pos.category_id,
                            pos.city,
                            pos.client,
                            pos.clientCode,
                            pos.code,
                            pos.created_date,
                            pos.district,
                            pos.foot_fall,
                            pos.ftf,
                            pos.geolocation,
                            pos.height,
                            pos.heightunit,
                            pos.id,
                            pos.illumination,
                            pos.isBlocked,
                            pos.isBooked,
                            pos.isDelete,
                            pos.is_goh_update,
                            pos.lhs_rhs,
                            pos.location,
                            pos.medianame,
                            pos.modify_date,
                            pos.owner,
                            pos.price,
                            pos.pricetype,
                            pos.saleasbunch,
                            pos.searchingkeywords,
                            pos.slot_duration,
                            pos.slot_per_day,
                            pos.state,
                            pos.status,
                            pos.sub_category_id,
                            pos.syncdescription,
                            pos.syncstatus,
                            pos.thumbnail,
                            pos.totalno,
                            pos.width,
                            pos.widthunit
                          )}
                          className="button is-small is-danger"
                        >
                          Accept
                        </button>
                      </td>
                    </tr>))
                  }
                </tbody>
              </table>

              {/* View of pagination */}
            </div>


          </div>
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
    }
    </>


  );
};
export default Accept;
