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
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState("");
    const [illumination, setIllumination] = useState("");
    const [company, setCompany] = useState("");
    const [getCity, setgetcity] = useState([]);
    const [getcomp, setcomp] = useState([]);
    const [Users, fetchUsers] = useState([]);
    
    
    const [other, setOther] = useState([]);
    const [media, setMedia] = useState([]);
    const [city, setCity] = useState([]);
    const [location, setLocation] = useState([]);
    const [ill, setIll] = useState([]);
    
    const [formData, setFormData] = useState({ });

    const [data,setData] = useState({
        other:'',
        mediaCategory:'',
        city:'',
        location:'',
        illumination:''
    })

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        }

    const dataChange = (values,e)=>{
        let value = values.value
        switch (e.name) {
            case "mediaCategory":
                setMedia(values)
                console.log('dd');
                break;
            case "city":
                setCity(values)
                console.log('city');
                 break;   
                
            case "location":
                setLocation(values)
                console.log('location');
                 break;   
            case "type":
                setIll(values)
                console.log('ill');
                 break;   
            default:
                break;
        }
       
        setData({ ...data, [e.name]: value})
        console.log(data);
    }

    const otherChangeHandler =(value)=>{
        setOther(value)
    }
 

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
    let locationOption = [
        { label: "Delhi", value: "Delhi" },
        {
            label: "Noida", value: "Noida"
        }, {
            label: "Bihar", value: "Bihar"
        }
    ]
    let optionType = [{ label: 'Lit', value: 'Lit' }, { label: 'Non-Lit', value: 'Non-Lit' }]

    useEffect(() => {
        Showcity();
        ShowCompany();
    }, []);


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
    
        if (tab === 'media') {
            mediaFormRef.current.classList.remove('userProfileHidden')
            mediaCompanyFormRef.current.classList.add('userProfileHidden')
            otherFormRef.current.classList.add('userProfileHidden')

            mediaRef.current.classList.add('navActive')
            mediaCompanyRef.current.classList.remove('navActive')
            otherRef.current.classList.remove('navActive')
        }

        if (tab === 'company') {
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

  

    
    
    const form1Ref = useRef(null);
    const form2Ref = useRef(null);
   
    
    const btn1Ref = useRef(null);
    const btn2Ref = useRef(null);
    const btn3Ref = useRef(null);


    

    const [isSearch, setIsSearch] = useState(false);
    // console.log(isSearch);
  
    useEffect(() => {
        if (formData?.mediaCode ) {
            form2Ref.current.disabled = true
            setIsSearch(true)
            btn2Ref.current.disabled = true
            btn3Ref.current.disabled = true
        } else {
            setIsSearch(false)
            form2Ref.current.disabled = false;
            btn2Ref.current.disabled = false
            btn3Ref.current.disabled = false
        }
      
    }, [formData?.mediaCode])

    useEffect(() => {
        
        if(formData?.company){
            setIsSearch(true)
            form1Ref.current.disabled = true;
            btn1Ref.current.disabled = true
            btn3Ref.current.disabled = true
        } else {
            setIsSearch(false)
            form1Ref.current.disabled = false;
            btn1Ref.current.disabled = false
            btn3Ref.current.disabled = false
        }

    }, [formData?.company])

    useEffect(() => {

        
        if (data?.mediaCategory || data?.city || data?.location || data?.other || data?.illumination) {
            form1Ref.current.disabled = true;
            form2Ref.current.disabled = true;
            btn2Ref.current.disabled = true
            btn1Ref.current.disabled = true
        } else{
            form1Ref.current.disabled = false;
            form2Ref.current.disabled = false;

            btn2Ref.current.disabled = false
            btn1Ref.current.disabled = false

        }
       
    }, [data])

    const ShowDetails = async (detail) => {
        console.log(detail);
        console.log('function');
        
        const { data } = await axios.post('/api/v1/media/inventory', detail)

        fetchUsers(data)
        console.log(data);

        console.log(Users)

    };
    
    const submitHandler = (e) => {
        e.preventDefault()
        if(formData?.mediaCode){
            console.log(formData);
            ShowDetails(formData)
        }
        if(formData?.company){
            console.log(formData);
            ShowDetails(formData)
            
            
        }
        if (data?.mediaCategory || data?.city || data?.location || data?.other || data?.illumination) {
            console.log(data);
            ShowDetails(data)
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
                            <div className="newPermission " ref={mediaCompanyRef} onClick={(e) => switchTab(e, 'company')}>
                                <strong>Media Company Name</strong>

                            </div>
                            <div className="newPermission " ref={otherRef} onClick={(e) => switchTab(e, 'other')}>
                                <strong>Others</strong>

                            </div>
                        </div>
                        <div className="permissionRole" ref={mediaFormRef}>
                            <form className="form" onSubmit={submitHandler}>
                                <div >
                                    <label for="search">Media Code :</label>
                                    <input  type="text" id="search" name="mediaCode" placeholder="media code .." onChange={changeHandler} autoFocus ref={form1Ref} required />
                                </div>
                                <input type="submit" value={"Search"} ref={btn1Ref}/>
                            </form>
                        </div>
                        <div className="permissionRole userProfileHidden" ref={mediaCompanyFormRef}>
                            <form className="form" onSubmit={submitHandler}>
                                <div>
                                    <label for="exampleFormControlInput1">Media Company :</label>
                                    <input type="text" id="search" name="company" placeholder="mediaCompany" onChange={changeHandler} autoFocus ref={form2Ref} required/>
                                </div>

                                <input type="submit" value={"Search"} ref={btn2Ref}/>
                            </form>
                        </div>
                        <div className="permissionRole userProfileHidden" ref={otherFormRef}>
                            <form className="form" onSubmit={submitHandler}>
                                <div className='otherform'>
                                    <label>Media Category:</label>
                                    <Select
                                    isDisabled={isSearch} options={MediaOption} name={'mediaCategory'} value={media} onChange={dataChange}  required/>
                                </div>
                                <div className='otherform'>
                                    <label>Media Subcategory:</label>
                                    <Select
                                    isDisabled={isSearch}
                                        value={other}
                                        onChange={otherChangeHandler}
                                        isMulti
                                        name="mediaSubcategories"
                                        options={Comp}
                                        className="basic-multi-select"
                                        classNamePrefix="select" 
                                        
                                        />
                                </div>
                                <div className='otherform'>
                                    <label>City:</label>
                                    <Select
                                    isDisabled={isSearch}
                                        value={city}
                                        onChange={dataChange}
                                        options={City}
                                        name="city"
                                       
                                    />
                                </div>
                                <div className='otherform'>
                                    <label>Location:</label>
                                    <Select
                                    isDisabled={isSearch} 
                                        value={location}
                                         options={locationOption}
                                          name="location"
                                           onChange={dataChange}
                                          
                                     />
                                </div>
                                <div className='otherform'>
                                    <label for='type'>Illimination Type:</label>
                                    <Select
                                    isDisabled={isSearch} 
                                    name="illumination" 
                                    id="type" 
                                    options={optionType} 
                                    onChange={dataChange} 
                                    value={ill} 
                                   
                               
                                />
                                </div>
                                <input type="submit" value={"Search"} style={{ margin: 'auto 0px 20px 0' }} ref={btn3Ref}/>
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
                            <tbody>
                        {Users.length>0 &&
                          Users.res.map((obj,i) => (

                                  
                                  <tr key={i}>
                                  <td> <input type="checkbox" className="form-check-input" mediacode={obj.code} mediacategory={obj.category_name} checked={obj?.isChecked || false}/></td>
                                  <td><img src={obj.thumb}  style={{height: "100px",width: "100px"}}/></td>
                                  <td>{obj.location}</td>
                                  <td>{obj.city_name}</td>
                                  <td>
                                  {obj.phonenumber}{<br/>}
                                  {obj.email}{<br/>}
                                  {obj.location}
                                  </td>
                                  <td>{obj.category_name}</td>
                                  <td>{obj.subcategory}</td>
                                  <td>{obj.illumination}</td>
                                  <td className="numeric">{obj.price_2}</td>
                                  </tr>
                                  
                          ))
    
                        }
                        </tbody>
                        </table>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Media