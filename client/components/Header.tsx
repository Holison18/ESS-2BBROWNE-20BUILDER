
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMenu = () => setMobileMenuOpen(false);

    return (
        <nav className={navClasses}>
            <div className="container mx-auto px-4 lg:px-20">
                <div className="flex items-center justify-between py-2 lg:py-2">
                    <Link to="/" onClick={closeMenu}>
                        <img
                            src={logo}
                            alt="ESS + BROWNE"
                            className="h-10 lg:h-14 w-auto cursor-pointer object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
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

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden ${textColorClass} focus:outline-none`}
                        onClick={toggleMenu}
                    >
                        {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center space-y-8"
                    >
                        <button
                            className="absolute top-6 right-6 text-black focus:outline-none"
                            onClick={closeMenu}
                        >
                            <X size={32} />
                        </button>

                        <Link
                            to="/"
                            className="font-outfit text-2xl text-black hover:text-orange font-bold uppercase tracking-widest"
                            onClick={closeMenu}
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="font-outfit text-2xl text-black hover:text-orange font-bold uppercase tracking-widest"
                            onClick={closeMenu}
                        >
                            About Us
                        </Link>
                        <Link
                            to="/portfolio"
                            className="font-outfit text-2xl text-black hover:text-orange font-bold uppercase tracking-widest"
                            onClick={closeMenu}
                        >
                            Portfolio
                        </Link>
                        <Link
                            to="/contact"
                            className="font-outfit text-2xl text-black hover:text-orange font-bold uppercase tracking-widest"
                            onClick={closeMenu}
                        >
                            Contact
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
