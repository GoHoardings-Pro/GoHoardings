// import React, { useState, useEffect } from "react";
// import Axios from "axios";
// import Pagination from "../../helpingFiles/Pagination/Pajination";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Modal from "react-modal"


// Modal.setAppElement("#root")
// const User = () => {
//   const [posts, setPosts] = useState([]);
//   const [gosts, setGosts] = useState([]);
//   const [modalisopen, setmodalisopen] = useState(false)
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postPerpage] = useState(100);

//  useEffect(() => {
//      Axios.post("http://localhost:8080/cart/cart")
//       .then((res) => {
//         setPosts(res.data);
//       }); 
//       getData()
//  },[])

//  const getData = async(userid) => {
//   await Axios.put("http://localhost:8080/cart/applycart/",{
//     userid:userid
// }).then((response) => {
//     setGosts(response.data)
//   })
// }


//   //Get Current Posts (Pagination)
//   const indexOfLastPost = currentPage * postPerpage;
//   const indexOfFirstPost = indexOfLastPost - postPerpage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//          <table className="table p-1 m-1">
//           <thead className="thead-darK">
//             <tr>
//               <th scope="col">ID</th>
//               <th scope="col">Name</th>
//               <th scope="col">Email</th>
//               <th scope="col">UserID</th>
//               <th scope="col">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* putting data on table by map function */}
//             {currentPosts.map((obj, index) => (
//               <tr key={obj.id}>
//                 <td>{index + 1}</td>
//                 <td>{obj.firstname }{  obj.lastname}</td>
//                 <td>{obj.email}</td>
//                 <td>{obj.userid}</td>
//                 <td>
//                   <button
//                    onClick={() => {getData(obj.userid);setmodalisopen(true);} }
//                     className="button is-small is-info"   
//                   >
//                     Show
//                   </button>
//                 </td>
                 
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <Modal isOpen={modalisopen} 
//        shouldCloseOnOverlayClick={false} 
//        onRequestClose={() => setmodalisopen(false)}
//        style={{
//         overlay: {
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(255, 255, 255, 0.75)'
//         },
//         content: {
//           position: 'absolute',
//           top: '40px',
//           left: '40px',
//           right: '40px',
//           bottom: '40px',
//           border: '1px solid #ccc',
//           background: '#fff',
//           overflow: 'auto',
//           WebkitOverflowScrolling: 'touch',
//           borderRadius: '4px',
//           outline: 'none',
//           padding: '20px',
//           color: 'blue'
//         }
//       }}>
//           <div className="form-group">  
// <table className="table p-1 m-1">
//           <thead className="thead-darK">
//             <tr>
//               <th scope="col">ID</th>
//               <th scope="col">Category Name</th>
//               <th scope="col">Code</th>
//               <th scope="col">Media Name</th>
//               <th scope="col">Location</th>
//               <th scope="col">Page_Title</th>
//               <th scope="col">keyword</th>
//               <th scope="col">Meta_Title</th>
//               <th scope="col">Google Location</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* putting data on table by map function */}
//             {gosts.map(posts.id =  (value, index) => (
//               <tr key={value.id}>
//                 <td>{index + 1}</td>
//                 <td>{value.category_name}</td>
//                 <td>{value.code}</td>
//                 <td>{value.medianame}</td>
//                 <td>{value.location}</td>
//                 <td>{value.keyword}</td>
//                 <td>{value.meta_title}</td>
//                 <td>{value.email}</td>
//                 <td>{value.geoloc}</td>  
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button  onClick={() => setmodalisopen(false)}>Close</button> 
//           </div>
         
//        </Modal> 
//         <Pagination
//           postPerpage={postPerpage}
//           totalPosts={posts.length}
//           paginate={paginate}
//         /> 
//     </div>
//   );
// };
// export default User;
