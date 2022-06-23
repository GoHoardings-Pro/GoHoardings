import React, { useState, useEffect } from "react";
import Axios from "axios";
import Pagination from "../../../helpingFiles/Pagination/Pajination";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../../../Components/Navbar/Sidebar";

const Accept = () => {

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerpage] = useState(10);

    useEffect(() => {

        const fetchPost = () => {
           const res = Axios.get("http://localhost:8080/api/v1/syncMedia/accepts")
            setPosts(res.data);
            console.log(res.data);
        };
        fetchPost();

        const rejectUser = (id) => {
            const res = Axios.put("http://localhost:8080/api/v1/syncMedia/accepts", {
                    id: id,
                })
                console.log(res.data);
                // setPosts(res)
            // Axios.put("http://localhost:8080/api/v1/syncMedia/accepts", {
            //     id: id,
            // }).then((res) => {
            //     setPosts(
            //         posts.map((val) => {
            //             return val.id != id;
            //         })
            //     );
            // });
        }
    })


    const indexOfLastPost = currentPage * postPerpage;
    const indexOfFirstPost = indexOfLastPost - postPerpage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="containers">

                <div className="container-sidebar">
                    <SideBar />
                </div>
                <div className="container-pages">
                </div>
                <center>
                    {/* making User tabel */}
                    <table className="table p-1 m-1">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Image</th>
                                <th scope="col">Media Code</th>
                                <th scope="col">Media Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Created Date</th>
                                <th scope="col">clientCode Date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* putting data on table by map function */}
                            {currentPosts.map((pos, index) => (
                                <tr key={pos.id}>
                                    <td>{index + 1}</td>
                                    <td>{posts.thumbnail}</td>
                                    <td>{pos.code}</td>
                                    <td>{pos.medianame}</td>
                                    <td>{pos.syncstatus}</td>
                                    <td>{pos.clientCode}</td>
                                    <td>{pos.created_date}</td>
                                    <td>
                                        <button
                                            onClick={() => rejectUser(pos.id)}
                                            className="button is-small is-danger"
                                        >
                                            Reject
                                        </button>
                                    </td>
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
                </center>
            </div>
        </div>

    );
};
export default Accept;
