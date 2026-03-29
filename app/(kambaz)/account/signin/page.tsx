/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as client from "../client";

export default function Signin() {
    const [credentials, setCredentials] = useState<any>({});
    const dispatch = useDispatch();
    const signin = async () => {
        const user = await client.signin(credentials);
        if (!user) return;
        dispatch(setCurrentUser(user));
        redirect("/dashboard");
    };
    return (
        <div id="wd-signin-screen">
            <h1>Sign In</h1>
            <FormControl id="wd-username"
                placeholder="username"
                title="Please enter your username"
                className="mb-2"
                defaultValue={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />

            <FormControl id="wd-password"
                placeholder="password"
                type="password"
                title="Please enter your password"
                className="mb-2"
                defaultValue={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            
            <Button id="wd-signin-btn"
                className="btn btn-primary w-100 mb-2"
                onClick={signin}>
                Sign in
            </Button>

            <Link id="wd-signup-link"
                href="/account/signup">
                Sign up
            </Link>
        </div>
    );
}