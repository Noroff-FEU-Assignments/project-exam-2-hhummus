import { baseUrl, PostEntryEndpoint } from "../../constants/Api";
import "../../css/ProfileUser.css";
const token = localStorage.getItem("myToken");

export default function DeleteMyPost(props) {
    const id = props.postId;

    const deleteit = async () => {
        const settings = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }};
        try {
        // api request
        const response = await fetch(baseUrl + PostEntryEndpoint + '/' + id, settings);
        const data = await response.json();
       
        if(response.ok) {
            console.log(data)
            window.location.reload();
        } 
        } catch (err) {
        console.log('error', err);
        }
    }
    
    return (
        <div className="col-3 editYourPost">
        <button type="button" className="deleteButtonFirst" data-toggle="modal" data-target="#deleteMyPost" >
            Delete
        </button>
        <div className="modal fade" 
        id="deleteMyPost" 
        tabIndex="-1" 
        role="dialog"     
        aria-labelledby="exampleModalCenterTitle" 
        aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Are you sure you wany to delete this post?</h5>
                    </div>
                    <div className="modal-body">
                        <button onClick={deleteit}
                        type="button" 
                        className="deleteButton deleteButtonModalBody">
                        Delete post
                        </button> 
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