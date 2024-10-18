import {useState} from "react";
import {udc} from "../../udc/udc";
import {USER_LOGGED_IN_ENTRANCE} from "../../App.config";
import {Link} from "react-router-dom";

function LoginComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [studentVersion, setStudentVersion] = useState(true);
    const [loginMessage, setLoginMessage] = useState("");

    const switchVersion = () => {
        setStudentVersion(!studentVersion);
        setLoginMessage("");
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginMessage("");

        let result = await udc.post(studentVersion ? "login-student" : "login-admin", "",
            {
                "username": username,
                "password": password
            })
            .then((data) => {
                return data
            })
            .catch((data) => {
                return data
            });

        if (result.status === 200) {
            const loggedInUser = {type: result.userdata.type, token: result.userdata.token};
            localStorage.setItem("user", JSON.stringify(loggedInUser));
            window.location.href = USER_LOGGED_IN_ENTRANCE;
        } else {
            setLoginMessage(result.message);
        }
    }

    return (
        <>
            <div>
                <form onSubmit={handleLogin}>
                    <div>
                        <h2>{studentVersion ? "Student" : "Administrator"} Log in</h2>
                    </div>

                    <div>
                        <input
                            type="text"
                            name="tbUsername"
                            onChange={handleUsernameChange}
                            placeholder="Username"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="tbPassword"
                            onChange={handlePasswordChange}
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div>
                        <p>{loginMessage}</p>
                    </div>

                    <div>
                        <button type="submit" name="btnSubmit">Log in</button>
                    </div>
                </form>
                {
                    studentVersion &&
                    <div>
                        <p>Not registered yet? <Link to="/signup">Sign up</Link> now!</p>
                    </div>
                }

                <div>
                    <a onClick={switchVersion}>
                        <i className="fa-solid fa-repeat"></i> Switch
                        to {studentVersion ? "Administrator" : "Student"} Version
                    </a>
                </div>
            </div>
        </>
    );
}

export default LoginComponent;