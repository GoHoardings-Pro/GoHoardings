import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import Select from 'react-select'
import SideBar from '../../Components/Navbar/Sidebar'
import './Media.css'
import axios from "axios";


const options = ["None", "Airport LED", "Airport Media", "Auto Advertising", "Backlit Mupi", "Backlit Totems", "Bench", "Billboard", "Boom Panel", "Bridge Panel",
    "Bridge Pillar", "Building Facade", "Bus Branding", "Bus LED Screen", "Bus Shelter", "Cantilever", "Cab Branding", "Cinema LED Screen", "Cycle Shelter",
    "Departmental Store LED Screen", "Digital OOH", "Digital Screen", "Dustbin", "Flag Sign", "Flight Media", "Foot Over Bridge", "Front Facade", "Gantry",
    "Hoarding", "Hoarding LED", "In Flight Branding", "Led", "Lolipops", "Mall LED", "Mall Media", "Metro Bridge Panel", "Metro LED", "Metro Panel", "Metro Pillars", "Metro Signage",
    "Metro Station Facade", "Metro Train", "Mini Unipole", "Offices", "Mobile Van", "Neon Billboard", "Piller Wrap", "Pole Kiosks", "Police Booth", "Public Utility", "Railway Station LED", "Side Panel", "Signages",
    "Smart Boards", "Smart Bus Shelter", "Standee Unit", "Subway Panel", "Traditional OOH Media", "Traffic Booth", "Traffic Junction", "Traffic media", "Train LED Screen", "Train Wrap", "Transit Media", "Tripod", "Unipole", "Unipole LED",
    "Vending Kiosk", "Wall Wrap", "Water ATM"]




