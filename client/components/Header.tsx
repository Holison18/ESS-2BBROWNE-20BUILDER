
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === "/";
    // Check if we are on a project details page
    const isProjectDetails = location.pathname.startsWith("/portfolio/") && location.pathname !== "/portfolio";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine Nav Classes based on route
    let navClasses = "z-50 py-4 lg:py-6 transition-all duration-300";
    let textColorClass = "text-black"; // Default for most pages

    if (isHome || isProjectDetails) {
        navClasses += " absolute top-0 left-0 right-0";
        textColorClass = isScrolled ? "text-black" : "text-white";
    } else {
        // Default for About, Contact, Portfolio main page
        navClasses += " relative bg-white";
        textColorClass = "text-black";
    }

    // Override text color logic if specific needs arise
    // For now, simple mapping:
    const linkBaseClasses = "transition-colors";
    const hoverClass = "hover:text-orange";

    return (
        <nav className={navClasses}>
            <div className="container mx-auto px-4 lg:px-20">
                <div className="flex items-center justify-between py-2 lg:py-2">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="ESS + BROWNE"
                            className="h-10 lg:h-14 w-auto cursor-pointer object-contain"
                        />
                    </Link>
                    <div className={`hidden md:flex items-center gap-8 lg:gap-12 font-noto text-base lg:text-lg font-medium tracking-wide ${textColorClass}`}>
                        <Link to="/" className={`${linkBaseClasses} ${hoverClass}`}>
                            HOME
                        </Link>
                        <Link to="/about" className={`${linkBaseClasses} ${hoverClass}`}>
                            ABOUT US
                        </Link>
                        <Link to="/portfolio" className={`${linkBaseClasses} ${hoverClass} ${location.pathname === "/portfolio" ? "text-orange" : ""}`}>
                            PORTFOLIO
                        </Link>
                        <Link to="/contact" className={`${linkBaseClasses} ${hoverClass} ${location.pathname === "/contact" ? "text-orange" : ""}`}>
                            CONTACT
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
