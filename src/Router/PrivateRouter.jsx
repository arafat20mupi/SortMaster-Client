/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Navigate } from "react-router-dom"
import {  useLocation} from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
const PrivateRouter = ({ children }) => {
    const { user,loading } = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return < div className="  justify-center text-center flex items-center mt-40 w-full">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }
    if (user) {
        return children
    }
    return < Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRouter;