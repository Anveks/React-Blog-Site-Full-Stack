import { authStore } from "../../../Redux/AuthState";
import "./Profile.css";

function Profile(): JSX.Element {
    const user = authStore.getState().user;
    console.log(user);

    return (
        <div className="Profile">
            <div className="name-img">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" />
                <p> Logged in as: {user.username} </p>
            </div>
            <button>View Profile</button>
        </div>
    );
}

export default Profile;
