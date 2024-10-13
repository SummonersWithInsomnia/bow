import {Link} from "react-router-dom";

function NavComponent() {
    return (
        <nav>
            <ul>
                {JSON.parse(localStorage.getItem("user")) ? (
                    <>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        {JSON.parse(localStorage.getItem("user")).type === "admin" && <li><Link to="/create-course">Create Course</Link></li>}
                        {JSON.parse(localStorage.getItem("user")).type === "admin" && <li><Link to="/course-management">Course Management</Link></li>}
                        {JSON.parse(localStorage.getItem("user")).type === "admin" && <li><Link to="/student-list">Student List</Link></li>}
                        {JSON.parse(localStorage.getItem("user")).type === "admin" && <li><Link to="/contact-ticket-viewer">View Contact Tickets</Link></li>}
                        {JSON.parse(localStorage.getItem("user")).type === "student" && <li><Link to="/course-registration">Course Registration</Link></li>}
                        {JSON.parse(localStorage.getItem("user")).type === "student" && <li><Link to="/my-courses">My Courses</Link></li>}
                        {JSON.parse(localStorage.getItem("user")).type === "student" && <li><Link to="/contact-ticket-sender">Send Contact Ticket</Link></li>}
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/logout">Log out</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/programs">Programs</Link></li>
                        <li><Link to="/courses">Courses</Link></li>
                        <li><Link to="/login">Log in</Link></li>
                        <li><Link to="/signup">Sign up</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavComponent