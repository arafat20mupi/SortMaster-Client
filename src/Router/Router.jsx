import {createBrowserRouter} from "react-router-dom";
import Root from "../Pages/Root";
import Home from "../Pages/Home";
import AllItem from "../Pages/AllItem";
import Login from "../Authentication/Login";
import Signup from "../Authentication/SignUp";
import PrivateRouter from "./PrivateRouter";
import AddProducts from "../Pages/AddProducts";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: '/allItem',
          element: <PrivateRouter><AllItem></AllItem></PrivateRouter>,
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signUp',
          element: <Signup></Signup>
        },
        {
          path: '/AddProducts',
          element: <PrivateRouter><AddProducts></AddProducts></PrivateRouter>
        }
      ]
    },
  ]);
export default router