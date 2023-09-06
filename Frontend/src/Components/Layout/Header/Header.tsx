import { Link } from "react-router-dom";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <p className="logo"><Link to="/">React Blog Site</Link></p>

            <div className="categories">
                <a href="#">JavaScript</a>
                <a href="#">TypeScript</a>
                <a href="#">React</a>
                <a href="#">Angular</a>
                <a href="#">CSS</a>
            </div>
        </div>
    );
}

export default Header;
