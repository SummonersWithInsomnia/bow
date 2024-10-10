import {APP_NAME} from "../App.config";
import ProfileComponent from "../components/profile/Profile.component";

function ProfileRoute() {
    document.title = "Profile - " + APP_NAME;
    return (
        <main>
            <ProfileComponent />
        </main>
    );
}

export default ProfileRoute