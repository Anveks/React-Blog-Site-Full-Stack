import { Link } from "react-router-dom";
import "./Login.css";

function Login(): JSX.Element {
    return (
        <div className="Login">
            <p>Login</p>

            <form action="">
                <label htmlFor="">Email</label>
                <input type="email" name="email" placeholder="example@mail.com" />

                <label htmlFor="">Password</label>
                <input type="password" name="password" placeholder="********" />

                <br />

                <div className="buttons">
                    <button>Submit</button>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
            </form>
            <br />
        </div>
    );
}

export default Login;
