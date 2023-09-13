import { useState, useEffect } from "react";
import { authStore } from "../../../Redux/AuthState";
import Login from "../../AuthArea/Login/Login";
import "./SideBar.css";
import Profile from "../../ProfileArea/Profile/Profile";

function SideBar(): JSX.Element {

    const [token, setToken] = useState<string>(authStore.getState().token);

    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            setToken(authStore.getState().token);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="SideBar">
            {
                token !== null
                    ? (<div className="login"> <Profile /> </div>)
                    : (<div className="login"> <Login /> </div>)
            }
            <div className="random-article"> random article </div>
            <div className="most-popular"> most popular articles </div>
        </div>
    );
}

export default SideBar;
