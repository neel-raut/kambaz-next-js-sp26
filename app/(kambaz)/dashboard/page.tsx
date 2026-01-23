import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link href="/courses/1234" className="wd-dashboard-course-link">
                        <Image src="/images/ReactJS.jpg" width={200} height={150} alt={"reactjs"} />
                        <div>
                            <h5> CS1234 React JS</h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/courses/3000" className="wd-dashboard-course-link">
                        <Image src="/images/cs3000pic.jpg" width={200} height={150} alt={"graph"} />
                        <div>
                            <h5> CS3000 Algorithms </h5>
                            <p className="wd-dashboard-course-title">
                                Algorithms & Data 
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/courses/3650" className="wd-dashboard-course-link">
                        <Image src="/images/cs3650pic.jpg" width={200} height={150} alt={"computers"} />
                        <div>
                            <h5> CS3650 Computer Systems </h5>
                            <p className="wd-dashboard-course-title">
                                Computer Systems
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/courses/3800" className="wd-dashboard-course-link">
                        <Image src="/images/cs3800pic.jpg" width={200} height={150} alt={"turing machine"} />
                        <div>
                            <h5> CS3800 Theory of Computation </h5>
                            <p className="wd-dashboard-course-title">
                                Theory of Computation
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/courses/2550" className="wd-dashboard-course-link">
                        <Image src="/images/cy2550pic.jpg" width={200} height={150} alt={"cybersecurity"} />
                        <div>
                            <h5> CY2550 Cybersecurity </h5>
                            <p className="wd-dashboard-course-title">
                                Cybersecurity 
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/courses/1112" className="wd-dashboard-course-link">
                        <Image src="/images/comm1112pic.jpg" width={200} height={150} alt={"React JS"} />
                        <div>
                            <h5> COM1112 Public Speaking</h5>
                            <p className="wd-dashboard-course-title">
                                Public Speaking 
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/courses/2345" className="wd-dashboard-course-link">
                        <Image src="/images/thtr2345pic.jpg" width={200} height={150} alt={"React JS"} />
                        <div>
                            <h5> THTR2345 Acting for the Camera</h5>
                            <p className="wd-dashboard-course-title">
                                Acting for the Camera 
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}