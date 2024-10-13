const TicketComponent = ({tickets}) => (
    <>
        {tickets.map((ticket) => (
            <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.student}</td>
                <td>{ticket.firstName}</td>
                <td>{ticket.lastName}</td>
                <td>{ticket.email}</td>
                <td>{ticket.createdDate}</td>
                <td>{ticket.createdTime}</td>
                <td>{ticket.text}</td>
            </tr>
        ))}
    </>
);

export default TicketComponent;