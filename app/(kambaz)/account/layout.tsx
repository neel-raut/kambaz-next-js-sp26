import { ReactNode } from "react";
import AccountNavigation from "./Navigation"

export default function AccountLayout({ children }:
    Readonly<{ children: ReactNode }>) {
    return (
        <div id="wd-account">
            <div className="d-flex">
                <div className="d-none d-sm-block">
                    <AccountNavigation />
                </div>

                <div className="flex-fill p-3">
                    {children}
                </div>
            </div>
            {/* <table>
                <tr>
                    <td valign="top"><AccountNavigation /></td>
                    <td valign="top" width="100%">{children}</td>
                </tr>
            </table> */}
        </div>
    );
}