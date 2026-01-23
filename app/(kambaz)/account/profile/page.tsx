import Link from "next/link";
export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            <div>
                <label htmlFor="wd-username">Username</label>
                <br />
                <input id="wd-username" className="wd-username" defaultValue="alice" title="Please enter your username" placeholder="username" /> <br />
            </div>
            <div>
                <label htmlFor="wd-password">Password</label>
                <br />
                <input id="wd-password" className="wd-password" defaultValue="123" title="Please enter your password" placeholder="password" type="password" /> <br />
            </div>
            <div>
                <label htmlFor="wd-firstname">First Name</label>
                <br />
                <input id="wd-firstname" defaultValue="Alice" title="Please enter your first name" placeholder="First Name" /> <br />
            </div>
            <div>
                <label htmlFor="wd-lastname">Last Name</label>
                <br />
                <input id="wd-lastname" defaultValue="Wonderland" title="Please enter your last name" placeholder="Last Name" /> <br />
            </div>
            <div>
                <label htmlFor="wd-dob">Date of Birth</label>
                <br />
                <input id="wd-dob" defaultValue="2000-01-01" title="Please enter your date of birth" placeholder="Date of Birth" type="date" /> <br />
            </div>
            <div>
                <label htmlFor="wd-email">Email</label>
                <br />
                <input id="wd-email" defaultValue="alice@wonderland" title="Please enter your email address" placeholder="Email Address" type="email" /> <br />
            </div>
            <div>
                <label htmlFor="wd-role">Role</label>
                <br />
                <select id="wd-role" defaultValue="FACULTY" title="Please select your role">
                    <option value="USER">User</option>          <option value="ADMIN">Admin</option>
                    <option value="FACULTY">Faculty</option>    <option value="STUDENT">Student</option>
                </select>
            </div>
            <div>
                <button>Save</button>
                <br />
            </div>
            <Link href="signin"> Sign out </Link>
        </div>
    );
}