const Media = () => {

    const [code, setCode] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState("");
    const [illumination, setIllumination] = useState("");
    const [company, setCompany] = useState("");
    const [getCity, setgetcity] = useState([]);
    const [getcomp, setcomp] = useState([]);
    const [Users, fetchUsers] = useState([]);
    // const [cityname, setcityname] = useState([])
    // const [compname, setcompname] = useState([])
    // const [state, setState] = useState(false);
    const [formData, setFormData] = useState({});





    const ShowDetails = async () => {
        const requestOptions = {
            body: JSON.stringify({
                code: code,
                city: city,
                location: location,
                category: category,
                subcategory: subcategory,
                illumination: illumination,
                company: company,
            }),
        };
        const { data } = await axios.post('/api/v1/media/inventory', requestOptions)

        fetchUsers(data)
        // console.log(data);

    };

    const Showcity = async () => {
        const { data } = await axios.get(`/api/v1/media/city`)
        setgetcity(data)
    };

    let City = [];
    let Cities = []
    getCity.forEach((obj) => {
        City.push({ label: obj.name, value: obj.name })
        Cities.push(obj.name)
    });

    const ShowCompany = async () => {
        const { data } = await axios.get(`/api/v1/media/company`)
        setcomp(data)

    };

    let Comp = [];
    getcomp.forEach((value) => {
        Comp.push({ label: value.name, value: value.name })

    });

    let MediaOption = [
        { label: "traditional-ooh-media", value: "traditional-ooh-media" }, {
            label: "digital-media", value: "digital-media"
        }, {
            label: "transit-media", value: "transit-media"
        }, {
            label: "mall-media", value: "mall-media"
        }, {
            label: "airport-media", value: "airport-media"
        }, {
            label: "inflight_media", value: "inflight_media"
        }, {
            label: "office-media", value: "office-media"
        }
    ]
    // const MediaOption = ['traditional-ooh-media',"digital-media","transit-media","mall-media","airport-media","inflight_media","office-media"]




    useEffect(() => {
        Showcity();
        ShowCompany();
    }, []);


    // const form1Ref = useRef(null);
    // const form2Ref = useRef(null);


    const changeHandler = (e, tab) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    // useEffect(() => {
    //     if (formData?.mediaCode || formData?.mediaCompanyName) {
    //         form2Ref.current.classList.add('formHide2')
    //     } else {
    //         form2Ref.current.classList.remove('formHide2')
    //     }

    //     if (formData?.mediaCategory || formData?.city || formData?.location || formData?.subcategory || formData?.type) {
    //         form1Ref.current.classList.add('formHide')
    //     } else {
    //         form1Ref.current.classList.remove('formHide')
    //     }
    // }, [formData, city])

    const clickHandler = (form) => {



    }

    const submithandler = (e) => {
        e.preventDefault();
        console.log(formData);
    }
    const mediaRef = useRef(null);
    const mediaCompanyRef = useRef(null);
    const otherRef = useRef(null);


    const mediaFormRef = useRef(null);
    const mediaCompanyFormRef = useRef(null);
    const otherFormRef = useRef(null);


    const switchTab = (e, tab) => {
        console.log(tab);

        if (tab === 'media') {
            mediaFormRef.current.classList.remove('userProfileHidden')
            mediaCompanyFormRef.current.classList.add('userProfileHidden')
            otherFormRef.current.classList.add('userProfileHidden')

            mediaRef.current.classList.add('navActive')
            mediaCompanyRef.current.classList.remove('navActive')
            otherRef.current.classList.remove('navActive')



        }

        if (tab === 'mediaCompany') {
            mediaFormRef.current.classList.add('userProfileHidden')
            mediaCompanyFormRef.current.classList.remove('userProfileHidden')
            otherFormRef.current.classList.add('userProfileHidden')

            mediaRef.current.classList.remove('navActive')
            mediaCompanyRef.current.classList.add('navActive')
            otherRef.current.classList.remove('navActive')


        }
        if (tab === 'other') {
            mediaFormRef.current.classList.add('userProfileHidden')
            mediaCompanyFormRef.current.classList.add('userProfileHidden')
            otherFormRef.current.classList.remove('userProfileHidden')

            mediaRef.current.classList.remove('navActive')
            mediaCompanyRef.current.classList.remove('navActive')
            otherRef.current.classList.add('navActive')


        }



    }



    return (
        <>
            <div className="containers">
                <div className="container-sidebar">
                    <SideBar />
                </div>
                <div className="container-pages">
                    <div className="page-title">
                        <h2>Media Inventory</h2>
                    </div>

                    <div className="permissionFilters">
                        <div className="permissionFilter">
                            <div className="existUser navActive" ref={mediaRef} onClick={(e) => switchTab(e, 'media')}>
                                <strong>Media Code</strong>
                            </div>
                            <div className="newPermission " ref={mediaCompanyRef} onClick={(e) => switchTab(e, 'mediaCompany')}>
                                <strong>Media Company Name</strong>

                            </div>
                            <div className="newPermission " ref={otherRef} onClick={(e) => switchTab(e, 'other')}>
                                <strong>Others</strong>

                            </div>
                        </div>
                        <div className="permissionRole" ref={mediaFormRef}>
                            <form className="form" >
                                <div>
                                    <label for="exampleFormControlInput1">Media Code :</label>
                                    <input type="text" id="search" name="mediaCode" placeholder="media code .." onChange={(e) => changeHandler(e, "form1")} autoFocus/>
                                </div>
                                <input type="submit" value={"Search"}  />
                            </form>
                        </div>
                        <div className="permissionRole userProfileHidden" ref={mediaCompanyFormRef}>
                            <form className="form">
                                <div>
                                    <label for="exampleFormControlInput1">Media Company :</label>
                                    <input type="text" id="search" name="mediaCompany" placeholder="mediaCompany" onChange={(e) => changeHandler(e, "form1")} autoFocus/>
                                </div>
                     
                                <input type="submit" value={"Search"} />
                            </form>
                        </div>
                        <div className="permissionRole userProfileHidden" ref={otherFormRef}>
                            <form className="form">
                                <div className='otherform'>
                                    <label>Media Category:</label>
                                    <Select options={MediaOption} />
                                </div>
                                <div className='otherform'>
                                    <label>Media Subcategory:</label>
                                    <Select
                                        // onChange={changeHandler}
                                        isMulti
                                        name="colors"
                                        options={Comp}
                                        className="basic-multi-select"
                                        classNamePrefix="select" />
                                </div>
                                <div className='otherform'>
                                    <label>City:</label>
                                    <Select
                                        options={City}
                                        displayValue="value"
                                    // onSelect={setCity}

                                    />
                                    {/* <input type="text" id='search' name="city" onChange={changeHandler}   placeholder="City ...." /> */}
                                </div>
                                <div className='otherform'>
                                <label>Location:</label>
                                <Select type="text" className="all" name="location" onChange={changeHandler} ></Select>
                                </div>
                                <div className='otherform'>
                                    <label for='type'>Illimination Type:</label>
                                    <Select name="type" id="type" onChange={changeHandler}  >
                                        <option value={'lit'}>lit</option>
                                        <option value={'non-lit'}>Non - lit</option>
                                    </Select>
                                </div>
                                <input type="submit" value={"Search"}  style={{margin:'auto 0px 20px 0'}}/>
                            </form>
                        </div>
                    </div>





                    <section className="media-result mt-4">
                         <table className="table table-boarder table-hover table-striped m-3 table-sm">
                    <thead className="thead-dark">
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
                        </table>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Media