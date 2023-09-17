import { Link } from "react-router-dom";
import "./Login.css";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { CredentialsModel } from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { useForm } from "react-hook-form";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<CredentialsModel>();

    async function submit(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("Welcome Back!");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login">
            <h3>LOGIN</h3>

            <form onSubmit={handleSubmit(submit)}>
                <AlternateEmailIcon />
                <input
                    type="email"
                    name="email"
                    placeholder="example@mail.com"
                    {...register("email")} />

                <LockOpenIcon />
                <input
                    type="password"
                    name="password"
                    placeholder="********"
                    {...register("password")} />

                <br />

                <div className="buttons">
                    <button>Login</button>
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


