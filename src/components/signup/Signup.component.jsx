import {useState} from "react";
import {udc} from "../../udc/udc";
import {USER_LOGGED_IN_ENTRANCE} from "../../App.config";

function SignupComponent() {
    const [signupFormData, setSignupFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneCountryCode: 0,
        phoneNumber: 0,
        birthday: "",
        department: "",
        program: ""
    });

    const [signupMessage, setSignupMessage] = useState("");
    const [usernameTip, setUsernameTip] = useState("");
    const [passwordTip, setPasswordTip] = useState("");
    const [repeatPasswordTip, setRepeatPasswordTip] = useState("");
    const [firstNameTip, setFirstNameTip] = useState("");
    const [lastNameTip, setLastNameTip] = useState("");
    const [emailTip, setEmailTip] = useState("");
    const [phoneNumberTip, setPhoneNumberTip] = useState("");

    function isValidUsername(username) {
        const regex = /^[a-z0-9]+$/;
        return regex.test(username);
    }

    function checkPasswordLength(password) {
        if (password.length >= 8) {
            return true;
        } else {
            return false;
        }
    }

    function isValidName(name) {
        const regex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
        return regex.test(name);
    }

    function isValidEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    function isValidPhoneNumber(phoneNumber) {
        const regex = /^[1-9][0-9]{9}$/;
        return regex.test(phoneNumber);
    }

    const handleSignupFormChange = (e) => {
        switch (e.target.name) {
            case "tbUsername":
                if (!isValidUsername(e.target.value)) {
                    setUsernameTip("Usernames can only contain lowercase English letters and numbers.")
                } else {
                    setUsernameTip("");
                }
                setSignupFormData({
                    ...signupFormData,
                    ["username"]: e.target.value
                });
                break;

            case "tbPassword":
                if (!checkPasswordLength(e.target.value)) {
                    setPasswordTip("Password length must be greater than or equal to 8.");
                } else {
                    setPasswordTip("");
                }
                setSignupFormData({
                    ...signupFormData,
                    ["password"]: e.target.value
                });
                break;

            case "tbRepeatPassword":
                if (e.target.value !== signupFormData.password) {
                    setRepeatPasswordTip("Re-password does not match.");
                } else {
                    setRepeatPasswordTip("");
                }
                break;

            case "tbFirstName":
                if (!isValidName(e.target.value)) {
                    setFirstNameTip("The first name can only contain English letters and there can only be one space between words.");
                } else {
                    setFirstNameTip("");
                }
                setSignupFormData({
                    ...signupFormData,
                    ["firstName"]: e.target.value
                });
                break;

            case "tbLastName":
                if (!isValidName(e.target.value)) {
                    setLastNameTip("The last name can only contain English letters and there can only be one space between words.");
                } else {
                    setLastNameTip("");
                }
                setSignupFormData({
                    ...signupFormData,
                    ["lastName"]: e.target.value
                });
                break;

            case "tbEmail":
                if (!isValidEmail(e.target.value)) {
                    setEmailTip("The email address is not valid.");
                } else {
                    setEmailTip("");
                }
                setSignupFormData({
                    ...signupFormData,
                    ["email"]: e.target.value
                });
                break;

            case "tbPhoneCountryCode":
                setSignupFormData({
                    ...signupFormData,
                    ["phoneCountryCode"]: Number(e.target.value)
                });
                break;

            case "tbPhoneNumber":
                if (!isValidPhoneNumber(e.target.value)) {
                    setPhoneNumberTip("The phone number can only contain 10 digits and cannot start with 0.");
                } else {
                    setPhoneNumberTip("");
                }
                setSignupFormData({
                    ...signupFormData,
                    ["phoneNumber"]: Number(e.target.value)
                });
                break;

            case "tbBirthday":
                setSignupFormData({
                    ...signupFormData,
                    ["birthday"]: e.target.value
                });
                break;

            case "tbDepartment":
                setSignupFormData({
                    ...signupFormData,
                    ["department"]: e.target.value
                });
                break;

            case "tbProgram":
                setSignupFormData({
                    ...signupFormData,
                    ["program"]: e.target.value
                });
                break;

            default:
                break;
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setSignupMessage("");

        if (usernameTip === "" && passwordTip === "" && repeatPasswordTip === "" && firstNameTip === "" && lastNameTip === "" && emailTip === "" && phoneNumberTip === "") {
            if (signupFormData.phoneCountryCode === 0) signupFormData.phoneCountryCode = 1;
            if (signupFormData.department === "") signupFormData.department = "Software Development";
            if (signupFormData.program === "") signupFormData.program = "Certificate (6 months)";

            let result = await udc.post("signup-student", "", signupFormData)
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
                setSignupMessage(result.message);
            }
        }
    };

    return (
        <>
            <div>
                <form onSubmit={handleSignup}>
                    <div>
                        <h2>Sign up</h2>
                    </div>

                    <div>
                        <input
                            type="text"
                            name="tbUsername"
                            placeholder="Username"
                            required
                            onChange={handleSignupFormChange}
                        />
                        {usernameTip && <p>{usernameTip}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            name="tbPassword"
                            placeholder="Password"
                            required
                            onChange={handleSignupFormChange}
                        />
                        {passwordTip && <p>{passwordTip}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            name="tbRepeatPassword"
                            placeholder="Repeat Password"
                            required
                            onChange={handleSignupFormChange}
                        />
                        {repeatPasswordTip && <p>{repeatPasswordTip}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="tbFirstName"
                            placeholder="First Name"
                            required
                            onChange={handleSignupFormChange}
                        />
                        {firstNameTip && <p>{firstNameTip}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="tbLastName"
                            placeholder="Last Name"
                            required
                            onChange={handleSignupFormChange}
                        />
                        {lastNameTip && <p>{lastNameTip}</p>}
                    </div>

                    <div>
                        <input
                            type="email"
                            name="tbEmail"
                            placeholder="Email"
                            required
                            onChange={handleSignupFormChange}
                        />
                        {emailTip && <p>{emailTip}</p>}
                    </div>

                    <div>
                        <select
                            name="tbPhoneCountryCode"
                            required
                            onChange={handleSignupFormChange}
                            defaultValue={1}
                        >
                            <option value={1}>Canada (+1)</option>
                            <option value={1}>United States (+1)</option>
                        </select>
                    </div>

                    <div>
                        <input
                            type="text"
                            name="tbPhoneNumber"
                            placeholder="Phone Number"
                            required
                            onChange={handleSignupFormChange}
                        />
                        {phoneNumberTip && <p>{phoneNumberTip}</p>}
                    </div>

                    <div>
                        <input
                            type="date"
                            name="tbBirthday"
                            required
                            onChange={handleSignupFormChange}
                        />
                    </div>

                    <div>
                        <select
                            name="tbDepartment"
                            required
                            onChange={handleSignupFormChange}
                            defaultValue="Software Development"
                        >
                            <option value="Software Development">Software Development</option>
                        </select>
                    </div>

                    <div>
                        <select
                            name="tbProgram"
                            required
                            onChange={handleSignupFormChange}
                            defaultValue="Certificate (6 months)"
                        >
                            <option value="Certificate (6 months)">Certificate (6 months)</option>
                            <option value="Post-Diploma (1 year)">Post-Diploma (1 year)</option>
                            <option value="Diploma (2 years)">Diploma (2 years)</option>
                        </select>
                    </div>

                    <div>
                        <p>{signupMessage}</p>
                    </div>

                    <div>
                        <button type="submit" name="btnSubmit">Sign up</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignupComponent;