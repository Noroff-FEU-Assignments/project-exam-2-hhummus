import { useState, useEffect } from "react";
import { baseUrl, followProfilesEndpoint } from "../../constants/Api";
import "../../css/Buttons.css";
const token = localStorage.getItem("myToken")

export default function FollowUnfollowButton({ followers, profileName }) {

    const [following, setFollowing] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem("name");
        const isFollowing = followers.some((follower) => follower.name === username);
        setFollowing(isFollowing);
    }, [followers]);

    const handleClick = () => {
        const url = baseUrl + followProfilesEndpoint + profileName + (following ? "/unfollow" : "/follow");
    
        const followUnfollowProfile = async () => {
            const settings = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                }};
        try {
            // api request
            const response = await fetch(url, settings);
            const data = await response.json();

            if(response.ok) {
                setFollowing(!following)
                console.log(data)
            } 
        } catch (err) {
            console.log('error', err);
            }
        }
        followUnfollowProfile();
    };
 
    return (
    <button className="unFollowBtn" onClick={handleClick}>{following ? "Unfollow" : "Follow"}</button>
    )
}