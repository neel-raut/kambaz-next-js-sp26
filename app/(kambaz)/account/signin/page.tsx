import Link from "next/link";
export default function Signin() {
    return (
        <div id="wd-signin-screen">
            <h3>Sign In</h3>
            <div>
                <label htmlFor="wd-username">Username</label>
                <br />
                <input id="wd-username" className="wd-username" value = "alice" title="Please enter your username" placeholder="username" /> <br />
            </div>
            <div>
                <label htmlFor="wd-password">Password</label>
                <br />
                <input id="wd-password" className="wd-password" value = "123" title="Please enter your password" placeholder="password" type="password" /> <br />
            </div>
            <Link href="/dashboard" id="wd-signin-btn"> Sign in </Link>
            <br />
            <Link href="signup" id="wd-signup-link"> Sign up </Link>
        </div>
    );
}