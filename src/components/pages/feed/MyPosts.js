import { useEffect, useState } from "react";
import { myPostsEndpoint, baseUrl  } from "../../constants/Api";
import "../../css/Posts.css";
import DeleteMyPost from "./Delete";
import EditMyPost from "./EditMyPost";
import { Link } from "react-router-dom";

const token = localStorage.getItem("myToken");
const name = localStorage.getItem("name")

const MyPosts = () => {
    useEffect(() => {
        getPosts();
    }, []);

    const [myPosts, getMyPosts] = useState([]);
    
    const getPosts = async () => {
        const settings = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }};
        try {
        // api request
        const response = await fetch(baseUrl + myPostsEndpoint + name + '/posts', settings);
        const data = await response.json();

        if (response.ok){
        getMyPosts(data);
         }
        if(!response.ok) {
            console.log("error");
        } 
        } catch (err) {
        console.log('error', err);
        }
    } 
    return (
    <div className="feedContainer">  
      
        <Link to={`/feed/your-profile/${name}`} id="visitYourProfil">Go to my profile</Link>
       
        {!myPosts.length <= 0 ?myPosts.map(post => (      
        <div className="posts" id={post.id} data-target={Number(post.id)} key={post.id}>
            <div className="postContainer">
                <div className="row">
                    <div className="col">
                        <small className="post-id">post id: {post.id}</small>
                    </div>
                </div>
            </div>
            <div className="row postBody">
                    <div className="col">
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
            </div>
            <div className="row commentAndEmoji">
                    <EditMyPost  postId={Number(post.id)}/>
             
                <div className="col-3 deleteYourPost">
                    <DeleteMyPost postId={Number(post.id)} />
                </div>
            </div>
            
        </div>    
        )) : <p className="noPostsYet">You haven't posted anything yet. Go to the top of the page and post your first post! </p>} 
    </div>
    )
}
export default MyPosts;