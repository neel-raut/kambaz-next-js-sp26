import { ReactNode } from "react";
import AccountNavigation from "./Navigation"

export default function AccountLayout({ children }:
    Readonly<{ children: ReactNode }>) {
    return (
        <div>
            <table>
                <tr>
                    <td valign="top"><AccountNavigation /></td>
                    <td valign="top" width="100%">{children}</td>
                </tr>
            </table>
        </div>
    );
}