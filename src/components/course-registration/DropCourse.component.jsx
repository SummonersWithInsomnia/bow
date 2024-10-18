import {useEffect, useState} from "react";
import {udc} from "../../udc/udc";
import {GUEST_ENTRANCE, MY_COURSES_INDEX} from "../../App.config";

function DropCourseComponent({id}) {
    const [userInfo, setUserInfo] = useState({});
    const [message, setMessage] = useState("");

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        if (JSON.parse(localStorage.getItem("user")) !== null) {
            let result = await udc.get("user", JSON.parse(localStorage.getItem("user")).token, {})
                .then((data) => {
                    return data;
                })
                .catch((data) => {
                    return data;
                });

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

    const getResult = async (e) => {
        e.preventDefault();
        setMessage("Dropping...");

        let result = await udc.delete("drop-course", JSON.parse(localStorage.getItem("user")).token, {id: Number(id)})
            .then((data) => {
                return data;
            })
            .catch((data) => {
                return data;
            });


        setMessage(result.message);
        setTimeout(() => {
            window.location.href = MY_COURSES_INDEX
        }, 3000);
    }

    return (
        <>
            {
                JSON.parse(localStorage.getItem("user")) ? (
                    <>
                        {
                            userInfo.type === "student" ? (
                                <form onSubmit={getResult}>
                                    <h2>Drop Course?</h2>
                                    <p>{message}</p>
                                    <button type="submit">Confirm</button>
                                </form>
                            ) : (
                                <form>
                                    <h2>Drop Course</h2>
                                    <p>This function is only available for students.</p>
                                </form>
                            )
                        }
                    </>
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default DropCourseComponent;