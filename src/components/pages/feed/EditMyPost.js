import { baseUrl, PostEntryEndpoint } from '../../constants/Api';
import * as yup from 'yup';
import { useFormik } from "formik";
import "../../css/ProfileUser.css";
const token = localStorage.getItem("myToken");

function EditMyPost(props) {
    // hadling change of post 
    const formik = useFormik({
        initialValues: {
            title: '',
            body: ''
        },
        validationSchema: yup.object({
            title: yup.string().required(),
            body: yup.string()
          }),
        onSubmit: values => {
            const updatePost = async () => {

                const settings = {
                    method: 'PUT',
                    // getting values from editing the posted post
                    body:JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }};
                try {
                    // api request
                  const response = await fetch(baseUrl + PostEntryEndpoint + '/' + props.postId, settings);
                  const data = await response.json();
             
                
                    if(response.ok) {
                        console.log(data)
                    } 
                } catch (err) {
                  console.log('error', err);
                }
            }
           updatePost()         
    }})

  return (
    <div className="col-3 editYourPost">
    <button type="button" className="getIdButton" data-toggle="modal" data-target="#exampleModalCenter" >
        Edit
    </button>
    <div className="modal fade" 
    id="exampleModalCenter" 
    tabIndex="-1" 
    role="dialog"     
    aria-labelledby="exampleModalCenterTitle" 
    aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Edit your Post</h5>
                </div>
                <div className="modal-body">
                    <form onSubmit={formik.handleSubmit}  className="container">
                    <small id="tryAgain">Check your wifi network and try again.</small>

                    <label htmlFor="title">Title</label>
                    <input
                    id="title"
                    name="title"
                    type="text"
                    className="editTitle"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    />
                    {formik.errors.title ? (
                    <small className="error">{formik.errors.title}</small>
                    ) : null}

                    <label htmlFor="body">Body</label>
                    <input
                    id="body"
                    name="body"
                    type="text"
                    className="editBody"
                    onChange={formik.handleChange}
                    value={formik.values.body}
                    />
                    {formik.errors.body ? (
                    <small className="error">{formik.errors.body}</small>
                    ) : null}

                    <button 
                    type="submit" 
                    className="editPost"
                    id="editPost"
                    name="editButton">
                    Submit Changes
                    </button>  
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="closeUpdateAvatar" data-dismiss="modal">Close</button>      
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default EditMyPost










