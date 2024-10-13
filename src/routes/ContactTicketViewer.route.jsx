import {APP_NAME} from "../App.config";
import TicketViewerComponent from "../components/contact-ticket/TicketViewer.component";

function ContactTicketViewerRoute() {
    document.title = "View Contact Tickets - " + APP_NAME;

    return (
        <main>
            <TicketViewerComponent />
        </main>
    );
}

export default ContactTicketViewerRoute;