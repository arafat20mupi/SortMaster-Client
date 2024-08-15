import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const Navber = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut();
        toast.success('Successfully logout!')
    }

    return (
        <div className="navbar shadow-md bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu space-y-1 menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><NavLink to={'/'}>Home</NavLink></li>
                        <li><NavLink to={'/allItem'}>All Item</NavLink></li>
                        <li><NavLink to={'/AddProducts'}>Add Products</NavLink></li>
                    </ul>
                </div>
                <Link to={"/"} className="flex items-center text-xl font-bold gap-2">
                    SortMaster
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu space-x-2 menu-horizontal  px-1">
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/allItem'}>All Item</NavLink></li>
                    <li><NavLink to={'/AddProducts'}>Add Products</NavLink></li>
                </ul>
            </div>
            <div className="flex navbar-end justify-end">
                {
                    user ?
                        <div
                            onClick={handleLogOut}
                            className=" btn  ">
                            <NavLink >LogOut</NavLink>
                        </div>
                        :
                        <div className=" btn ">
                            <NavLink to={'/login'}>Login</NavLink>
                        </div>
                }
            </div>

        </div>
    );
};

export default Navber;