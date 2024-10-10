import {APP_NAME} from "../App.config";
import ProfileEditorComponent from "../components/profile/ProfileEditor.component";

function ProfileEditorRoute() {
    document.title = "Profile Editor - " + APP_NAME;
    return (
        <main>
            <ProfileEditorComponent />
        </main>
    );
}

export default ProfileEditorRoute