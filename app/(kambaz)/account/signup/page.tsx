import Link from "next/link";
export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h3>Sign Up</h3>
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
            <div>
                <label htmlFor="wd-verify-password">Verify Password</label>
                <br />
                <input id="wd-verify-password" className="wd-password-verify" value = "123" title="Please enter your password again" placeholder="verify password" type="password" /> <br />
            </div>
                <Link href="profile"> Sign up </Link>
                <br />
                <Link href="signin"> Sign in </Link>
        </div>
    );
}