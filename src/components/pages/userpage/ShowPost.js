import { useEffect, useState } from "react";
import { followProfilesEndpoint, baseUrl  } from "../../constants/Api.js";
import PostaComment from "../feed/CommentOnPost.js";
import "../../css/Posts.css";
const token = localStorage.getItem("myToken");

const ShowPost = (props) => {
    useEffect(() => {
        getPosts();
    }, []);

    const [posts, setPosts] = useState([]);
    
    const getPosts = async () => {
        const settings = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }};
        try {
        // api request
        const response = await fetch(baseUrl + followProfilesEndpoint + props.user + '/posts', settings);
        const data = await response.json(); 
        if(response.ok) {
            setPosts(data);
        } 
        } catch (err) {
        console.log('error', err);
        }
    }

    return (
    <div>
        {/*----if user has no posts display that, else display posts ------ */ }
    { !posts.length <= 0 ? posts.map(post => (     
        <div className="posts" id={post.id} data-target={post.id} key={post.id}>
             <h2>{props.user}'s latest posts</h2>
            <div className="postContainer">
                <div className="row postBody">
                    <div className="col-9">
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                    <div className="col-3">   
                        <small className="post-id">id {post.id}</small>
                    </div>
                    <PostaComment id={Number(post.id)}/> 
                </div>
            </div>  
       </div>
    )) : <h2 className="noPostsYet">{props.user} has not posted anything yet.</h2>}
    </div>
    )
}
export default ShowPost;