import { useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import "./Profile.css";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useNavigate } from "react-router-dom";

function Profile(): JSX.Element {
    const editor = authStore.getState().user.roleId === 2;
    const navigate = useNavigate();

    const [active, setActive] = useState(false);

    function logout() {
        authService.logout();
    }

    function toggleDropdown() {
        setActive(!active);
    }

    return (
        <div className="Profile">
            <div className="dropdown">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" />
                <button onClick={toggleDropdown}> {active ? <MenuOpenIcon /> : <MenuIcon />} Menu</button>

                {active && (
                    <div className="dropdown-menu active">
                        <p> <PersonIcon /> View Profile</p>
                        {editor && <p onClick={() => { navigate("/add-article") }}> <AddIcon /> Add Article</p>}
                        <p> <SettingsIcon /> Settings</p>
                        <p onClick={logout}> <LogoutIcon /> Logout</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
