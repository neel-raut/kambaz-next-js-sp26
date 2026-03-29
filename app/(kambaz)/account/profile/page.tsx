/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import * as client from "../client";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };
    const fetchProfile = () => {
        if (!currentUser) return redirect("/account/signin");
        setProfile(currentUser);
    };
    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        redirect("/account/signin");
    };
    useEffect(() => {
        fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div id="wd-profile-screen" className="d-flex flex-column gap-2">
            <h1>Profile</h1>
            {profile && (
                <div>
                    <FormControl id="wd-username" className="mb-2"
                        placeholder="username"
                        defaultValue={profile.username}
                        title="Please enter your username"
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}>
                    </FormControl>

                    <FormControl id="wd-password" className="mb-2"
                        placeholder="password"
                        defaultValue={profile.password}
                        title="Please enter your password"
                        onChange={(e) => setProfile({ ...profile, password: e.target.value })}>
                    </FormControl>

                    <FormControl id="wd-firstname" className="mb-2"
                        placeholder="First Name"
                        defaultValue={profile.firstName}
                        title="Please enter your first name"
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}>
                    </FormControl>

                    <FormControl id="wd-lastname" className="mb-2"
                        placeholder="Last Name"
                        defaultValue={profile.lastName}
                        title="Please enter your last name"
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}>
                    </FormControl>

                    <FormControl id="wd-dob" className="mb-2"
                        placeholder="Date of Birth"
                        type="date"
                        defaultValue={profile.dob ? profile.dob.split("T")[0] : ""}
                        title="Please enter your date of birth"
                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}>
                    </FormControl>

                    <FormControl id="wd-email" className="mb-2"
                        placeholder="Email Address"
                        type="email"
                        defaultValue={profile.email}
                        title="Please enter your email address"
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}>
                    </FormControl>

                    <FormSelect id="wd-role" className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </FormSelect>

                    <Button id="wd-update-btn"
                        onClick={updateProfile}
                        className="btn btn-primary w-100 mb-2">
                        Update
                    </Button>

                    <Button id="wd-signout-btn"
                        onClick={signout}
                        className="btn btn-danger w-100 mt-1">
                        Sign out
                    </Button>
                </div>
            )}
        </div>
    );
}