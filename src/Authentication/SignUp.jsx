import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const Signup = () => {
    const { createUser, updateUser, setUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const photoUrl = formData.get('photo');

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters", {
                position: "top-center",
                autoClose: 1000
            });
            return;
        }

        if (!/[A-Z]/.test(password)) {
            toast.error("Must have an Uppercase letter", {
                position: "top-center",
                autoClose: 1000
            });
            return;
        }

        if (!/[a-z]/.test(password)) {
            toast.error("Must have a Lowercase letter", {
                position: "top-center",
                autoClose: 1000
            });
            return;
        }

        createUser(email, password)
            .then(() => {
                // Set user data
                const userData = {
                    displayName: name,
                    photoURL: photoUrl,
                    email: email,
                    password: password,
                };

                // Update user data
                updateUser(userData)
                    .then(() => {
                        // Update user successful
                        setUser(userData);
                        toast.success("Registered Successfully", {
                            position: "top-center",
                            autoClose: 1000
                        });
                        navigate("/");
                    })
                    .catch(error => {
                        // Handle update user error
                        console.error("Error updating user:", error);
                        toast.error("Failed to update user information", {
                            position: "top-center",
                            autoClose: 1000
                        });
                    });
            })
            .catch(() => {
                toast.error("Already Registered This Account", {
                    position: "top-center",
                    autoClose: 1000
                });
            });
    };

    return (
        <div>
            <Helmet>
                <title>Turio/SignUp</title>
            </Helmet>
            <div className="w-full mx-auto mt-6 max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800 ">
                <h1 className="text-2xl font-bold text-center">Sign Up Now</h1>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="space-y-1 text-sm">
                        <label className="block text-xl font-semibold text-gray-600">Your Name</label>
                        <input type="text" name="name" placeholder="Enter your Name" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" required />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label className="block text-xl font-semibold text-gray-600">Photo URL</label>
                        <input type="text" name="photo" placeholder="Enter your Photo URL" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" required />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label className="block text-xl font-semibold text-gray-600">Email</label>
                        <input type="email" name="email" placeholder="Enter your Email" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" required />
                    </div>
                    <div className="space-y-1 relative text-sm">
                        <label htmlFor="password" className="block text-xl font-semibold text-gray-600">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password" id="password" placeholder="Enter your Password" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" required />
                        <div onClick={() => setShowPassword(!showPassword)} className="absolute text-2xl text-gray-600 top-9 right-2">
                            {
                                showPassword ? <FaEyeSlash /> : <FaEye />
                            }
                        </div>
                    </div>
                    <button type="submit" className="block w-full p-3 text-center rounded-sm text-gray-50 bg-violet-600">Register</button>
                </form>
                <p className="text-xs text-center sm:px-6 text-gray-600 justify-center flex">Already have an account?
                    <Link to="/login">
                        <button className="ml-4  font-bold  text-blue-600 items-center justify-center flex">Login <GoArrowRight /></button>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
