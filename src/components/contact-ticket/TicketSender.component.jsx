import {useEffect, useState} from "react";
import {udc} from "../../udc/udc";
import {GUEST_ENTRANCE, USER_LOGGED_IN_ENTRANCE} from "../../App.config";

function TicketSenderComponent() {
    const [userInfo, setUserInfo] = useState({});
    const [ticketData, setTicketData] = useState({
        student: -1,
        text: ""
    });

    const [ticketMessage, setTicketMessage] = useState("");
    const [sending, setSending] = useState(false);

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        if (JSON.parse(localStorage.getItem("user")) !== null) {
            let result = await udc.get("user", JSON.parse(localStorage.getItem("user")).token, {})
                .then((data) => { return data; })
                .catch((data) => { return data; });

            if (result.status === 200) {
                setUserInfo(result.userdata);
                setTicketData({...ticketData, student: result.userdata.id});
            } else {
                localStorage.removeItem("user");
                window.location.href = GUEST_ENTRANCE;
            }
        } else {
            window.location.href = GUEST_ENTRANCE;
        }
    }

    const handleSendTicket = async (e) => {
        e.preventDefault();

        if (ticketData.text.length === 0) {
            setTicketMessage("The message cannot be empty.");
            return;
        }

        setSending(true);
        setTicketMessage("Sending...");


        let result = await udc.post("send-ticket", JSON.parse(localStorage.getItem("user")).token, ticketData)
            .then((data) => { return data })
            .catch((data) => { return data });

        if (result.status === 200) {
            setTicketMessage(result.message);
            setTimeout(() => {window.location.href = USER_LOGGED_IN_ENTRANCE}, 3000);
        } else {
            setSending(false);
            setTicketMessage(result.message);
        }
    }

    const handleTextChange = (e) => {
        setTicketData({...ticketData, text: e.target.value});
    }

    return (
        <>
            {JSON.parse(localStorage.getItem("user")) ? (
                <>
                    {userInfo.type === "student" ? (
                        <div>
                            <form onSubmit={handleSendTicket}>
                                <h2>Send Contact Ticket</h2>
                                {!sending &&
                                <div>
                                    <textarea
                                        placeholder={"Please leave your message..."}
                                        minLength={20}
                                        maxLength={140}
                                        onChange={handleTextChange}
                                        required
                                        name="tbText"
                                    />
                                </div>
                                }

                                <div>
                                    <p>{ticketMessage}</p>
                                </div>
                                {!sending &&
                                <div>
                                    <button type="submit" name="btnSend">Send</button>
                                </div>
                                }

                            </form>
                        </div>
                    ) : (
                        <form>
                            <h2>Send Contact Ticket</h2>
                            <p>This function is only available for students.</p>
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

export default TicketSenderComponent;