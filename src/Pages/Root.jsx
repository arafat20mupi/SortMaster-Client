import { Outlet } from "react-router-dom";
import Navber from "../Shared/Navber";
import Footer from "../Shared/Footer";

const Root = () => {
    return (
        <div >
            <Navber></Navber>
            <div className="container mx-auto  min-h-[calc(100vh-162.66px)] w-full">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;