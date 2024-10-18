import {udc} from "../../udc/udc";
import {GUEST_ENTRANCE} from "../../App.config";
import {useEffect, useState} from "react";

function DashboardComponent() {
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        getDashboardData();
    }, []);

    const getDashboardData = async () => {
        if (JSON.parse(localStorage.getItem("user")) !== null) {
            let result = await udc.get("dashboard", JSON.parse(localStorage.getItem("user")).token, {})
                .then((data) => {
                    return data;
                })
                .catch((data) => {
                    return data;
                });

            if (result.status === 200) {
                setUserDetails(result.userdata);
            } else {
                localStorage.removeItem("user");
                window.location.href = GUEST_ENTRANCE;
            }
        } else {
            window.location.href = GUEST_ENTRANCE;
        }
    };

    return (
        <>
            {JSON.parse(localStorage.getItem("user")) ? (
                <>
                    <form>
                        <h2>Welcome to Dashboard</h2>
                        <p>Hello, {userDetails.firstName} {userDetails.lastName}.</p>
                        <p>Your {userDetails.type} ID is {userDetails.id}.</p>
                        <p>Your department is {userDetails.department}.</p>
                        {userDetails.type === "student" && <p>Your program is {userDetails.program}.</p>}
                    </form>
                </>
            ) : (
                <>
                </>
            )}
        </>
    );
}

export default DashboardComponent