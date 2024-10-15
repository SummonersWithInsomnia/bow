import {useEffect, useState} from "react";
import {udc} from "../../udc/udc";
import {GUEST_ENTRANCE} from "../../App.config";
import {Link} from "react-router-dom";

function ProfileEditorComponent() {
    const [userProfile, setUserProfile] = useState({});

    const [updateUserProfileData, setUpdateUserProfileData] = useState({});

    const [saveMessage, setSaveMessage] = useState("");
    const [firstNameTip, setFirstNameTip] = useState("");
    const [lastNameTip, setLastNameTip] = useState("");
    const [emailTip, setEmailTip] = useState("");
    const [phoneNumberTip, setPhoneNumberTip] = useState("");

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        if (JSON.parse(localStorage.getItem("user")) !== null) {
            let result = await udc.get("profile", JSON.parse(localStorage.getItem("user")).token, {})
                .then((data) => { return data; })
                .catch((data) => { return data; });

            if (result.status === 200) {
                setUserProfile(result.userdata);
                setUpdateUserProfileData(result.userdata);
            } else {
                localStorage.removeItem("user");
                window.location.href = GUEST_ENTRANCE;
            }
        } else {
            window.location.href = GUEST_ENTRANCE;
        }
    };

    const updateUserProfile = async (e) => {
        e.preventDefault();
        setSaveMessage("");

        if (firstNameTip === "" && lastNameTip === "" && emailTip === "" && phoneNumberTip === "") {
            let result = await udc.put("profile", JSON.parse(localStorage.getItem("user")).token, updateUserProfileData)
                .then((data) => { return data })
                .catch((data) => { return data });

            if (result.status === 200) {
                setSaveMessage(result.message);
                setTimeout(() => {
                    setSaveMessage("");
                }, 3000);
            } else {
                setSaveMessage(result.message);
                setTimeout(() => {
                    setSaveMessage("");
                }, 3000);
            }
        }
    };

    const handleFormChange = (e) => {
        switch (e.target.name) {
            case "tbFirstName":
                if (!isValidName(e.target.value)) {
                    setFirstNameTip("The first name can only contain English letters and there can only be one space between words.");
                } else {
                    setFirstNameTip("");
                }
                setUpdateUserProfileData({...updateUserProfileData,
                    ["firstName"]: e.target.value
                });
                break;

            case "tbLastName":
                if (!isValidName(e.target.value)) {
                    setLastNameTip("The last name can only contain English letters and there can only be one space between words.");
                } else {
                    setLastNameTip("");
                }
                setUpdateUserProfileData({...updateUserProfileData,
                    ["lastName"]: e.target.value
                });
                break;

            case "tbEmail":
                if (!isValidEmail(e.target.value)) {
                    setEmailTip("The email address is not valid.");
                } else {
                    setEmailTip("");
                }
                setUpdateUserProfileData({...updateUserProfileData,
                    ["email"]: e.target.value
                });
                break;

            case "tbPhoneCountryCode":
                setUpdateUserProfileData({...updateUserProfileData,
                    ["phoneCountryCode"]: Number(e.target.value)
                });
                break;

            case "tbPhoneNumber":
                if (!isValidPhoneNumber(e.target.value)) {
                    setPhoneNumberTip("The phone number can only contain 10 digits and cannot start with 0.");
                } else {
                    setPhoneNumberTip("");
                }
                setUpdateUserProfileData({...updateUserProfileData,
                    ["phoneNumber"]: Number(e.target.value)
                });
                break;

            case "tbBirthday":
                setUpdateUserProfileData({...updateUserProfileData,
                    ["birthday"]: e.target.value
                });
                break;

            default:
                break;
        }
    };

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

    return (
        <>
            {JSON.parse(localStorage.getItem("user")) ? (
                <>
                    <form onSubmit={updateUserProfile}>
                        <div>
                            <h2>Profile Editor</h2>
                        </div>

                        <div>
                            <input
                                type="text"
                                name="tbFirstName"
                                placeholder="First Name"
                                required
                                defaultValue={userProfile.firstName}
                                onChange={handleFormChange}
                            />
                            {firstNameTip && <p>{firstNameTip}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                name="tbLastName"
                                placeholder="Last Name"
                                required
                                defaultValue={userProfile.lastName}
                                onChange={handleFormChange}
                            />
                            {lastNameTip && <p>{lastNameTip}</p>}
                        </div>

                        <div>
                            <input
                                type="email"
                                name="tbEmail"
                                placeholder="Email"
                                required
                                defaultValue={userProfile.email}
                                onChange={handleFormChange}
                            />
                            {emailTip && <p>{emailTip}</p>}
                        </div>

                        <div>
                            <select
                                name="tbPhoneCountryCode"
                                required
                                onChange={handleFormChange}
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
                                defaultValue={userProfile.phoneNumber}
                                onChange={handleFormChange}
                            />
                            {phoneNumberTip && <p>{phoneNumberTip}</p>}
                        </div>

                        <div>
                            <input
                                type="date"
                                name="tbBirthday"
                                required
                                onChange={handleFormChange}
                                defaultValue={userProfile.birthday}
                            />
                        </div>

                        <div>
                            <p>{saveMessage}</p>
                        </div>

                        <div>
                            <button type="submit" name="btnSubmit">Save</button>
                        </div>

                        <div>
                            <br />
                            <Link to="/profile">Back to My Profile</Link>
                        </div>
                    </form>
                </>
            ) : (
                <>
                </>
            )}
        </>
    );
}

export default ProfileEditorComponent