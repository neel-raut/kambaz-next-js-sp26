"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const links = currentUser ? ["profile"] : ["signin", "signup"];
    const pathname = usePathname();
    return (
        <Nav variant="pills" id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            {links.map(link => (
                <Link key={link} href={`/account/${link}`} className={`list-group-item ${pathname === `/account/${link}` ? "active" : "text-danger"} border-0`}>
                    {link[0].toUpperCase() + link.slice(1)}
                </Link>
            ))}
        </Nav>
    );
}