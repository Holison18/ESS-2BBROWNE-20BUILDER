import { Outlet } from "react-router-dom";
import ScrollToTopButton from "./ScrollToTopButton";

export default function Layout() {
    return (
        <>
            <Outlet />
            <ScrollToTopButton />
        </>
    );
}
