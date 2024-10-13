import { APP_NAME } from "../../App.config";
import NavComponent from "./Nav.component";
import {Link} from "react-router-dom";

function HeaderComponent() {
    return(
        <header>
            <h1><Link to="/">{ APP_NAME }</Link></h1>
            <NavComponent />
        </header>
    );
}

export default HeaderComponent;