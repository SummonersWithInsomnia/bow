import {useEffect, useState} from "react";
import {udc} from "../../udc/udc";
import {GUEST_ENTRANCE} from "../../App.config";
import TicketComponent from "./Ticket.component";

function TicketViewerComponent() {
    const [userInfo, setUserInfo] = useState({});
    const [ticketData, setTicketData] = useState([]);

    useEffect(() => {
        getUserInfo();
        getTicketData();
    }, []);

    const getUserInfo = async () => {
        if (JSON.parse(localStorage.getItem("user")) !== null) {
            let result = await udc.get("user", JSON.parse(localStorage.getItem("user")).token, {})
                .then((data) => { return data; })
                .catch((data) => { return data; });

            if (result.status === 200) {
                setUserInfo(result.userdata);
            } else {
                localStorage.removeItem("user");
                window.location.href = GUEST_ENTRANCE;
            }
        } else {
            window.location.href = GUEST_ENTRANCE;
        }
    }

    const getTicketData = async () => {
        if (JSON.parse(localStorage.getItem("user")) !== null) {
            let result = await udc.get("tickets", JSON.parse(localStorage.getItem("user")).token, {})
                .then((data) => { return data; })
                .catch((data) => { return data; });

            if (result.status === 200) {
                setTicketData(result.data);
            }
        }
    }

    return (
        <>
            {JSON.parse(localStorage.getItem("user")) ? (
                <>
                    {userInfo.type === "admin" ? (
                        <div>
                            <h2>Contact Ticket Viewer</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>Ticket ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Created Date</th>
                                    <th>Created Time</th>
                                    <th>Text</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    ticketData.length !== 0 &&
                                    <TicketComponent tickets={ticketData}></TicketComponent>
                                }
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <form>
                            <h2>Contact Ticket Viewer</h2>
                            <p>This function is only available for admins.</p>
                        </form>
                    )}
                </>
            ) : (
                <>
                </>
            )}
        </>
    );
}

export default TicketViewerComponent;