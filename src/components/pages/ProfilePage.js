import GoBack from "../constants/GoBack"
import { baseUrl, myPostsEndpoint } from "../constants/Api";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Logo from "../navigation/Logo";
import Logout from "../navigation/Logout";
import ShowPost from "./userpage/ShowPost";
import UpdateAvatar from "./avatar/UpdateAvatar";
import UpdateBanner from "./banner/UpdateBanner";
import FooterGlobal from "../constants/footer";
import "../css/Posts.css";

const token = localStorage.getItem("myToken");
const name = localStorage.getItem("name")
let imgOk;
let avatarOk;

export default function ProfilePage() {
        useEffect(() => {
            getPosts();
        }, []);
    
        const [myPosts, getMyPosts] = useState([]);
        const [loading, setLoading] = useState(true);
        
        const getPosts = async () => {
            const settings = {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`
                }};
            try {
            setLoading(true);
            // api request
            const response = await fetch(baseUrl + myPostsEndpoint + name, settings);
            const data = await response.json();

            if (response.ok){
            getMyPosts(data);
            setLoading(false);
            // if banner image
            imgOk = (data.banner) ? <img src={data.banner} alt="banner display" className="bannerImage"/> : <p className="bannerText">Doesn't seem like {data.name} has uploaded a banner photo just yet.</p>
            //if avatar image
            avatarOk = (data.avatar) ? <img src={data.avatar} alt="Avatar display" className="avatarImage" /> :  <FontAwesomeIcon icon={faUser} className="fa-solid fa-3x avatarIcon" />
            console.log(data)
             }

            if(!response.ok) {
                console.log("error");
            } 

            } catch (err) {
            console.log('error', err);
            }
        } 
     // return a Spinner when loading is true
    if(loading) return (
        <span>
            <FontAwesomeIcon icon={faSpinner} className="fa-solid fa-spinner" />
        </span>
    );
    // else return content 
    return (
    <>
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
            <h1>{myPosts.name}</h1>
            <div className="row">
                <div className="col">
                    <UpdateAvatar />
                    <UpdateBanner />
                </div>
            </div>

            <div className="row">
                <div className="col followers">
                    <p>{myPosts._count.followers} followers</p> 
                </div>
                <div className="col following">
                    <p>{myPosts._count.following} following</p> 
                </div>
            </div>
        </div>  
    </div> 
     
    <div className="container usersPosts">
        <ShowPost user={name}/>
    </div> 

    <FooterGlobal />
    </>  
    )
}