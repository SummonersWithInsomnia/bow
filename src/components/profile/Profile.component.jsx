import {useEffect, useState} from "react";
import {udc} from "../../udc/udc";
import {GUEST_ENTRANCE} from "../../App.config";
import {Link} from "react-router-dom";

function ProfileComponent() {
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        if (JSON.parse(localStorage.getItem("user")) !== null) {
            let result = await udc.get("profile", JSON.parse(localStorage.getItem("user")).token, {})
                .then((data) => {
                    return data;
                })
                .catch((data) => {
                    return data;
                });

            if (result.status === 200) {
                setUserProfile(result.userdata);
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
                        <div>
                            <h2>My Profile</h2>
                            <p>First Name: {userProfile.firstName}</p>
                            <p>Last Name: {userProfile.lastName}</p>
                            <p>Email: {userProfile.email}</p>
                            <p>Phone: +{userProfile.phoneCountryCode} {userProfile.phoneNumber}</p>
                            <p>Birthday: {userProfile.birthday}</p>
                        </div>
                        <div>
                            <br/>
                            <Link to="/profile-editor">Edit My Profile</Link>
                        </div>
                    </form>
                </>
            ) : (
                <>
                </>
            )}
        </>
    );
}

export default ProfileComponent