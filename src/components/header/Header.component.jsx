import { APP_NAME } from "../../App.config";
import NavComponent from "./Nav.component";

function HeaderComponent() {
    return(
        <header>
            <h1><a href="/">{ APP_NAME }</a></h1>
            <NavComponent />
        </header>
    );
}

export default HeaderComponent;