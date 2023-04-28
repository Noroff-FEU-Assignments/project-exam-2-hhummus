import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {baseUrl ,followProfilesEndpoint } from "../constants/Api";
import GoBack from "../constants/GoBack";
import Logo from "../navigation/Logo";
import Logout from "../navigation/Logout";
import ShowPost from "./userpage/ShowPost";
import "../css/ProfileUser.css";
import "../css/Buttons.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import FooterGlobal from "../constants/footer";


const token = localStorage.getItem("myToken")
let imgOk;
let avatarOk;

export default function UsersPage() {
    let params = useParams();
    const name = params.name;

    useEffect(() => {
        getProfile();
    }, []);

    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProfile = async () => {
        const settings = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }};
        try {
        // api request
        const response = await fetch(baseUrl + followProfilesEndpoint + name, settings);
        setLoading(true);
        const data = await response.json();
        if(response.ok) {
            setProfile(data);
            setLoading(false);
            
            //if banner image
            imgOk = (data.banner) ? <img src={data.banner} alt="banner display" className="bannerImage" /> : <p className="bannerText">Doesn't seem like {data.name} has uploaded a banner photo just yet.</p>
           
            // if avatar img
            avatarOk = (data.avatar) ? <img src={data.avatar} alt="Avatar display" className="avatarImage" /> :  <FontAwesomeIcon icon={faUser} className="fa-solid fa-3x avatarIcon" />
            console.log(data)
        } 
        } catch (err) {
            setLoading(false);
            console.log('error', err);
        }
    }
    // return a Spinner when loading is true
    if(loading) return (
        <span>
            <FontAwesomeIcon icon={faSpinner} className="fa-solid fa-spinner" />
        </span>
    );
    // when data is ready return the content
    return (
    <div>
        <div className="container">
            <div className="navigation row">
                <div className="col"><Logo /></div>
                <div className="col"><Logout /></div> 
            </div>
        </div>
            <GoBack />
            <div className="profileDisplay">
                <div className="bannerDisplay">
                {imgOk}
                </div>
                <div className="avatar">
                   {avatarOk}
                </div>
                
                <div className="userInfo">
                    <h1>{profile.name}</h1>
                    <div className="row">
                        <div className="col followers">
                         <p>{profile._count.followers} followers</p> 
                        </div>
                        <div className="col following">
                            <p>{profile._count.following} following</p> 
                        </div>
                    </div>
                </div>  
            </div>  
            <div className="container usersPosts">
                <ShowPost user={name}/>
            </div> 
            <FooterGlobal />
    </div>          
    )
}

