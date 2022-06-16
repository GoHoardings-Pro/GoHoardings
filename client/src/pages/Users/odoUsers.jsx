import React, { useState, useEffect } from 'react'
import Axios from "axios";
import Pagination  from '../../helpingFiles/Pagination/Pajination';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';



const User = () => {

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerpage] = useState(10);

     
// getting database information

useEffect(() => {
  const fetchPost = async() => {
    const res =  await Axios.get("http://localhost:8080/users/odoUsers")
    setPosts(res.data)
  };
  fetchPost();
}, []);


// Redirect to login page
  
   // Deleting the user from database
const deleteUser = async (id) => {
    // await Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
    //   setPosts(
    //     posts.filter((val) => {
    //       return val.id != id;
    //     })
    //   );
    // });
  };
  
  

  //Get Current Posts (Pagination)
  const indexOfLastPost = currentPage * postPerpage;
  const indexOfFirstPost = indexOfLastPost - postPerpage;
  const currentPosts = posts.slice(indexOfFirstPost ,indexOfLastPost)
  const paginate = pageNumber => setCurrentPage(pageNumber)



// tabel aceding and secding
  
  


return (
        //Navbar
      <div>
        
	    <span>
          || Go to page:{" "}
          <input
            type="number"
            defaultValue={paginate + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              paginate(page);
            }}
            style={{ width: "50px" }}
          />
        </span>{" "}
		
		
		 <select
          value={postPerpage}
          onChange={e => {
            currentPosts(postPerpage(e.target.value))
          }}
        >
          {[10, 20, 30].map(postPerpage => (
            <option  value={postPerpage}>
              Show {postPerpage}
            </option>
          ))}
        </select>
    <center>
      {/* making User tabel */}
    <table className="table p-1 m-1">
    <thead className="thead-dark ">
        <th scope="col" 
        >ID</th>
        <th scope="col"
        >Company
        </th>
        
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col">Created Date</th>
        <th scope="col">Synced Media</th>
        <th scope="col">UnSynced Media</th>
        <th scope="col">Updated Media</th>
        <th scope="col">Action</th>
     </thead>
    <tbody>
      {/* putting data on table by map function */}
{ currentPosts.map((posts, index ) => (
    <tr key={ posts.id }>
        <td>{ index + 1 }</td>
        <td>{ posts.name }</td>
        <td>{ posts.contact_firstname }</td>
        <td>{ posts.contact_email }</td>
        <td>{ posts.contact_phone }</td>
        <td>{ posts.created }</td>
        <td>{  posts.synced_media }</td>
        <td>{ posts.unsynced_media }</td>
        <td>{ posts.updates_media }</td>
        <td><Link to={`/edit/${posts.id}`} className="button is-small is-info">Edit</Link>
      <button onClick={ () => deleteUser(posts.id)}className="button is-small is-danger">Delete</button>
    </td>
  
</tr>
 )) }          
  </tbody>
  </table>
  {/* View of pagination */}
  <Pagination postPerpage={postPerpage}  totalPosts={posts.length} paginate={paginate} />
      </center>
  </div>
     
      )};
export default User;