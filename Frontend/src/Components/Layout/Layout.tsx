import Header from "./Header/Header";
import "./Layout.css";
import Routing from "./Routing/Routing";
import SideBar from "./SideBar/SideBar";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header><Header /></header>

            <div className="main">
                <main><Routing /></main>
                <aside><SideBar /></aside>
            </div>

        </div>
    );
}

export default Layout;
