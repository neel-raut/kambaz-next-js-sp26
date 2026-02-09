import { Button, FormControl, FormSelect } from "react-bootstrap";
export default function Profile() {
    return (
        <div id="wd-profile-screen" className="d-flex flex-column gap-2">
            <h1>Profile</h1>

            <FormControl id="wd-username"
                placeholder="username"
                defaultValue="alice"
                title="Please enter your username">
            </FormControl>

            <FormControl id="wd-password"
                placeholder="password"
                defaultValue="123"
                title="Please enter your password">
            </FormControl>

            <FormControl id="wd-firstname"
                placeholder="First Name"
                defaultValue="Alice"
                title="Please enter your first name">
            </FormControl>

            <FormControl id="wd-lastname"
                placeholder="Last Name"
                defaultValue="Wonderland"
                title="Please enter your last name">
            </FormControl>

            <FormControl id="wd-dob"
                placeholder="Date of Birth"
                type="date"
                defaultValue="2000-01-01"
                title="Please enter your date of birth">
            </FormControl>

            <FormControl id="wd-email"
                placeholder="Email Address"
                type="email"
                defaultValue="alice@wonderland"
                title="Please enter your email address">
            </FormControl>

            <FormSelect>
                <option value="USER" defaultChecked>User</option>
                <option value="FACULTY">Faculty</option>
            </FormSelect>

            <Button id="wd-signout-btn"
                href="/account/signin"
                className="btn btn-danger w-100 mt-1">
                 Signout
            </Button>
        </div>
    );
}