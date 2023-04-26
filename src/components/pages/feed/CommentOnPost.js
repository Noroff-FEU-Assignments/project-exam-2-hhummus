import { baseUrl, PostEntryEndpoint  } from "../../constants/Api";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import "../../css/Login.css";
import "../../css/PostedComment.css"
const errorLogin = document.getElementById("tryAgain");
const token = localStorage.getItem("myToken");

// ------ using formik and yup -------- //
const PostaComment = (props) => {
    // useState to refresh only component and not the whole page when commenting
    const [post, setPost] = useState([]);

    const formik = useFormik({
        initialValues: {
            body: '',
        },
        validationSchema: yup.object({
            body: yup.string().required("you can't post an empty comment.")
          }),
        onSubmit: values => {
            const postComment = async () => {
                const settings = {
                    method: 'POST',
                    // getting values from input field
                    body:JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }};
                try {
                // api request
                const response = await fetch(baseUrl + PostEntryEndpoint + '/' + props.id + '/comment' , settings);
                const data = await response.json();    
                    if(response.ok) {
                        setPost(data)    
                    } 
                    if(!response.ok) {
                        errorLogin.style.display = "block";
                    } 
                } catch (err) {
                  console.log('error', err);
                }
            }
            postComment();
        },
    });  

    return (
    <> 
        
     {post.body ? (<div className="postedComment" key={post.id}>
        <small>You said</small>
        <p>{post.body}</p>
        </div>) :
       <form onSubmit={formik.handleSubmit} className="commentContainer">
            <small id="tryAgain">Check your wifi network and try again.</small>
            <label htmlFor="body"></label>
            <input
            id="body"
            name="body"
            type="text"
            placeholder="Comment here..."
            className="commentOnPost"
            onChange={formik.handleChange}
            value={formik.values.body}
            />
            {formik.errors.body ? (
            <small className="error">{formik.errors.body}</small>
            ) : null}
            
            <button
            type="submit" 
            className="postAComment"
            id="postApost"
            name="postButton">
            Post Comment
            </button>  
       </form> 
        }
    </>
    )
}
export default PostaComment;