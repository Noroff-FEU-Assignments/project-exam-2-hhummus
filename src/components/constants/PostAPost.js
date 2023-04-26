import "../css/SearchAndPostInputForm.css";
import { baseUrl, PostEntryEndpoint } from "../constants/Api"; 
import { useFormik } from "formik";
import * as yup from "yup";

const token = localStorage.getItem("myToken");
const errorLogin = document.getElementById("tryAgain");

// ------ using formik and yup -------- //
const PostaPost = () => {

    const formik = useFormik({
        initialValues: {
            title: '',
            body: '',
            media:'',
        },
        validationSchema: yup.object({
            title: yup.string().min(3).required("You have to write something to post it."),
            body: yup.string(),
            media: yup.string()
            
          }),
        onSubmit: values => {
            const postEntry = async () => {
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
                  const response = await fetch(baseUrl + PostEntryEndpoint, settings);
                  const data = await response.json();
                 
                    if(response.ok) {
                        alert('Youve posted a post');
                        window.location.reload();
                        console.log(data)

                    } 
                    if(!response.ok) {
                        errorLogin.style.display = "block";
                    } 
                } catch (err) {
                  console.log('error', err);
                }
            }
            postEntry();
          },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="SearchAndPostInputForm" >
            <small id="tryAgain">Check your wifi network and try again.</small>
            <fieldset>
            <div className="container">
                <legend>What do you want to share?</legend>
                <div className="row">
                    <label htmlFor="title" className="label">Title</label>
                </div>
                <div className="row">
                    <input
                    id="title"
                    name="title"
                    type="text"
                    className="labelpost"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    />
                    {formik.errors.title ? (
                    <small className="error">{formik.errors.title}</small>
                    ) : null}
                </div>
                
                <div className="row">
                    <label htmlFor="body">Body</label>
                </div>
                <div className="row">
                    <input
                    id="body"
                    name="body"
                    type="text"
                    className="labelpost"
                    onChange={formik.handleChange}
                    value={formik.values.body}
                    />
                    {formik.errors.body ? (
                    <small className="error">{formik.errors.body}</small>
                    ) : null}
                </div>
                
                <div className="row">
                    <label htmlFor="media">Media</label>
                </div>
                <div className="row">
                    <input
                    id="media"
                    name="media"
                    type="url"
                    placeholder="Must be a valid and free photo from URL"
                    className="labelpost"
                    onChange={formik.handleChange}
                    value={formik.values.media}
                    />
                    {formik.errors.media ? (
                    <small className="error">{formik.errors.media}</small>
                    ) : null}
                </div>
                <div className="row">
                    <button
                    type="submit" 
                    className="postAPost"
                    id="postApost"
                    name="postButton">
                    Post
                </button>  
                </div>
            </div>
            </fieldset>
        </form>
      );
}
export default PostaPost;