import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { toast } from 'react-toastify';
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Provider/AuthProvider";


const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const from = new FormData(e.target)
        const email = from.get('email')
        const password = from.get('password')

        signIn(email, password)
            .then(() => {
                toast.success("Login Succesfully", {
                    position: "top-center",
                    autoClose: 1000
                });
                navigate(location?.state ? location.state : "/")
            })
            .catch(() => {
                toast.error("Login Unsuccesful, please register  ", {
                    position: "top-center",
                    autoClose: 1000
                });
            })
    }
    const handleGoogle = () => {
        googleSignIn()
            .then(() => {
                toast.success("Login Succesfully", {
                    position: "top-center",
                    autoClose: 1000
                });
                navigate(location?.state ? location.state : "/")
            })
            .catch(() => {
                toast.error("Login Unsuccesful", {
                    position: "top-center",
                    autoClose: 1000
                });
            })
    }


    return (
        <div>
            <Helmet>
                <title>Turio/Login</title>
            </Helmet>
            <div className="w-full mx-auto space-y-3 mt-5 max-w-md p-8  rounded-xl bg-gray-50 text-gray-800 ">

                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handleLogin} className="space-y-6 w-full">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="username" className="block text-xl font-semibold text-gray-600"> Email</label>
                        <input type="email" name="email" placeholder="Enter your Email" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" required />

                    </div>
                    <div className="space-y-1 relative text-sm">
                        <label htmlFor="password" className="block text-xl font-semibold text-gray-600"> Password</label>
                        <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Enter your Password" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" required />
                        <div onClick={() => setShowPassword(!showPassword)} className="absolute text-2xl text-gray-600 top-9 right-2">
                            {
                                showPassword ? <FaEyeSlash /> : <FaEye />
                            }
                        </div>
                    </div>
                    <button type="submit" className="block w-full p-3 text-center rounded-sm text-gray-50 bg-violet-600">Sign in</button>
                </form>

                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1  h-px sm:w-16 bg-gray-300"></div>
                    <p className="px-3 text-sm text-gray-600">Login with social accounts</p>
                    <div className="flex-1 h-px  sm:w-16 bg-gray-300"></div>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleGoogle}
                        className="text-xl "><FaGoogle />
                    </button>
                </div>
                <p className=" text-xs text-center sm:px-6 text-gray-600 justify-center flex">Do not have an account?
                    <Link to="/signup">
                        <button className="ml-4   font-bold  text-blue-600 items-center justify-center
                     flex">Signup <GoArrowRight />  </button>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;