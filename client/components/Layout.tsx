import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTopButton from "./ScrollToTopButton";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        if (path === "/") {
            document.title = "ESS + BROWNE | Contemporary Architecture & Design Studio | Kumasi, Ghana";
        } else if (path.startsWith("/about")) {
            document.title = "About Us | ESS + BROWNE Architects | Kumasi, Ghana";
        } else if (path.startsWith("/portfolio")) {
            document.title = "Architecture Portfolio & Projects | ESS + BROWNE";
        } else if (path.startsWith("/contact")) {
            document.title = "Contact Us | ESS + BROWNE Architects | Kumasi, Ghana";
        } else if (path.startsWith("/login")) {
            document.title = "Admin Portal | ESS + BROWNE";
        } else if (path.startsWith("/admin")) {
            document.title = "Admin Dashboard | ESS + BROWNE";
        }
    }, [location.pathname]);

    const isAdmin = location.pathname.startsWith("/admin");


    return (
        <div className="flex flex-col min-h-screen">
            {!isAdmin && <Header />}
            <Outlet />
            {!isAdmin && <Footer />}
            <ScrollToTopButton />
        </div>
    );
}
