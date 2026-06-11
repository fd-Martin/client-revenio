import { createBrowserRouter } from "react-router";
import MainLayOut from "../layout/MainLayOut";
import Home from "../pages/Home/Home";
import RenderOutlet from "../components/Auth/RenderOutlet";
import { LogIn } from "lucide-react";
import Rigester from "../components/Auth/Rigester";
import Login from "../components/Auth/Login";
import DashBordLayOut from "../layout/DashBordLayOut";
import AddBookLibery from "../pages/dashboard/Librarian/AddBookLibery";
import AllBooks from "../pages/Home/AllBooks/AllBooks";
import DetlicesPages from "../pages/Home/DetlicesPages/DetlicesPages";
import UserOrderTable from "../pages/dashboard/User/UserOrderTable";
import PaymentSuccess from "../pages/dashboard/Payment/PaymentSuccess";
import PaymentHistory from "../pages/dashboard/User/PaymentHistory";
import MyBooks from "../pages/dashboard/Librarian/MyBooks";
import OrderAllBooks from "../pages/dashboard/Librarian/OrderAllBooks";
import AlluserData from "../pages/dashboard/Admin/AlluserData";
import ManazeBooks from "../pages/dashboard/Admin/ManazeBooks";
import Profile from "../pages/dashboard/Profile/Profile";
import PrivetRoute from "./PrivetRoute";
import LibrarianRoute from "./LibrarianRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import SettingsComponent from "../pages/dashboard/Profile/SettingsComponent";
import NotFound404 from "../pages/NotFound404";
import WishLise from "../pages/Home/WishList/WishLise";
import AdminDashBord from "../pages/dashboard/Admin/AdminDashBord";
import LibrarianDashBord from "../pages/dashboard/Librarian/LibrarianDashBord";
import UserDashBord from "../pages/dashboard/User/UserDashBord";
import AutoRedirectDashboard from "../pages/dashboard/AutoRedirectDashboard/AutoRedirectDashboard";
import LoadingSpinner from "../shared/LoadingSpinner ";
import About from "../pages/Home/AboutUs/About";
import CversArea from "../pages/Home/Map/CversArea";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/coverage",
        element: <CversArea></CversArea>,
      },
      {
        path: "/books",
        element: <AllBooks></AllBooks>,
      },
      {
        path: "/settingse",
        element: (
          <PrivetRoute>
            <SettingsComponent></SettingsComponent>
          </PrivetRoute>
        ),
      },
      {
        path: "/profile2",
        element: (
          <PrivetRoute>
            <Profile></Profile>
          </PrivetRoute>
        ),
      },

      {
        path: "/detlicesPages/:id",
        element: (
          // <PrivetRoute>
          <DetlicesPages></DetlicesPages>
          // </PrivetRoute>
        ),
      },
      // {
      //   path: "/detlicesPages/:id",
      //   element: (
      //     <PrivetRoute>
      //       <DetlicesPages></DetlicesPages>{" "}
      //     </PrivetRoute>
      //   ),
      // },

      {
        path: "*",
        Component: NotFound404,
      },
    ],
  },
  // Auth Layout
  {
    path: "/auth",
    Component: RenderOutlet,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/rigester",
        element: <Rigester></Rigester>,
      },
      {
        path: "*",
        Component: NotFound404,
      },
    ],
  },
  // Dashbord
  {
    path: "/deshbord",
    element: (
      <PrivetRoute>
        <DashBordLayOut />
      </PrivetRoute>
    ),
    children: [
      {
        index: true,
        element: <AutoRedirectDashboard />,
      },

      {
        path: "addbooks",
        element: (
          <LibrarianRoute>
            <AddBookLibery />
          </LibrarianRoute>
        ),
      },
      {
        path: "userorder",
        element: (
          <UserRoute>
            <UserOrderTable />
          </UserRoute>
        ),
      },
      { path: "pymentSuccess", element: <PaymentSuccess /> },
      {
        path: "paymenthistory",
        element: (
          <UserRoute>
            <PaymentHistory />
          </UserRoute>
        ),
      },
      {
        path: "myBooks",
        element: (
          <LibrarianRoute>
            <MyBooks />
          </LibrarianRoute>
        ),
      },
      {
        path: "orderAllBooks",
        element: (
          <LibrarianRoute>
            <OrderAllBooks />
          </LibrarianRoute>
        ),
      },

      {
        path: "adminuserDataSloved",
        element: (
          <AdminRoute>
            <AlluserData />
          </AdminRoute>
        ),
      },
      {
        path: "manazeBooks",
        element: (
          <AdminRoute>
            <ManazeBooks />
          </AdminRoute>
        ),
      },

      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashBord />
          </AdminRoute>
        ),
      },
      {
        path: "user",
        element: (
          <UserRoute>
            <UserDashBord />
          </UserRoute>
        ),
      },
      {
        path: "libraian",
        element: (
          <LibrarianRoute>
            <LibrarianDashBord />
          </LibrarianRoute>
        ),
      },

      { path: "profileLoginUser", element: <Profile /> },
      {
        path: "settings",
        element: (
          <PrivetRoute>
            <SettingsComponent />
          </PrivetRoute>
        ),
      },
      {
        path: "whishList",
        element: (
          <UserRoute>
            <WishLise />
          </UserRoute>
        ),
      },

      { path: "*", Component: NotFound404 },
    ],
  },

  {
    path: "*",
    Component: NotFound404,
  },
]);
