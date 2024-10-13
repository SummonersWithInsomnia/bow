import {APP_NAME} from "../App.config";
import TicketSenderComponent from "../components/contact-ticket/TicketSender.component";

function ContactTicketSenderRoute() {
    document.title = "Send Contact Ticket - " + APP_NAME;

    return (
        <main>
            <TicketSenderComponent />
        </main>
    );
}

export default ContactTicketSenderRoute;