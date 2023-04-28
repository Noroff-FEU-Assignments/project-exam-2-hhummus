import { useEffect, useState } from "react";
import { profilesEndpoint, baseUrl  } from "../../constants/Api";
import FollowUnfollowButton from "./FollowUnfollowButton";
import { Link } from "react-router-dom";
import "../../css/Posts.css";
import SearchForm from "../../constants/SearchForm";
const token = localStorage.getItem("myToken");

const Profiles = () => {
    useEffect(() => {
        getProfiles();
    }, []);

    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    
    const getProfiles = async () => {
        const settings = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }};
        try {
        // api request
        const response = await fetch(baseUrl + profilesEndpoint, settings);
        const data = await response.json();
        console.log(data);
        
        if(response.ok) {
            setProfiles(data);
        } else {
            setError('Something went wrong.')
        }
    } catch (err) {
        setError('Something went wrong.', err)
    }
}
return (
    <div className="feedContainer">
        <div className="row">
           <SearchForm search = {(e) => setQuery(e.target.value)} />
        </div>

        {profiles.filter(profile=>profile.name.toLowerCase().includes(query)).map(profile => (        
            <div className="profiles" id={profile.id} data-target={profile.id} key={profile.id}>
                <div className="row">
                        <div className="col-8 profileName">
                        <Link to={`/feed/profiles/${profile.name}`}>{profile.name}</Link>
                            <p>{error}</p>
                        </div>
                        <div className="col-4 profileBtn">
                            <FollowUnfollowButton followers={profile.followers} profileName={profile.name} />
                        </div>  
                </div>
            </div>
        ))}
    </div>
)
}
export default Profiles;