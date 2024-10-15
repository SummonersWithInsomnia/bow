const StudentComponent = ({students}) => (
    <>
        {students.map((student) => (
            <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.phoneCountryCode}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.department}</td>
                <td>{student.program}</td>
            </tr>
        ))}
    </>
);

export default StudentComponent;