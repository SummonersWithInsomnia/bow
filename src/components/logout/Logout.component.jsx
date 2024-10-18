import {useEffect} from "react";
import {GUEST_ENTRANCE} from "../../App.config";

function LogoutComponent() {
    useEffect(() => {
        localStorage.removeItem("user");
        setTimeout(() => {
            window.location.href = GUEST_ENTRANCE
        }, 3000);
    }, []);

    return (
        <>
            <form>
                <h2>Log out</h2>
                <p>Logging out...</p>
            </form>
        </>
    );
}

export default LogoutComponent