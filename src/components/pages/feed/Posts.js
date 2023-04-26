import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postsEndpoint, baseUrl  } from "../../constants/Api";
import PostaComment from "./CommentOnPost";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import SearchForm from "../../constants/SearchForm";
import "../../css/Posts.css";

const token = localStorage.getItem("myToken");

const Posts = () => {
    useEffect(() => {
        getPosts();
    }, []);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    
    const getPosts = async () => {
        const settings = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }};
        try {
        setLoading(true);
        // api request
        const response = await fetch(baseUrl + postsEndpoint, settings);
        const data = await response.json();
    
        if(response.ok) {
            setPosts(data);
            setLoading(false);
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
    <div className="feedContainer">
        <div className="row">
            <SearchForm search = {(e) => setQuery(e.target.value)} />
        </div>
       
    {posts.filter(post=>post.author.name.toLowerCase().includes(query)).map(post => (      
        <div className="posts" id={post.id} data-target={post.id} key={post.id}>
            <div className="postContainer">
                <div className="row">
                    <div className="col">
                        <Link to={`/feed/profiles/${post.author.name}`}>{(post.author.avatar) ? <img src={post.author.avatar} alt="Avatar display" className="smallAvatar" /> :  <FontAwesomeIcon icon={faUser} className="fa-solid avatarIcon" />} {post.author.name}</Link>
                    </div>
                    <div className="col followContainer"> 
                    </div>
                </div>
                <div className="row postBody">
                    <div className="col-9">
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                    <div className="col-3">   
                        <small className="post-id">id {post.id}</small>
                    </div>
                    <div className="row">
                        <div className="col">                     
                            {(post.media) ? <img src={post.media} alt="media display in post" className="bannerImage"/> : '' }
                        </div>
                    </div>
                    <PostaComment id={Number(post.id)}/> 
                </div>
            </div>  
       </div>
    ))}
    </div>
    )
}
export default Posts;