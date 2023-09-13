import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import "./Profile.css";

function Profile(): JSX.Element {
    const user = authStore.getState().user;

    function logout() {
        authService.logout();
    }

    return (
        <div className="Profile">
            <div className="name-img">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" />
                <p> Logged in as: {user.username} </p>
            </div>
            <div className="buttons">
                <button>View Profile</button>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
}

export default Profile;
