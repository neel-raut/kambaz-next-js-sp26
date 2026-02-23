"use client"

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function KambazNavigation() {
    const pathname = usePathname();
    const links = [
        { label: "Dashboard", path: "/dashboard", icon: AiOutlineDashboard },
        { label: "Courses", path: "/dashboard", icon: LiaBookSolid },
        { label: "Calendar", path: "/calendar", icon: IoCalendarOutline },
        { label: "Inbox", path: "/inbox", icon: FaInbox },
        { label: "Labs", path: "/labs", icon: LiaCogSolid },
    ]
    return (
        <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" style={{ width: 120 }}
              id="wd-kambaz-navigation">
            <ListGroupItem className="bg-black border-0 text-center" action
                    target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
                <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
            </ListGroupItem>

            <ListGroupItem as={Link} href="/account"
                className={`bg-black border-0 text-center
                            ${pathname.includes("account") ? "bg-white text-danger" : "bg-black text-white"}`}>
                    <FaRegCircleUser
                    className={`fs-1 ${pathname.includes("account") ? "text-danger" : "text-white"}`} />
                    <br />
                    Account
            </ListGroupItem>

            {links.map((link) => (
                <ListGroupItem key={link.label} as={Link} href={link.path}
                    className={`border-0 text-center
                                ${pathname.includes(link.label.toLowerCase()) ? "bg-white text-danger" : "bg-black text-white"}`}>
                    {link.icon({ className: "fs-1 text-danger"})}
                    <br />
                    {link.label}
                </ListGroupItem>
            ))}
        </ListGroup>
    );
}