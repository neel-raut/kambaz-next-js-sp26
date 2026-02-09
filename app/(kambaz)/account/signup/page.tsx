import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h1>Sign Up</h1>

            <FormControl id="wd-username"
                placeholder="username"
                title="Please enter your username"
                className="mb-2" />
            
            <FormControl id="wd-password"
                placeholder="password"
                type="password"
                title="Please enter your password"
                className="mb-2" />
            
            <FormControl id="wd-verify-password"
                placeholder="verify password"
                type="password"
                title="Please enter your password again"
                className="mb-2" />
            
            <Link id="wd-signup-btn"
                href="/account/profile"
                className="btn btn-primary w-100 mb-2">
                Sign up
            </Link>

            <Link id="wd-signin-link"
                href="/account/signin">
                Sign in
            </Link>
        </div>
    );
}