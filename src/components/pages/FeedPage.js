import "../css/Nav.css";
import "../css/SearchAndPostInputForm.css";
import PostaPost from "../constants/PostAPost";
import Logo from "../navigation/Logo";
import Logout from "../navigation/Logout";
import Posts from "./feed/Posts";
import Profiles from "./feed/Profiles";
import MyPosts from "./feed/MyPosts";
import { useState } from "react";
import FooterGlobal from "../constants/footer";

function FeedPage() {
    let [isActive, setIsActive] = useState("");
 
    const handleOnClick = (e) => {
    console.log(e.target.className)
    setIsActive(e.target.className)
    }

    return (
    <>
        <div className="container">
            <div className="navigation row">
                <div className="col"><Logo /></div>
                <div className="col"><Logout /></div> 
            </div>
        </div>
        <div className="sectionOne">
            <div className="container">
            <PostaPost />
            </div>  
        </div>

        <div className="container feedButtonContainer">
            <div className="row">
                <div className="col"> <button type="button" onClick={handleOnClick} className="buttonContainer allPosts">All Posts</button></div>
                <div className="col"> <button type="button" onClick={handleOnClick} className="buttonContainer allProfiles">Profiles</button></div>
                <div className="col"><button type="button" onClick={handleOnClick} className="buttonContainer yourPosts">Your Posts</button></div>
            </div>
        </div>
        
        <div className="feedContainer">
            {isActive === "buttonContainer allPosts" ? 
                <div className="container" key="allPosts">
                    <Posts/>
                </div>  :  isActive === "buttonContainer allProfiles" ? 
                <div className="container">
                    <Profiles />
                </div> : isActive === "buttonContainer yourPosts" ?  
                <div className="container">
                    <MyPosts/>
                 </div> : "" 
            }   
        </div>
        
        <FooterGlobal />      
    </>   
    )
}

export default FeedPage;