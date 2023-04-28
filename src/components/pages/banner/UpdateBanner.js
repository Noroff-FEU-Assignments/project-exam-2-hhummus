import { useFormik } from "formik";
import * as yup from 'yup';
import { baseUrl } from "../../constants/Api";
import "../../css/ProfileUser.css";
const token = localStorage.getItem("myToken");
const name = localStorage.getItem("name");

function UpdateBanner() {
     
    // hadling change of post 
        const formik = useFormik({
            initialValues: {
                banner: '',
            },
            validationSchema: yup.object({
                banner: yup.string('must be a valid url')
              }),
            onSubmit: values => {

                const updateBanner = async () => {
                    const settings = {
                        method: 'PUT',
                        // getting values from input
                        body:JSON.stringify(values),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }};
                    try {
                        // api request
                      const response = await fetch(baseUrl + '/social/profiles/' + name + '/media', settings);
                      const data = await response.json();
                    
                        if(response.ok) {
                            console.log(data)
                        } 
                    } catch (err) {
                      console.log('error', err);
                    }
                }
               updateBanner()         
        }})
    
      return (
        <div>
        <button type="button" data-toggle="modal" data-target="#banner" className="updateAvatar" >
            Change your banner image
        </button>
        <div className="modal fade" 
        id="banner" 
        tabIndex="-1" 
        role="dialog"     
        aria-labelledby="avatarTitle" 
        aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="avatarTitle">Upload banner</h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={formik.handleSubmit}>
                        <small id="tryAgain">Check your wifi network and try again.</small>
                     
                        <label htmlFor="banner"></label>
                        <input
                        pattern="https://.*" 
                        title="Must be a link containing www, and end with .jpg"
                        id="banner"
                        name="banner"
                        type="text"
                        placeholder="www.some-website/banner-photo.jpg"
                        className="bannerInput"
                        onChange={formik.handleChange}
                        value={formik.values.banner}
                        />
                        {formik.errors.banner ? (
                        <small className="error">{formik.errors.banner}</small>
                        ) : null}
                       
                        <button 
                        type="submit" 
                        className="updateAvatarButton"
                        id="editPost"
                        name="editButton">
                        Save changes 
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
export default UpdateBanner;