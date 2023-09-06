import Login from "../AuthArea/Login/Login";
import Header from "./Header/Header";
import "./Layout.css";
import Routing from "./Routing/Routing";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header><Header /></header>

            <div className="main">
                <main><Routing /></main>
                <aside><Login /></aside>
            </div>

        </div>
    );
}

export default Layout;
