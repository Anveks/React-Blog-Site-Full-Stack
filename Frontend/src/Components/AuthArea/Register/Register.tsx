import { useForm } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { useNavigate } from "react-router-dom";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function submit(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("Welcome!");
            navigate("/")
        } catch (err: any) {
            console.log(err);
        }
    }

    return (
        <div className="Register">

            <h3>Join us!</h3>

            <form onSubmit={handleSubmit(submit)}>
                <label>First name:</label>
                <input type="text" placeholder="John Doe" required {...register("firstName")} />

                <label>Last name:</label>
                <input type="text" placeholder="Doe" required {...register("lastName")} />

                <label>Username:</label>
                <input type="text" placeholder="John Doe" required {...register("username")} />

                <label>Email:</label>
                <input type="email" placeholder="example@mail.com" required {...register("email")} />

                <label>Password:</label>
                <input type="password" placeholder="********" required {...register("password")} />

                <button>Submit</button>
            </form>
        </div>
    );
}

export default Register;
