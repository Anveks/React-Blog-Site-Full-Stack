import { useState } from "react";
import "./DropdownMenu.css";
import authService from "../../../Services/AuthService";

function DropdownMenu(): JSX.Element {

    // const [isOpen, setIsOpen] = useState(false);

    // function toggleDropdown() {
    //     setIsOpen(!isOpen);
    // }

    // function logout() {
    //     authService.logout();
    // }

    return (
        <div className="DropdownMenu">
            <ul>
                <li>Profile</li>
                <li>Settings</li>
                <li>Logout</li>
            </ul>
        </div>
    );
}

export default DropdownMenu;
