
import Footer from "../Footer";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow p-2">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
