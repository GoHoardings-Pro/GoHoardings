import React,{useState, useEffect} from 'react'
import "./Model.css"
import Axios from "axios"
import Pagination from "../Pagination/Pajination";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Model = ({closeModel}) => {
  const {userid} = useParams();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerpage] = useState(200);
  const [show, setShow] = useState(false);

  // getting database information

  useEffect(() => {
    const fetchPost = async () => {
      const res = await Axios.get(`http://localhost:8008/cart/cart/${userid}`);
      setPosts(res.data);
    };
    fetchPost();
  }, []);


  //Get Current Posts (Pagination)
  const indexOfLastPost = currentPage * postPerpage;
  const indexOfFirstPost = indexOfLastPost - postPerpage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggle = (index) => {
    if (show === index) {
      return setShow(null);
    }
    setShow(index);
  };
  return (
    <div className='modalBackground'>
    <div className='modalContainer'>
    <div className="titleCloseBtn">
        <button onClick={() => closeModel(false)}>X</button>
        </div>
        <div className="col-10">
      <div>
        <div className="container"></div>
      </div>
    
        {/* making User tabel */}
        <table className="table p-1 m-1">
          <thead className="thead-darK">
            <tr>
              <th scope="col">category_name</th>
              <th scope="col">code</th>
              <th scope="col">medianame</th>
              <th scope="col">location</th>
              <th scope="col">ftf</th>
              <th scope="col">page_title</th>
              <th scope="col">keyword</th>
              <th scope="col">meta_title</th>
              <th scope="col">email</th>
              <th scope="col">geoloc</th>
            </tr>
          </thead>
          <tbody>
            {/* putting data on table by map function */}
            {currentPosts.map((obj, index) => (
              <tr key={obj + 1}>
                <td>{index + 1}</td>
                <td>{obj.category_name } </td>
                <td>{obj.code}</td>
                <td>{obj.medianame}</td>
                <td>{obj.location}</td> 
                <td>{obj.ftf}</td> 
                <td>{obj.page_title}</td> 
                <td>{obj.keyword}</td> 
                <td>{obj.meta_title}</td> 
                <td>{obj.email}</td> 
                <td>{obj.geoloc}</td> 
              </tr>
            ))}
          </tbody>
        </table>
        {/* View of pagination */}
        <Pagination
          postPerpage={postPerpage}
          totalPosts={posts.length}
          paginate={paginate}
        />
    </div>
        <div className="footer">
            <button onClick={() => closeModel(false)}>Cancel</button>
            <button>Continue</button>
        </div>

    </div>
    </div>
  )
}

export default Model
