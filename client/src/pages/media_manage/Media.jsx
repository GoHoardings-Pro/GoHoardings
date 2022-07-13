import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { MultiSelect } from "react-multi-select-component";
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
    const [cityname, setcityname] = useState([])
    const [compname, setcompname] = useState([])
    const [state, setState] = useState(false);
    const [formData, setFormData] = useState({});




    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

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
        City.push({ "label": obj.name, "value": obj.name })
        Cities.push(obj.name)
    });

    const ShowCompany = async () => {
        const { data } = await axios.get(`/api/v1/media/company`)
        setcomp(data)

    };

    let Comp = [];
    getcomp.forEach((value) => {
        // Comp.push({ "label": value.name, "value": value.name })
        Comp.push(value.name)
    });

    // let MediaOption=[
    //     {label: "traditional-ooh-media", value: "traditional-ooh-media"},{
    //     label: "digital-media", value: "digital-media"},{
    //     label: "transit-media", value: "transit-media"},{
    //     label: "mall-media", value: "mall-media"},{
    //     label: "airport-media", value: "airport-media"},{
    //     label: "inflight_media", value: "inflight_media"},{
    //     label: "office-media", value: "office-media"}
    // ]

    useEffect(() => {
        ShowDetails();
        Showcity();
        ShowCompany();
    }, []);

    useEffect(() => {
        if (code) {
            for (let index = 1; index < 7; index++) {
                document.getElementsByClassName("all")[index].disabled = true;
            }
        } else {
            for (let index = 1; index < 7; index++) {
                // document.getElementsByClassName("all")[index].disabled = false;
            }
        }
    }, [code]);


    const mediaRef = useRef('');
    const mediaSubRef = useRef('');
    const dropEl = document.querySelector('.dropEl')
    const dropEl1 = document.querySelector('.dropEl1')

    const formHandler = (e, field) => {
        const userInput = e.target.value.toLowerCase()
        console.log(userInput);
        if (userInput.length === 0) {
            dropEl.style.height = 0
            return dropEl.innerHTML = dropEl1.innerHTML = ''
        }
        let filteredWords
        if (field === 'media') {
            filteredWords = Cities.filter(word => word.toLowerCase().includes(userInput)).sort().splice(0, 5)

        } else if (field === 'mediaSub') {
            filteredWords = Comp.filter(word => word.toLowerCase().includes(userInput)).sort().splice(0, 5)
        }

        dropEl.innerHTML = dropEl1.innerHTML = ''
        filteredWords.forEach(item => {
            const listEl = document.createElement('li')
            listEl.textContent = item

            if (item === userInput) {
                listEl.classList.add('match')
            }
            if (field === 'media') {
                dropEl.appendChild(listEl)

            } else if (field === 'mediaSub') {
                dropEl1.appendChild(listEl)
            }
        })

        // if(dropEl.children[0] === undefined) {
        //     return dropEl.style.height = 0
        // }

        let totalChildrenHeight
        if (field === 'media') {
            totalChildrenHeight = dropEl.children[0].offsetHeight * filteredWords.length
            dropEl.style.height = totalChildrenHeight + 'px'
        } else if (field === 'mediaSub') {
            totalChildrenHeight = dropEl1.children[0].offsetHeight * filteredWords.length
            dropEl1.style.height = totalChildrenHeight + 'px'
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
                    <form className="media-form" onSubmit={'submitHandler'}>
                        <div className="form1">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Media Code</label>
                                <input type="text" id="search" placeholder="media code .." onChange={e => setCode(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Media Owner Company Name:</label>
                                <input type="text" id="search" placeholder="media code .." onChange={(e) => { setCompany(e.target.value); }} />
                            </div>
                        </div>
                        <div className="form2">
                            <div className="form-group">
                                <label>Media Category:</label>
                                <input type="text" id='search' ref={mediaRef} placeholder="Media Category ...." onChange={(e) => formHandler(e, 'media')} />
                                <ul className="dropEl" ref={dropEl}></ul>
                            </div>
                            <div className="form-group">
                                <label>Media Subcategory:</label>
                                <input type="text" name="media-subcategory" ref={mediaSubRef} id="search" placeholder="Media SubCategory ..." onChange={(e) => formHandler(e, 'mediaSub')} />
                                {/* <ul className="dropEl1" ref={dropEl}></ul> */}

                            </div>
                            <div className="form-group">
                                <label>City:</label>
                                <input type="text" id='search' ref={mediaRef} placeholder="Media Category ...." onChange={(e) => formHandler(e, 'media')} />
                                <ul className="dropEl" ref={dropEl}></ul>
                            </div>
                            <div className="form-group">
                                <label>Location:</label>
                                <input type="text" className="all" onChange={e => setLocation(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Illimination Type:</label>
                                <select name="" id="" searchable={'search Hear ....'}>
                                    <option value="back lit">lit</option>
                                    <option value="nonlit">Non - lit</option>
                                </select>
                            </div>
                            <input type="submit" value={"Search"} style={{ width: '21%' }} />
                        </div>
                        {/* <button type="submit" class="btn btn-primary ml-3 ">Search</button> */}
                    </form>
                    <section className="media-result mt-4">
                        <table className="table" style={{color:'white', background:'tomato'}}>
                            <thead>
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