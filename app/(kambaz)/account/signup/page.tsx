/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { FormControl } from "react-bootstrap";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as client from "../client";

export default function Signup() {
    const [user, setUser] = useState<any>({});
    const dispatch = useDispatch();
    const signup = async () => {
        const currentUser = await client.signup(user);
        dispatch(setCurrentUser(currentUser));
        redirect("/account/profile");
    };
    return (
        <div id="wd-signup-screen">
            <h1>Sign Up</h1>

            <FormControl id="wd-username"
                placeholder="username"
                title="Please enter your username"
                className="mb-2"
                onChange={(e) => setUser({ ...user, username: e.target.value })} />
            
            <FormControl id="wd-password"
                placeholder="password"
                type="password"
                title="Please enter your password"
                className="mb-2"
                onChange={(e) => setUser({ ...user, password: e.target.value })} />
            
            <FormControl id="wd-verify-password"
                placeholder="verify password"
                type="password"
                title="Please enter your password again"
                className="mb-2"
                onChange={(e) => setUser({ ...user, passwordVerify: e.target.value })} />
            
            <button id="wd-signup-btn"
                className="btn btn-primary w-100 mb-2"
                onClick={signup}>
                Sign up
            </button><br />

            <Link id="wd-signin-link"
                href="/account/signin">
                Sign in
            </Link>
        </div>
    );
}