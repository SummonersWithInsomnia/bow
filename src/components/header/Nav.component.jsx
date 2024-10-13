function NavComponent() {
    return (
        <nav>
            <ul>
                {JSON.parse(localStorage.getItem("user")) ? (
                    <>
                        <li><a href="/dashboard">Dashboard</a></li>
                        {JSON.parse(localStorage.getItem("user")).type === "admin" && <li><a href="/create-course">Create Course</a></li>}
                        {JSON.parse(localStorage.getItem("user")).type === "admin" && <li><a href="/course-management">Course Management</a></li>}
                        {JSON.parse(localStorage.getItem("user")).type === "admin" && <li><a href="/student-list">Student List</a></li>}
                        {JSON.parse(localStorage.getItem("user")).type === "admin" && <li><a href="/contact-ticket-viewer">View Contact Tickets</a></li>}
                        {JSON.parse(localStorage.getItem("user")).type === "student" && <li><a href="/course-registration">Course Registration</a></li>}
                        {JSON.parse(localStorage.getItem("user")).type === "student" && <li><a href="/my-courses">My Courses</a></li>}
                        {JSON.parse(localStorage.getItem("user")).type === "student" && <li><a href="/contact-ticket-sender">Send Contact Ticket</a></li>}
                        <li><a href="/profile">Profile</a></li>
                        <li><a href="/logout">Log out</a></li>
                    </>
                ) : (
                    <>
                        <li><a href="/programs">Programs</a></li>
                        <li><a href="/courses">Courses</a></li>
                        <li><a href="/login">Log in</a></li>
                        <li><a href="/signup">Sign up</a></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavComponent